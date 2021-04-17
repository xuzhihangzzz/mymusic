<template>
  <div class="rank">
    <div class="wrap">
      <rank-and-user-lists :title="officialTitle" :lists="officialRankLists"></rank-and-user-lists>
      <rank-and-user-lists :title="worldRankTitle" :lists="worldRankLists"></rank-and-user-lists>
    </div>
  </div>
</template>

  <script>
  import RankAndUserLists from 'components/content/RankAndUserLists'

  import { getAllRank } from 'network/rank.js'

  export default {
    name: 'Rank',
    data() {
      return {
        officialRankLists: [],
        worldRankLists: [],
        officialTitle: "网易云官方榜",
        worldRankTitle: "全球媒体榜"
      }
    },
    components: {
      RankAndUserLists
    },
    mounted() {
      window.scroll(0, 0);
      getAllRank().then(res => {
        // 前四个为网易云官方榜
        this.officialRankLists = res.list.slice(0, 4)
        this.worldRankLists = res.list.slice(4)
      })
    },
  }
  </script>

<style scoped>
  .rank {
    width: 100%;
    min-height: calc(100vh - 252px);
    padding-top: 70px;
    min-width: 1024px;
  }
  .wrap {
    max-width: 1380px;
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    padding-top: 20px;
    padding-right: 15px;
    padding-left: 15px;
  }
</style>
