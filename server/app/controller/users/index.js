/**
  * @author Yanjiachuan <cnjc_19991222@163.com>
  * @date 2023-02-14 20:10
*/
'use strict';
const Controller = require('egg').Controller;
class UserLogin extends Controller {

  /**
  * @router_admin /api_v1_admin/loginByPsd
  * @router_app /api_v1_app/loginByPsd
  * @description login
  */
  async loginByPhonePsd() {
    const { ctx } = this;
    const res = await ctx.service.users.index.login(ctx.request.body);
    switch (res.error) {
      case undefined:
        ctx.helper.body.SUCCESS({ ctx, res });
        break;
      case 404:
        ctx.helper.body.UNAUTHORIZED({ ctx, res });
        break;
      default:
        ctx.helper.body.ERROR({ ctx, res });

    }
  }

  /**
  * @router /api_v1_app/loginByMsg
  * @description login
  */
  async loginByPhoneVerify() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    const verifyCode = ctx.session.message;
    const telephone = ctx.session.telephone;
    if (params.telephone === telephone && params.verifyCode === verifyCode) {
      const token = app.jwt.sign({
        telephone: params.telephone,
      },
      app.config.jwt.secret
      );
      const res = await ctx.service.users.index.takeUserProfile(telephone);
      res.token = token;
      ctx.body = {
        status: res.msg ? 404 : 200,
        data: res.msg ? null : res,
      };
    }
  }
  /**
  * @description refresh accessToken
  * @router /api_v1_adminuserinfo
  */
  async takeUserinfo() {
    const { ctx } = this;
    const res = await ctx.service.user.index.takeUserinfo(ctx.request.body);
    switch (res.error_code) {
      case undefined:
        ctx.helper.body.SUCCESS({ ctx, res });
        break;
      default:
        ctx.hleper.body.ERRRO({ ctx, res });
        break;
    }
  }
  /**
  * @description refresh accessToken
  * @router /api_v1_admin/refreshToken
  */
  async refreshToken() {
    const { ctx, app } = this;
    const params = ctx.request.body;
    if (app.config.verification_mode === 'jwt') {
      const res = await ctx.service.users.index.refreshToken(params); // 校验refreshToken
      switch (res.error_code) {
        // 成功
        case undefined:
          ctx.helper.body.SUCCESS({ ctx, res });
          break;
        // 统一权限不足
        case 400:
        case 401:
        case 402:
        case 403:
          ctx.helper.body.UNAUTHORIZED({ ctx, code: res.error_code, msg: res.message });
          break;
        // 请求出错
        default:
          ctx.helper.body.ERROR({ ctx, res });
          break;
      }
    }
  }
  /**
  * @description 查找所有用户
  * @router /api_v1_admin/users
  */
  async findUsers() {
    const { ctx } = this;
    console.log(ctx.request.body, ctx.request.query);
    const res = await ctx.service.users.index.findUsers(ctx.request.body ? ctx.request.query : ctx.request.body);
    switch (res.error_code) {
      case undefined:
        ctx.helper.body.SUCCESS({ ctx, res });
        break;
      default:
        ctx.helper.body.ERROR({ ctx });
        break;
    }
  }
}

module.exports = UserLogin;
