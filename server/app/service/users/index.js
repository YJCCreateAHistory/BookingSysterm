/**
  * @author Yanjiachuan <cnjc_19991222@163.com>
  * @date 2023-02-14 20:10
*/
'use strict';
const Service = require('egg').Service;
const NodeRSA = require('node-rsa');
const dayjs = require('dayjs');
class Login extends Service {
  /**
    * @param params
    * @description login
  */
  async login(params) {
    const { ctx, app } = this;
    const query = {
      where: {
        telephone: params.telephone,
      },
    };
    const user = await app.model.Users.findOne(query);
    // 用户未注册
    if (!user) {
      return {
        error: 404,
      };
    }
    // 密码加签
    params = Object.assign(params, await this.ctx.helper.tools.saltPsd(params.psd, user.dataValues.psd.substr(32)));
    console.log(params);
    const res = await ctx.model.Users.findOne({
      where: {
        telephone: params.telephone,
        psd: params.psd, // 加签存储的面
      },
    });
    if (!res) {
      return {
        error: 400,
      };
    }
    return await this.findUserProfile(ctx, res);
  }
  /**
  * @param ctx
  * @param user
  * @params {telephone} 电话号码
  */
  async findUserProfile(ctx, user) {
    const { app } = ctx;
    user.update({
      last_login: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
    const curReqData = {
      userInfo: {
        uid: user.uid,
        telephone: user.telephone,
      },
    };
    // 申请token
    if (app.config.verification_mode === 'jwt') {
      return user ? {
        uid: user.uid,
        avatar: user.avatar,
        name: user.name,
        faculties: user.faculties,
        class: user.class,
        role: user.role,
        accessToken: await ctx.helper.tools.setToken(ctx, curReqData, app.config.jwt_exp),
        refreshToken: await ctx.helper.tools.setToken(ctx, curReqData, app.config.jwt_refresh_exp, app.config.jwt.secret_refresh),
        csrf: ctx.csrf,
        authority: [ user.one_authority, user.two_authority, user.three_authority ],
      } : null;
    }
    ctx.session.curReqData = curReqData;
    return user ? {} : null;
  }
  /**
  * @param payload
  * @description 用户信息 user_profile
  */
  async takeUserinfo(payload) {
    const { ctx } = this;
    const query = {
      where: {
        uid: payload.uid,
      },
    };
    const userProfile = await ctx.model.Users.findOne(query);
    if (!userProfile) {
      return {
        error_code: 404,
        message: 'users profile is not found',
      };
    }
    return userProfile.dataValues;
  }
  /**
  * @param params
  * @description refresh accessToken
  */
  async refreshToken(params) {
    const { ctx, app } = this;
    const { refreshToken, secret } = params;
    try {
      // 解码
      const { data: curReqData } = await ctx.app.jwt.verify(refreshToken, ctx.app.jwt.secret_refresh);
      // 拿到密匙
      const { rsa_private_key } = await ctx.model.Configuration.findOne({
        where: { id: 1 },
      });
      const private_key = new NodeRSA(rsa_private_key); // 生成密匙
      try {
        const newSercet = private_key.decrypt(secret, 'utf8'); // 私匙解密，生成明文
        if (curReqData.userInfo && curReqData.userInfo.uid && curReqData.userInfo.uid === newSercet) {
          return {
            // 重新生成accessTokne
            accessToken: await ctx.helper.tools.setToken(ctx, curReqData, app.config.jwt_exp),
            refreshToken,
          };
        }
        return {
          error_code: 403,
          message: 'refreshToken与sercet不匹配',
        };
      } catch (e) {
        return {
          error_code: 402,
          message: 'sercet错误',
        };
      }
    } catch (e) {
      if (e.name === 'TokenExporedError') {
        return {
          error_code: 400,
          messsage: '登录已过期，请重新登陆！',
        };
      }
      return {
        code_error: 401,
        message: '无效的refreshToken',
      };


    }
  }
  /**
    * @param params
    * @description 查找用户
  */
  async findUsers(params) {
    const { app } = this;
    // 查找所有用户
    const res = await app.model.Users.findAll({ limit: parseInt(params.limit), offset: parseInt(params.offset) });
    if (!res) {
      return {
        error_code: 404,
        message: '没有查找到用户~',
      };
    }
    return res;
    // 通过电话查找

    // 通过用户名查找


  }
}
module.exports = Login;
