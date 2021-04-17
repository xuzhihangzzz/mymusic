/*
 * @Author: xuzhihang
 * @Date:   2020-12-20 09:44:11
 * @Last Modified by:   xuzhihang
 * @Last Modified time: 2020-12-20 09:46:07
 */

import {request} from './request.js'

export function getAllRank() {
  return request({
    url: '/toplist'
  })
}