import { ElNotification } from 'element-plus'

export const notification = (message:string, type:any, title:string)=>{
  return ElNotification({
    title:title,
    message:message,
    type:type,
  })
}

