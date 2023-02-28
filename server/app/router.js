'use strict';

/**
 * @param {Egg.Application} app - egg application
 * @description router
 */
module.exports = app => {
  const { router, controller } = app;
  /**
   * @ TODO:
   * @description app_api
  */
  router.post('/api_v1_app/loginByPsd', controller.users.index.loginByPhonePsd); // 登录接口
  router.post('/api_v1_app/loginByMsg', controller.users.index.loginByPhoneVerify);

  /**
   * @ TODO:
   * @description web_admin_api
  */
  router.get('/api_v1_admin/users', controller.users.index.findUsers); // 用户查找接口




  router.post('/api_v1_admin/loginByPsd', controller.users.index.loginByPhonePsd); // 登录接口
  router.post('/api_v1_admin/refresh_token', controller.users.index.refreshToken); // accessToken校验接口
  router.post('/api_v1_admin/users', controller.users.index.findUsers); // 用户查找接口
  router.post('/api_v1_admin/authority', controller.authority.index.assignAuthority); // 权限分配接口
  router.post('/api_v1_admin/deleteAuthority', controller.authority.index.deleteAuthority); // 权限分配接口


};
