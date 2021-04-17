/*
 * @Author: xuzhihang
 * @Date:   2020-12-19 09:39:28
 * @Last Modified by:   xuzhihang
 * @Last Modified time: 2020-12-19 19:58:15
 */

import {request} from './request'


export function getSingers(limit, offset, type, area, initial) {
  return request({
    url: '/artist/list',
    params: {
      limit,
      offset,
      type,
      area,
      initial
    }
  })
}
