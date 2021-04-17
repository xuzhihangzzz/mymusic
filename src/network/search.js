/*
 * @Author: xuzhihang
 * @Date:   2021-01-22 20:34:02
 * @Last Modified by:   xuzhihang
 * @Last Modified time: 2021-01-22 20:35:49
 */

import {request} from './request'
export function search(keywords, type) {
  return request({
    url: '/search',
    params: {
      keywords,
      type
    }
  })
}
