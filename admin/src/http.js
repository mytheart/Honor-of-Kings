import axios from 'axios'
import Vue from 'vue'

const http=axios.create({
    baseURL:"http://localhost:3000/admin/api/"
})

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});



// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么（状态码>=400的进入这里）
    if(error.response.data.message){
        Vue.prototype.$message.error(error.response.data.message)
    }

    if (err.response.status === 401) {
      router.push('/login')
    }

    return Promise.reject(error);
  });


export default http 