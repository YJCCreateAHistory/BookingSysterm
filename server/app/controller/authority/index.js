'use strict';

const Controller = require('egg').Controller;

class AuthoritySyt extends Controller {
  /**
   * @router /api_v1_admin/authority
   * @description 权限分配接口
  */
  async assignAuthority() {
    const { ctx } = this;
    // 传进来的权限是xxxx-xxxxx-xxxxx的形式
    const res = await ctx.service.authority.index.assignAuthority(ctx.request.body);
    switch (res.error_code) {
      case undefined:
        ctx.helper.body.SUCCESS({ ctx, res });
        break;
      default:
        ctx.helper.body.ERROR({ ctx });
        break;
    }
  }
  /**
   * @router /api_v1_admin/deleteAuthority
   * @description 删除权限接口
  */
  async deleteAuthority() {
    const { ctx } = this;
    const res = await ctx.servcie.authority.index.deleteAuthority(ctx.request.body);
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

module.exports = AuthoritySyt;
