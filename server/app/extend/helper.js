'use strict';
// const { v4: uuidv4 } = require('uuid');
// const { Op } = require('sequelize');
const crypto = require('crypto');
module.exports.body = {
  //  TODO: [GET] 请求成功返回数据
  SUCCESS({ ctx, res = {}, msg = 'SUCCESS', code = 200 }) {
    ctx.body = {
      code,
      data: res,
      msg,
      status: 200,
    };
  },
  //  TODO: [PUT, POST, PATCH] 创建数据成功返回数据
  UPDATE({ ctx, res = {}, msg = 'INSERT SUCCESS' }) {
    ctx.body = {
      code: 0,
      data: res,
      msg,
      status: 201,
    };
  },
  //  TODO: [DELETE] 删除数据成功返回数据
  DELETE({ ctx, res = {}, msg = 'DELETE SUCCESS' }) {
    ctx.body = {
      code: 0,
      data: res,
      msg,
      status: 200,
    };
  },
  //  TODO: 权限不足返回数据
  UNAUTHORIZED({ ctx, res = {}, msg = 'UNAUTHORIZED, CAN NOT GET RESPONSE', code = 400 }) {
    ctx.body = {
      code,
      data: res,
      msg,
      status: 400,

    };
  },
  // TODO: 请求失败返回数据
  ERROR({ ctx, res = {}, msg = 'ERROR' }) {
    ctx.body = {
      code: 0,
      data: res,
      msg,
      status: 404,
    };
  },
};
module.exports.tools = {

  // 密码加签
  async saltPsd(psd, salt = crypto.createHash('md5')
    .update(Math.random().toString())
    .digest('hex')) {
    const finallyPsd = crypto.createHash('md5').update(psd + ':' + salt).digest('hex');
    return {
      salt,
      psd: finallyPsd,
    };
  },

  async setToken(ctx, params = {}, exp = 60, secret = ctx.app.config.jwt.secret) {
    return ctx.app.jwt.sign(
      {
        data: params,
        // exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7)
        exp: Math.floor(Date.now() / 1000) + exp,
        // exp: Math.floor(Date.now() / 1000) + (10),
      },
      secret
    );
  },
};
