import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

// 全局的请求拦截器（发送请求前执行）
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token // +Bearer 是行业规范
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 全局的响应拦截器（接收到请求后进入）
http.interceptors.response.use(res => { // 200的状态码会进入
  return res
}, err => { // 前端通用的错误处理，响应拦截
  if (err.response.data.message) { // 异常的状态码
    // 弹出一个错误
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    
    if (err.response.status === 401) {
      router.push('/login')
    }
  }
  
  return Promise.reject(err)
})


export default http