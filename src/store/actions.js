import * as types from './mutation-type'

export default {
  // 选择播放
  selectPlay(context, payLoad) {
    context.commit(types.SET_PLAYLIST, payLoad.list)
    context.commit(types.SET_CURRENT_INDEX, payLoad.index)
    context.commit(types.SET_PLAYING_STATE, true)
  },
  // 播放全部
  playAll (context, payLoad) {
    console.log('1212121277777')
    // context.commit(types.SET_PLAY_MODE, playMode.sequence)
    // context.commit(types.SET_SEQUENCE_LIST, list)
    context.commit(types.SET_PLAYLIST, payLoad.list)
    context.commit(types.SET_CURRENT_INDEX, 0)
    context.commit(types.SET_PLAYING_STATE, true)
  },
  // 暂停播放
  pausePlay(context, payLoad) {
    context.commit(types.SET_PLAYING_STATE, false)
  }
}