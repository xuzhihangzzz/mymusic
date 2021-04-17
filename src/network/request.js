/*
 * @Author: xuzhihang
 * @Date:   2020-12-13 17:05:53
 * @Last Modified by:   xuzhihang
 * @Last Modified time: 2021-04-17 14:16:48
 */

import axios from 'axios'

export function request(config) {
  // 1.创建axios实例
  const instance = axios.create({
    // 开发环境下
    // baseURL: 'http://localhost:3000/',
    // baseURL: '/api',
    // 部署到服务器
    baseURL: 'http://47.98.130.23:3000/',
    timeout: 5000,
    withCredentials: true
  })

  // 2.axios的拦截器
  instance.interceptors.request.use(config => {
    // console.log(config)
    return config
  }, err => {
    // console.log(err)
  });  // 拦截请求

  instance.interceptors.response.use(res => {
    // console.log(res)
    return res.data
  }, err => {
    // console.log(err)
  })  // 拦截响应

  // 3.发送真正的网络请求
  return instance(config)
}