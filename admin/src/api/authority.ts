import request from '@/request/index';

/**
 * @description 新增权限接口
 * @param payload
*/
export const assginAuthority = <T>(payload:T) =>{
  return request({
    url: '/authority',
    method: 'POST',
    data: payload
  })
}
