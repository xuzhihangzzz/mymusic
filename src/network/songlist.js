/*
 * @Author: xuzhihang
 * @Date:   2020-12-17 12:27:21
 * @Last Modified by:   xuzhihang
 * @Last Modified time: 2021-01-22 11:01:13
 */

import {request} from './request'

/**
 * 所有歌单
 * @param {*} limit 
 * @param {*} offset 
 */
export function getSongLists(order, cat, limit, offset) {
  return request({
    url: '/top/playlist',
    params: {
      order,
      cat,
      limit,
      offset
    }
  })
}

/**
 * 热门歌单分类
 */
export function getHotTags() {
  return request({
    url: '/playlist/hot'
  })
}

/**
 * 歌单分类列表
 */
export function getCategoryList() {
  return request({
    url: '/playlist/catlist'
  })
}

/**
 * 获取歌单详情
 */
export function getPlayListDetail(id, timestamp) {
  return request({
    url: '/playlist/detail',
    params: {
      id,
      timestamp
    }
  })
}

/**
 * 获取歌曲详情
 */
export function getSongDetail(ids, timestamp) {
  return request({
    url: '/song/detail',
    params: {
      ids,
      timestamp
    }
  })
}

/**
 * 获取歌词
 * @param {*} id 
 */
export function getLyricById(id) {
  return request({
    url: '/lyric',
    params: {
      id
    }
  })
}

/**
 * 相关歌单推荐
 */
export function getRelatedPlaylist(id) {
  return request({
    url: '/related/playlist',
    params: {
      id
    }
  })
}

/**
 * 歌单收藏者
 * @params id 歌单 id
 * @params limit 取出评论数量 默认为 20
 * @params offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 */
export function getSubscribersPlaylist(id,limit,offset) {
  return request({
    url: '/playlist/subscribers',
    params: {
      id,
      limit,
      offset
    }
  })
}

/**
 * 歌单评论
 * @params id 歌单 id
 * @params limit 取出评论数量 默认为 20
 * @params offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @params before 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 */
export function getCommentPlaylist(id,limit,offset,before) {
  return request({
    url: '/comment/playlist',
    params: {
      id,
      limit,
      offset,
      before
    }
  })
}

/**
 * 收藏/取消收藏歌单
 */  
export function collectPlaylist(t, id) {
  return request({
    url: '/playlist/subscribe',
    params: {
      t,
      id
    }
  })
}
  