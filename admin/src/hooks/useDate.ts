import dayjs from "dayjs" //导入安装的dayjs 库
import utc from 'dayjs/plugin/utc'  //要想支持utc 的转化 这里必须导入这个utc
dayjs.extend(utc)  //扩展之后，dayjs 就支持utc
const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss"  //时间格式化的字符串
export const useDate = (utcSting: string,format: string = DATE_TIME_FORMAT)=> {
  return dayjs.utc(utcSting).format(format)  //拿到dayjs 这里有个utc 的函数，有了utc 这个函数之后，我们可以把这个utcSting 传进去，用它的结果去调用format
}
