/* eslint valid-jsdoc: "off" */
'use strict';
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1676356672502_5863';

  // add your middleware config here
  config.middleware = [];

  config.session = {
    maxAge: 24 * 3600 * 1000, // ms
    // maxAge: 20 * 1000, // ms
    key: 'EGG_SESS',
    httpOnly: true,
    signed: false,
    encrypt: false,
    renew: true,
  };
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    password: 'root',
    port: 3306,
    user: 'root',
    database: 'roombookingsystem',
    define: {
      raw: true,
      underscored: false,
      charset: 'utf8',
      timestamps: false,
      freezeTableName: true,
    },
  };
  config.security = {
    csrf: {
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      enable: false,
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => {
        return [
          '/api/v1/loginByPsd', // 登录
        ].includes(ctx.request.url);
      },
    },
  };
  config.cors = {
    origin: '*',
  };
  config.jwt = {
    secret: '12wu12sdnssA8291r3a6o9k20p1sh89ek',
    secret_refresh: '0o289s2sdnw98dj72sr3a6o9k20p1sh89ek',
    enable: true, // default is false
    match: '/jwt', // optional
  };
  config.cluster = {
    listen: {
      path: '',
      port: 7001,
      hostname: '192.168.31.48',
    },
  };
  config.bodyParser = {
    enableTypes: [ 'json', 'form', 'text' ],
    extendTypes: {
      json: 'application/custom-json',
      // json: 'application/json',
      text: [ 'application/xml', 'text/xml', 'text/html' ],
    },
  };
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0,
    },
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    verification_mode: 'jwt',
    jwt_exp: 60 * 10, // jwt过期时间(秒)
    jwt_refresh_exp: 60 * 60 * 24 * 15, // refreshToken过期时间(秒)
    socketOnlineUserRoomName: 'onlineUserRoom:', // socket所有在线用户房间名
    socketProjectRoomNamePrefix: 'roomProject:', // socket项目房间名前缀
    socketRedisExp: 30, // socket消息存入redis过期时间(秒)
    staticUseOSS: true, // 上传静态文件，使用云OSS存储
    inviteExpiresRange: 7 * 24 * 60, // 邀请有效时间（分钟）
    inviteExpiresCreateRange: 3 * 24 * 60, // 邀请有效时间更新时间，获取某个邀请时，如有效时间小于此时间，则创建一个新的邀请（分钟）
  };

  return {
    ...config,
    ...userConfig,
  };
};
