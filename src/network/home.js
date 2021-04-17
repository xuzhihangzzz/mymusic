/*
 * @Author: xuzhihang
 * @Date:   2020-12-13 17:02:07
 * @Last Modified by:   xuzhihang
 * @Last Modified time: 2020-12-19 09:40:19
 */

import {request} from './request'

/**
 * 获取首页轮播图
 * @param {*} type 
 */
export function getSwiper(type) {
  return request({
    url: '/banner',
    params: {
      type
    }
  })
}

/**
 * 推荐歌单
 * @param {*} limit 
 */
export function getRecommendSongList(limit) {
  return request({
    url: '/personalized',
    params: {
      limit
    }
  })
}

/**
 * 最新歌曲
 * @param {*} limit 
 */
export function getNewSongs(limit) {
  return request({
    url: '/personalized/newsong',
    params: {
      limit
    }
  })
}

/**
 * 推荐mv
 * @param {*} limit 
 */
export function getRecommendMv(limit) {
  return request({
    url: '/personalized/mv',
    params: {
      limit
    }
  })
}

/**
 * 推荐歌手
 * @param {*} limit 
 */
export function getSingers(limit) {
  return request({
    url: '/top/artists',
    params: {
      limit
    }
  })
}