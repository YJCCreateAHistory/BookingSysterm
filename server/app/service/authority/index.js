'use strict';
const Service = require('egg').Service;

class AuthoritySyt extends Service {
  /**
   * @description 权限分配
   * @param params
   * @param  {uid, newAuthority}
  */
  async assignAuthority(params) {
    const { ctx } = this;
    // 拿到传进来的权限进行更新
    const update = ctx.model.Users.update({ role: params.role }, { where: { uid: params.uid } });
    if (!update) {
      return {
        error_code: 404,
        mseeage: '添加权限失败~',
      };
    }
    return update;
  }
  /**
   * @description 删除权限
   * @param params
   * @param {uid, newAuthority}
  */
  async deleteAuthority(params) {
    const { ctx } = this;
    const update = ctx.model.Users.update({ role: params.nextAuthority }, { where: { uid: params.uid } });
    if (!update) {
      return {
        error_code: 404,
        mseeage: '删除权限失败~',
      };
    }
    return update;
  }
}
module.exports = AuthoritySyt;
