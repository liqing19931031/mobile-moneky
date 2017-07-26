<template lang="html">
  <div class="index">
    <div class="search-group">
      <div class="search-input">
        <i class="glyphicon glyphicon-search"></i> 坑爹宝的彩蛋
      </div>
      登录
    </div>
    <Slide height='11rem' :autoplay='true' :time='1000' :imgList='this.imgList'></Slide>
    <router-link to='/origin'>
      <div class="hot-address">
          特 色 专 场 <i class="glyphicon-go-jump glyphicon"></i>
      </div>
    </router-link>
    <Origin></Origin>
    <AllNav></AllNav>
  </div>
</template>

<script>
import AllNav from './widget/nav'
import Slide from './widget/slide'
import Origin from './widget/featureOrigin'

export default {
  data () {
    return {
      imgList: []
    }
  },
  mounted () {
    this.getImgList()
  },
  methods: {
    getImgList () {
      this.$ajax('get', 'ApiUrl', {
        ctl: 'IndexExt',
        met: 'getHomePageBanner',
        typ: 'json'
      }).then((data) => {
        this.imgList = data.data
      })
    }
  },
  components: {
    AllNav,
    Slide,
    Origin
  }
}
</script>

<style lang="less">
@import '../styles/various.less';

.index{
  padding-top: 2.666667rem;
  .search-group{
    position: fixed;
    top: 0;
    width: 100%;
    height: 2.666667rem;
    background-color: @fontHover;
    box-sizing: border-box;
    padding-top: .333333rem;
    padding-left: .666667rem;
    color: white;
    font-size: .866667rem;
    .search-input{
      display: inline-block;
      background-color: white;
      text-align: center;
      line-height: 2rem;
      font-size: .8rem;
      color: #999;
      height: 2rem;
      margin-right: .666667rem;
      width: 21rem;
      border-radius: .333333rem;
    }
  }
  .hot-address{
    box-sizing: border-box;
    background: url('/static/hot-address.jpg');
    padding: 1.666667rem 0 0 19.666667rem;
    background-size: 100% 100%;
    height: 3rem;
    width: 100%;
    font-size: .666667rem;
    color: @fontHover;
  }
}
</style>
