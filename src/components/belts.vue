<template lang="html">
  <div class="belts">
    <div class="belts-title">
      产业带分类
      <i class="glyphicon glyphicon-back" @click='$router.go(-1)'></i>
    </div>
    <div class="belts-list">

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      belts: [
        {
          id: 1,
          name: '杭州',
          belt: [
            {
              id: 1,
              name: '杭州设备零配件产业带'
            }
          ]
        }
      ]
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
@import '../styles/various.less';

.belts{
  .belts-title{
    height: 2.666667rem;
    color: white;
    text-align: center;
    background-color: @fontHover;
    line-height: 2.666667rem;
    font-size: 1.133333rem;
    i{
      width: 1.333333rem;
      height: 1.333333rem;
      margin-top: .8rem;
      margin-left: .666667rem;
      font-weight: bold;
      float: left;
    }
  }
}

</style>
