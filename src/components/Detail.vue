<template lang="html">
  <div class="detail">
    <div class="detail-navs">
      <i class="glyphicon glyphicon-back" @click='$router.go("index")'></i>
      <div class="detail-nav">
        <span>商品</span>
        <span>详情</span>
      </div>
    </div>
    <div class="order">
      <div class="order-left">
        <div class="order-nav">
          <i class='glyphicon glyphicon-shop'></i>
          店铺
        </div>
        <div class="order-nav">
          <i class='glyphicon glyphicon-collect'></i>
          收藏
        </div>
        <div class="order-nav">
          <i class='glyphicon glyphicon-contact'></i>
          联系
        </div>
      </div>
      <div class="order-right">
        <div class="add-order">
          加入进货单
        </div>
        <div class="buy-order">
          立即订购
        </div>
      </div>
    </div>
    <div class="img-priew">
      <img :src='this.shopDetail.baseSpec.goods_image' alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      shopDetail: {}
    }
  },
  mounted () {
    this.getShopDetail()
  },
  methods: {
    getShopDetail () {
      this.$ajax('get', 'ApiUrl', {
        ctl: 'Goods_GoodsExt',
        met: 'goodsInfo',
        typ: 'json',
        gid: 299
      }).then((data) => {
        if (data.status === 200) {
          this.shopDetail = data.data
        }
      })
    }
  }
}
</script>

<style lang="less">
  .detail-navs{
    height: 3.333333rem;
    width: 100%;
    position: relative;
    text-align: center;
    .detail-nav{
      line-height: 3.333333rem;
      font-size: 1.133333rem;
      width: 9rem;
      display: inline-block;
      span + span{
        margin-left: 3rem;
      }
    }
    i{
      position: absolute;
      top: 1.133333rem;
      left: 1rem;
    }
  }
  .order{
    position: fixed;
    bottom: 0;
    height: 3.333333rem;
    z-index: 999;
    width: 100%;
    background-color: #ffffff;
    border-top: 1px solid #ddd;
    .order-left{
      float: left;
      display: inline-block;
      height: 100%;
      width: 11rem;
      color: #888;
      .order-nav{
        height: 100%;
        display: inline-block;
        width: 3.333333rem;
        text-align: center;
        font-size: .6rem;
        i{
          padding-top: .666667rem;
          display: block;
          font-size: 1.333333rem;
        }
      }
    }
    .order-right{
      float: left;
      display: inline-block;
      height: 100%;
      width: 14rem;
      .add-order,
      .buy-order{
        height: 100%;
        float: left;
        text-align: center;
        width: 7rem;
        line-height: 3.333333rem;
        font-size: .933333rem;
      }
      .add-order{
        color: #cb1b1d;
        background-color: #f5d1d1;
      }
      .buy-order{
        color: white;
        background-color: #cb1b1d;
      }
    }
  }
  .img-priew{
    height: 25rem;
    width: 25rem;
    img{
      height: 25rem;
      width: 25rem;
    }
  }
</style>
