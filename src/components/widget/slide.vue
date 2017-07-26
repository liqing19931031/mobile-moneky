<template lang="html">
  <div class="slides">

  </div>
</template>

<script>
// TODO: 根据天猫的思路swiper插件的思路根据自己定制的移动端轮播组件 待优化： 需要对获取获取过来的数据二次处理，这样真的不怎么好
// 不过天猫用的也是这个思路 有能看懂本渣渣写的组件的人的话 帮我改一下吧~这样真的不怎么合理
export default {
  props: {
    imgList: {
      type: Array,
      default: function () {
        return []
      }
    },
    height: {
      type: String,
      default: '11rem'
    },
    autoplay: {
      type: Boolean,
      default: false
    },
    time: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      groupLeft: -document.documentElement.getBoundingClientRect().width, // 轮播组左偏移距离
      startX: 0,
      endX: 0,
      index: 1,
      allWidth: document.documentElement.getBoundingClientRect().width,
      lastTouchmove: 0, // touchMove 过程中的位置 （用于计算偏移量）
      slideSecond: 0.3 // 轮播过渡动画时间
    }
  },
  mounted () {
    console.log(this.imgList)
  }
}
</script>

<style lang="less">

</style>
