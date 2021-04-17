/*
 * @Author: xuzhihang
 * @Date:   2020-12-19 20:45:05
 * @Last Modified by:   xuzhihang
 * @Last Modified time: 2021-03-16 20:31:41
 */

import {request} from './request'


export function getMv(limit, offset, order, area) {
  return request({
    url: '/mv/all',
    params: {
      limit,
      offset,
      order,
      area
    }
  })
}

export function getMvUrl(id) {
  return request({
    url: '/mv/url',
    params: {
      id
    }
  })
}

/**
 * 获取mv详情
 * @param {mv的id} id 
 */
export function getMvDetail(id) {
  return request({
    url: '/mv/detail',
    params: {
      mvid: id
    }
  })
}

/**
 * 获取mv点赞转发评论的数量
 * @param {mv的id} id 
 */
export function getMvDetailInfoCount(id) {
  return request({
    url: '/mv/detail/info',
    params: {
      mvid: id
    }
  })
}

/**
 * 获取相关推荐mv
 * @param {mv的id} id 
 */
export function getMvRelated(id) {
  return request({
    url: 'simi/mv',
    params: {
      mvid: id
    }
  })
}

export function getMvComments(id, limit, offset) {
  return request({
    url: '/comment/mv',
    params: {
      id,
      limit,
      offset
    }
  })
}
