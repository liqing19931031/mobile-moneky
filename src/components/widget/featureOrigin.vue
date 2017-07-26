<template lang="html">
  <div class="feature-group">
    <div class="feature">
      <router-link :to="{path: '/belt', query: {id: getQuerry(item.homepage_url, 'belt_id')} }" v-for='(item, index) in this.feature' v-if='item.homepage_pic !== ""'>
        <div class="feature-one">
          <img :src='item.homepage_pic' alt="">
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      feature: [
      ]
    }
  },
  mounted () {
    this.$ajax('get', 'ApiUrl', {
      ctl: 'IndexExt',
      met: 'getPopularOrigin',
      typ: 'json'
    }).then((data) => {
      this.feature = data.data
    })
  }
}
</script>

<style lang="less">
.feature-group{
  overflow: auto;
}
.feature{
  white-space: nowrap;
  padding: .666667rem;
  width: 100%;
  box-sizing: border-box;
  height: 11.666667rem;
  background-color: #fafafa;
  .feature-one{
    width: 10rem;
    height: 10rem;
    display: inline-block;
    img{
      width: 10rem;
      height: 10rem;
    }
    & + .feature-one{
      margin-left: .666667rem;
    }
  }
}
</style>
