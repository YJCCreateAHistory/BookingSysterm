import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage } from 'element-plus';

const request: AxiosInstance = axios.create({
  baseURL: '/api_v1_admin',
  timeout: 30000,
})

request.interceptors.request.use((config: AxiosRequestConfig): any => {
  const isToken = window.localStorage.getItem('accessToken') || '';
  if (isToken) {
    return {
      ...config,
      headers: {
        'x-access-token': isToken
      }
    }
  }
  return config;
}, err => {
  ElMessage({
    message: '请求出错啦！请等一下再试~',
    type: 'warning',
  })
  return Promise.reject(err);
})

request.interceptors.response.use((res: AxiosResponse): any => {
  if (res.status == 200) {
    return Promise.resolve(res.data);
  } else {
    return Promise.reject(res.data);
  }
}, err => {
  ElMessage({
    message: '响应出错啦！请等一下再试~',
    type: 'warning',
  })
  return Promise.reject(err);
})
export default request;
