/**
 * @Author: xuzhihang
 * @Date:   2021-04-15 20:43:12
 * @Last Modified by:   xuzhihang
 * @Last Modified time: 2021-04-16 10:44:37
 */

import {request} from './request'

/**
 * 获取用户详情
 * @param {用户id} uid 
 */
export function getUserDetail(uid) {
  return request({
    url: '/user/detail',
    params: {
      uid
    }
  })
}

/**
 * 获取用户歌单
 * @param {用户id} uid 
 */
export function getUserLists(uid) {
  return request({
    url: '/user/playlist',
    params: {
      uid
    }
  })
}

/**
 * 获取用户播放记录
 * @param {用户id} uid 
 * @param {type=1 时只返回 weekData, type=0 时返回 allData} type 
 */
export function getUserRecord (uid, type) {
  return request({
    url:'/user/record',
    params: {
      uid,
      type
    }
  })
}
