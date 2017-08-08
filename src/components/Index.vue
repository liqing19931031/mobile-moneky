<template lang="html">
  <div class="index">
    <div class="search-group">
      <a :href='`${this.BASEURL}search.html`'>
        <div class="search-input">
          <i class="glyphicon glyphicon-search"></i> 商品或店铺名
        </div>
      </a>
      <a :href='setUrl()'>登录</a>
    </div>
    <Slide height='12rem' :autoplay='true' :time='1000' :hasDot='true' :imgList='[this.imgList[this.imgList.length - 1], ...this.imgList, this.imgList[0]]'></Slide>
    <router-link to='/origin'>
      <div class="hot-address">
          特 色 专 场 <i class="glyphicon-go-jump glyphicon"></i>
      </div>
    </router-link>
    <Origin></Origin>
    <div class="hot-shop">
    </div>
    <Slide height='28rem' :autoplay='false' specialDom='bestGoods' :imgList='[this.bestGoods[this.bestGoods.length - 1], ...this.bestGoods, this.bestGoods[0]]'></Slide>
    <div class="hot-market">
    </div>
    <Slide height='27rem' :autoplay='false' specialDom='bestBusiness' :imgList='[this.bestBusiness[this.bestBusiness.length - 1], ...this.bestBusiness, this.bestBusiness[0]]'></Slide>
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
      imgList: [],
      bestGoods: [],
      bestBusiness: []
    }
  },
  mounted () {
    this.getImgList()
    this.getBestGoods()
    this.getBestBusiness()
  },
  methods: {
    getImgList () {
      this.$ajax('get', '', {
        ctl: 'IndexExt',
        met: 'getHomePageBanner',
        typ: 'json'
      }).then((data) => {
        this.imgList = data.data
      })
    },
    getBestGoods () {
      this.$ajax('get', '', {
        ctl: 'IndexExt',
        met: 'getOriginBestGoods',
        typ: 'json'
      }).then((data) => {
        this.bestGoods = data.data
      })
    },
    getBestBusiness () {
      this.$ajax('get', '', {
        ctl: 'IndexExt',
        met: 'getOriginBestBusiness',
        typ: 'json'
      }).then((data) => {
        this.bestBusiness = data.data
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
  padding-bottom: 3.333333rem;
  padding-top: 2.666667rem;
  .search-group{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
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
    a{
      color: white;
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
  .hot-market{
    background: url('/static/haoshang.jpg');
    background-size: 100% 100%;
    height: 3rem;
    width: 100%;
  }
  .hot-shop{
    background: url('/static/haohuo.jpg');
    background-size: 100% 100%;
    height: 3rem;
    width: 100%;
  }
}
</style>
