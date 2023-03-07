'use strict';

const Controller = require('egg').Controller;
class Tencent extends Controller {
  async tencentCloudApi() {
    const { ctx } = this;
    const params = ctx.request.body;
    const res = await ctx.service.tencentCloud.index.takeTencentCloudAPI(params);
    ctx.session.message = res[1];
    ctx.session.telephone = params.cellphone;
    ctx.body = {
      status: 200,
      data: res,
      msg: 'success',
    };
  }
}
module.exports = Tencent;
