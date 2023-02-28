'use strict';

/**
 * @author {JC}
 * @effect tencentCloudMessageApi
 * **/
const Service = require('egg').Service;
const tencentCloudApi = require('tencentcloud-sdk-nodejs');
const verifyCode = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
class TencentCloudApi extends Service {
  async takeTencentCloudAPI(data) {
    const SmsClient = tencentCloudApi.sms.v20210111.Client;
    const clientConfig = {
      credential: {
        secretId: 'AKIDpUu53mGVUEixxhCRRChxylJbdQxFH4cv',
        secretKey: '5uUpyugNzOZWEl38zd3FEzXqx1xiFahb',
      },
      region: 'ap-guangzhou', // 地域信息
      profile: {
        signMethod: 'HmacSHA256',
        httpProfile: {
          reqMethod: 'POST',
          reqTimeout: 30, // 超时时间，不建议调整
          endpoint: 'sms.tencentcloudapi.com', // 默认就近接入
        },
      },
    };
    const client = new SmsClient(clientConfig); // 实例化后使用
    const params = {
      // Action:"SendSms",
      // Version:"2021-01-11",
      SmsSdkAppId: '1400742404',
      SignName: '嘉徐小站', // 备案过的签名内容
      TemplateId: '1563237', // 模板ID
      TemplateParamSet: [ verifyCode ],
      PhoneNumberSet: [ `+86${data.cellphone}` ],
    };
    let res;
    client.SendSms(params, (err, response) => {
      if (err) {
        return err;
      }
      res = response;
    });
    return [ res, verifyCode ];
  }
}
module.exports = TencentCloudApi;
