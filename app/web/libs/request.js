import axios from 'axios'
import { Message, Modal } from 'iview'
import store from '@/store'
import { getToken } from '@/libs/auth'
import Qs from 'qs'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000, // 请求超时时间
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  transformRequest: [params => Qs.stringify(params)]
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非50000是抛错
  */
    const res = response.data
    if (res.code !== 50000) {
      Message.error({
        content: res.msg,
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        Modal.confirm({
          body: '你已被登出，可以取消继续留在该页面，或者重新登录',
          okText: '重新登录',
          cancelText: '取消',
          type: 'warning',
          onOk: () => {
            store.dispatch('FedLogOut').then(() => {
              location.reload()// 为了重新实例化vue-router对象 避免bug
            })
          }
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message.error({
      content: error.message,
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
