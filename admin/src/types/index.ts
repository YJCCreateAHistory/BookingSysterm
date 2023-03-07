/**
 * @description 公共类型
 * @interface
*/
type secondObejct = {
  [key:string] : string | number | boolean | []
}
export interface objectTypes {
  [key:string] : string | number | boolean | secondObejct
}
/**
 * @description 页面数据类型
 * @interface
*/
export interface formType {
  form: {
    telephone: string,
    psd: string
  }
}
// collaspe关闭传递数据
export interface emitType{
	(e:string, data:boolean):void
}

export interface tempTypes {
  firstAuthority:{
    [key:string]:string
  },
  secondAuthority:{
    [key:string]:string
  },
}

export interface ownTypes {
  first:{
    [key:string]:string
  },
  second:{
    [key:string]:string
  },
}

/**
 * @description 路由类型
 * @interface
*/
type firstRoutesType = {
  path: string,
  redirect?: any,
  name: string,
  component: any,
  meta: {
    title?: string,
    keepAlive?: boolean,
  },
}
export interface routesType extends firstRoutesType {
  children?:firstRoutesType
}

/**
 * @description vuex数据类型
 * @interface
*/
export interface mutationPayload{
  [key: string] : any,
}



