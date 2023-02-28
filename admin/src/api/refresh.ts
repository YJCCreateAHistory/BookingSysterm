import request from '@/request/index';

/**
 * @description 刷新token接口
 * @param payload
*/
export const refreshToken = <T>(payload:T) =>{
  return request({
    url: '/refreshToken',
    method: 'POST',
    data: payload
  })
}
