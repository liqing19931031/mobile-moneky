<template lang="html">
  <div class="belts">
    <div class="belts-title">
      产业带分类
      <i class="glyphicon glyphicon-back" @click='$router.go(-1)'></i>
    </div>
    <div class="belts-list" v-if='this.belts.length > 0'>
      <div class="belts-par">
        <div :class='`belt-par ${index === defaultAddress && "active"}`' v-for='(item, index) in this.belts' @click='changeBelt(index)'>
          {{item.sub_site_name}}
          <div class="sanjiao" :style='{display: index === defaultAddress ? "block" : "none"}'>

          </div>
        </div>
      </div>
      <div class="belts-child">
        <router-link :to="{path: 'belt', query: {id: item.belt_id}}" v-for='item in this.belts[defaultAddress].belt_data'>
          <div class="belt-child">
            {{item.belt_name}}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultAddress: 0,
      belts: [
      ]
    }
  },
  mounted () {
    this.getBelts()
  },
  methods: {
    changeBelt (index) {
      this.defaultAddress = index
    },
    getBelts () {
      this.$ajax('get', 'ApiUrl', {
        ctl: 'Industrial_BeltManage',
        met: 'getBeltList',
        typ: 'json'
      }).then((data) => {
        this.belts = data.data
      })
    }
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
  .belts-par{
    width: 10.666667rem;
    @a: 100vh;
  	min-height: ~"calc(@{a} - 2.666667rem)";
    background-color: #fafafa;
    border-right: 1px solid #bbb;
    float: left;
    .belt-par{
      width: 100%;
      color: @fontBase;
      height: 5.066667rem;
      font-size: 1.2rem;
      text-align: center;
      line-height: 5.066667rem;
      border-bottom: 1px solid #ddd;
      border-top: 1px solid white;
      position: relative;
      &.active{
        color: @fontHover;
      }
      .sanjiao{
          position: absolute;
          top: 2.333333rem;
          right: -1px;
          border-bottom: .333333rem solid transparent;
          border-right: .666667rem solid #e5e5e5;
          border-top: .333333rem solid transparent;
          position: absolute;
          height: 0px;
          width: 0px;
      }
    }
  }
  .belts-child{
    float: left;
    width: 14.266667rem;
    @a: 100vh;
  	min-height: ~"calc(@{a} - 2.666667rem)";
    background-color: #e5e5e5;
    .belt-child{
      height: 3rem;
      color: @fontBase;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid white;
      line-height: 3rem;
      padding-left: 1.666667rem;
    }
  }
}

</style>
