/*
 * @Author: xuzhihang
 * @Date:   2020-12-13 17:02:15
 * @Last Modified by:   xuzhihang
 * @Last Modified time: 2020-12-14 19:11:26
 */
import {request} from './request'

export function login(phone, password) {
  return request({
    url: '/login/cellphone',
    // method: post,
    params: {
      phone,
      password
    }
  })
}


