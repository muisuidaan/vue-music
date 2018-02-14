<template>
  <div class="recommend" ref="recommend">
        <!-- <div class="recommend-content"> -->
        <scroller 
            class="recommend-content"
            
        >
            <div v-if="slider.length" class="slider-wrapper" ref="sliderWrapper">
                <Swiper 
                    loop auto
                    v-on:touchend.native.stop v-on:touchstart.native.stop v-on:touchmove.native.stop
                    style="width:100%;margin:0 auto;background-size: contain;" 
                    height="10rem"
                    :list='slider'
                >
                    <!-- <div v-for='(item,index) in slider' :key='index'>
                        <a :href="item.linkUrl">
                        <a href="javascript:;">
                            <img class="needsclick"  :src="item.picUrl">
                        </a>
                    </div> -->
                </Swiper>
                <div class="recommend-list">
                    <h1 class="list-title">热门歌单推荐</h1>
                    <ul>
                        <li @click="selectItem(item)" v-for="(item,index) in discList" class="item" :key="index">
                        <div class="icon">
                            <img width="60" height="60" v-lazy="item.imgurl">
                            <!-- <img width="60" height="60" :src="item.imgurl"> -->
                            
                        </div>
                        <div class="text">
                            <h2 class="name" v-html="item.creator.name"></h2>
                            <p class="desc" v-html="item.dissname"></p>
                        </div>
                        </li>
                    </ul>
                </div>
            </div>
        </scroller>
        <!-- </div> -->
  </div>
</template>

<script>
import {getRecommend,getDiscList} from 'api/recommend.js'
// import Slider from 'base/slider/slider'
import {ERR_OK} from 'api/config'
import { Swiper } from 'vux'
import  './style.css'
export default {
    name: 'Recommend',
    data () {
        return {
            slider:[],
            discList:[]
        }
    },
    created () {
        this._getRecommend();
        this._getDiscList();
    },
    methods:{
        _getRecommend(){
            getRecommend().then((res)=>{
                if(res.code==ERR_OK){
                    this.slider=res.data.slider.map((item)=>{
                        return {
                            url: item.linkUrl,
                            img: item.picUrl,
                            id: item.id
                        }
                        
                    });
                }
            })
        },
        _getDiscList(){
            getDiscList().then((res)=>{
                if(res.code==ERR_OK){
                    this.discList = res.data.list
                }
            })
        },
        selectItem(item) {
            this.$router.push({
            path: `/recommend/${item.dissid}`
            })
            // this.setDisc(item)
        }

    },
    components:{
        Swiper
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-l
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)



</style>
