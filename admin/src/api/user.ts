import request from '@/request/index';

/**
 * @description 登录接口
 * @param payload
*/
export const login_api = <T>(payload:T) =>{
  return request({
    url: '/loginByPsd',
    method: 'POST',
    data: payload
  })
}
/**
 * @description 用户接口
 * @param payload
*/
export const usersList = <T>(payload:T)=>{
  return request({
    url:'/users',
    method:'GET',
    params:payload
  })
}

export const userProfile = () =>{
  
}

