import { mutationPayload } from '@/types/index';
export default {
  // 保存登录时间
  saveNowTime(state:any, payload:any) {
    state.timesmap[payload.key] = payload.value;
  },
  // 保存ID
  saveUid(state:any, payload:any){
    state.user[payload.key] = payload.value;
  },
  // 保存refreshToken
  saveRefreshToken(state:any, payload:any){
    state.user[payload.key] = payload.value;
  },
  // 保存头像
  saveAvatarUrl(state:any, payload:any) {
    state.user[payload.key] = payload.value;
  },
  // 拿到首屏用户
  saveUserList(state:any, payload:mutationPayload) {
    state.user[payload.key].push(payload.value);
  },
  // 分页信息
  queryInfo(state:any, payload:{[key:string]:number}) {
    state.page[payload.key] = payload.value;
  },
  // 分页数据切换
  handlePageChange(state:any, payload:mutationPayload){
    state.user[payload.key][payload.value.index] = payload.value
  },
  // 清除数据
  removeAllProfile(state:any, payload:any) {
    payload.key.map((item:string)=>{
      state[item] = payload.value;
    })
  }

}
