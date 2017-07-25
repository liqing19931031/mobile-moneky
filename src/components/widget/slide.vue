<template lang="html">
  <div class="slides">

  </div>
</template>

<script>
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
  }
}
</script>

<style lang="less">

</style>
