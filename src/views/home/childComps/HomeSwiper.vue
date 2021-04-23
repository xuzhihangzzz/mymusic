<template>
  <div class="home-swiper">
		<div class="swiper-container">
      <swiper :options="swiperOption">
        <swiper-slide
          class="swiper-item"
          v-for="(item,index) in banners"
          :key="index"
        >
          <img :src="item.imageUrl" alt="" style="margin-top: 7px;">
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
  import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  export default {
    name: 'HomeSwiper',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        swiperOption: {
          loop: true,
          // 一行显示slider的个数
          slidesPerView: 3,
          // 定义slides的数量多少为一组
          slidesPerGroup: 3,
          spaceBetween: 30,
          freeMode: false,
          // 分页小圆点
          pagination:{
            el:'.swiper-pagination',
            clickable:true,
          },
          // 点击分页器的指示点分页器会控制Swiper切换
          paginationClickable: true,
          // 鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
          grabCursor: true
        }
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    mounted() {
     
    },
    methods: {
  
    }
  }
</script>

<style lang="less" scoped>
  .home-swiper {
    width: 1324px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
  }
  .swiper-container {
    width: 100%;
    height: 200px;
  }
  .swiper-slide {
    width: 261px;
    height: 162px;
    background-position: center;
    background-size: cover;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  img {
    border-radius: 3px;
    max-width: 100%;
    height: auto;
    border-style: none;
  }
</style>
