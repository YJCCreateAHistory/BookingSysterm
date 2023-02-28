export const setToken = (name:string ,token: string)=>{
  window.localStorage.setItem(name, token);
}

export const refresh = (token_name:string, time:number):boolean=>{
  const msNumber:number = Math.floor(Date.now()); // 获取毫秒数
  const refreshTime:number = 7 * 24 * 60 * 60 * 1000;
  if(Math.floor(time) - msNumber > refreshTime) {
    window.localStorage.removeItem(token_name)
    return true;
  }
  return false;
}

export const removeToken = (name:string, vuex:string):void => {
  if(window.localStorage.getItem(name) && window.localStorage.getItem(vuex)) {
    // store.commit('removeState', {});
    window.localStorage.removeItem(name);
    window.localStorage.removeItem(vuex);
  }
}



