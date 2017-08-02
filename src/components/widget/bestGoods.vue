<template lang="html">
  <div class="best-goods">
    <div class="one-line" v-for='(item, index) in this.data.data' v-if='index <= 1'>
      <router-link :to="{path: '/detail', query: {id: item.homepage_id} }">
        <img :src='item.homepage_pic' alt="">
        <div class="des">
          {{item.homepage_desc}}
        </div>
        <div class="price">
          ￥{{item.homepage_price}}
        </div>
        <div class="address pull-right">
          {{item.homepage_address}}
        </div>
      </router-link>
    </div>
    <div class="two-line" v-else>
      <router-link :to="{path: '/detail', query: {id: item.homepage_id} }">
        <img :src='item.homepage_pic' alt="">
        <div class="des">
          {{item.homepage_desc}}
        </div>
        <div class="price">
          ￥{{item.homepage_price}}
        </div>
        <div class="address pull-right">
          {{item.homepage_address}}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
    default: function () {
      return {}
    }
  }
}
</script>

<style lang="less">
.slide-group{
  .slide-box{
    .best-goods{
      height: 100%;
      .one-line{
        height: 15.333333rem;
        width: 12.466667rem;
        box-sizing: border-box;
        float: left;
        border-bottom: 1px solid #e5e5e5;
        padding: 0.5rem 1.666667rem;
        img{
          width: 9.133333rem;
          height: 9.133333rem;
        }
        & + .one-line{
          border-left: 1px solid #e5e5e5;
        }
      }
      .two-line{
        float: left;
        width: 8.333333rem;
        padding: .666667rem;
        box-sizing: border-box;
        & + .two-line{
          border-left: 1px solid #e5e5e5;
        }
        img{
          display: block;
          width: 7rem;
          height: 7rem;
        }
      }
      .one-line,
      .two-line{
        .des{
          height: 2rem;
          overflow: hidden;
          font-size: .6rem;
          line-height: 1rem;
        }
        .price{
          margin-top: .333333rem;
          color: #cb1b1d;
          font-size: .933333rem;
        }
        .address{
          font-size: .666667rem;
        }
      }
    }
  }
}
</style>
