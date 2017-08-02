<template lang="html">
  <div class="best-business">
    <div class="one-line" v-for='(item, index) in this.data.data'>
      <a :href='`${BASEURL}store.html?shop_id=${item.homepage_id}`'>
        <img :src='item.homepage_pic' alt="">
        <div class="des">
          {{item.homepage_desc.trim()}}
        </div>
        <div class="address text-center">
          源产地：{{item.homepage_address}}
        </div>
      </a>
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
    .best-business{
      height: 100%;
      .one-line{
        box-sizing: border-box;
        float: left;
        width: 12.466667rem;
        border-bottom: 1px solid #e5e5e5;
        padding: 0.5rem 1.666667rem;
        color: #666;
        &:nth-child(2n){
          border-left: 1px solid #e5e5e5;
        }
        img{
          width: 9.133333rem;
          height: 9.133333rem;
        }
        .des{
          font-size: .8rem;
          text-align: center;
          height: 1.066667rem;
          overflow: hidden;
        }
        .address{
          font-size: .666667rem;
        }
      }
    }
  }
}
</style>
