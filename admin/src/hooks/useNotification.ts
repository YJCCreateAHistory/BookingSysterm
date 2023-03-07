import { ElNotification } from "element-plus"

interface func{
  (type:any, message:string, title:string, position?:number):any
}
export const useNotification:func = (type, message, title, position)=>{
  return ElNotification({
    type: type,
    message:message,
    title:title,
    offset:position
  })
}
