export default {
  loginStatu(state) {
    state.loginStatu || JSON.parse(window.localStorage.getItem('loginStatu'))
  },
  userInfo(state) {
    return state.userInfo || JSON.parse(window.localStorage.getItem('userInfo'))
  },
  singer(state) {
    return state.singer
  },
  playing(state) {
    return state.playing
  },
  playList(state) {
    return state.playList
  },
  currentIndex(state) {
    return state.currentIndex
  },
  currentSong(state) {
    return state.playList[state.currentIndex] || {}
  }
}
