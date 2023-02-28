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



