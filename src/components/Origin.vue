<template lang="html">
  <div class="origin-group">
    <div class="topic">
      <i class="glyphicon glyphicon-back" @click='$router.go(-1)'></i>
    </div>
    <div class="banner">
    </div>
    <div class="top-nav clearfix">
      <div class="one-nav" v-for='(item, index) in this.imgs' :style='{background: `url(/static/origin/0-${index}.png)`, backgroundSize: "100% 100%"}' v-if='index !== 0'>
        <div class="text-center">
          {{item}}
        </div>
      </div>
    </div>
    <div class="nav">
      <div class="nav-title" v-for='(item, index) in this.shops' :class='index === NOWNAV ? "active" : ""' @click='changeNav(index)'>
        <a :href='`#${index}`'>{{item.name}}</a>
      </div>
    </div>
    <div class="zones">
      <div class="zone" v-for='(item, index) in this.shops'>
        <div class="zone-title">
          {{item.name}}
        </div>
        <div class="zone-content">
            <div class="zone-one" v-for='(shop, childindex) in item.shopData'>
              <img :src='`/static/origin/2-${childindex}.png`' alt="">
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      NOWNAV: 0,
      imgs: [
        '',
        '源于江南 追求生活',
        '经典职业装 量大从优',
        '休闲T恤 舒适有型',
        '新款连衣裙 穿出自己',
        '经典职业装 量大从优',
        '厂家直销 各款式定做',
        '雨刷精 防冻更给力',
        '四十周年 限量纪念版',
        '个性印花 打造自我'
      ],
      shops: [
        {
          name: '优品好货',
          shopData: [
            {
              content: '衬衫领白色T恤 精梳氨纶珠地网眼面料 支持个性化印logo',
              price: '68.75',
              address: '杭州堂山服饰有限公司'
            },
            {
              content: '2017春夏新款桑蚕丝V领抽象印花短袖袖中长款修身真丝连衣裙',
              price: '498.75',
              address: '杭州益丰制衣有限公司'
            }
          ]
        },
        {
          name: '热卖爆品',
          shopData: [
            {
              content: '三级螺纹钢 HRB400E螺纹钢 申特抗震建筑螺纹钢筋',
              price: '68.75',
              address: '杭州堂山服饰有限公司'
            },
            {
              content: '2017春夏新款桑蚕丝V领抽象印花短袖袖中长款修身真丝连衣裙',
              price: '498.75',
              address: '杭州益丰制衣有限公司'
            }
          ]
        },
        {
          name: '精选店铺',
          shopData: [
          ]
        }
      ]
    }
  },
  methods: {
    changeNav (index) {
      this.NOWNAV = index
    }
  }
}
</script>

<style lang="less">
.origin-group{
  background-color: #101055;
  .topic{
    height: 3rem;
    background: url('/static/origin/topic.jpg');
    background-size: 100% 100%;
    i{
      width: 1.333333rem;
      height: 1.333333rem;
      margin-top: 1rem;
      margin-left: .666667rem;
      font-weight: bold;
      float: left;
    }
  }
  .banner{
    height: 10rem;
    background: url('/static/origin/banner.png');
    background-size: 100% 100%;
  }
  .top-nav{
    padding: .666667rem 1rem;
    .one-nav{
      width: 7.666667rem;
      height: 6.666667rem;
      float: left;
      background-size: 100% 100%;
      color: white;
      padding: .4rem;
      box-sizing: border-box;
      font-size: .733333rem;
    }
  }
  .nav{
    height: 1.666667rem;
    background-color: #323298;
    width: 100%;
    .nav-title{
      padding: .2rem 0;
      width: 3.333333rem;
      margin:0 2.166667rem;
      display: inline-block;
      text-align: center;
      font-size: .8rem;
      a{
        color: #ebebeb;
      }
      &.active{
        font-weight: 600;
        border-bottom: 1px solid white;
        a{
          color: white;
        }
      }
    }
  }
  .zones{
    .zone{
      .zone-title{
        height: 2rem;
        margin: 1rem 5rem .666667rem 5rem;
        width: 15rem;
        background: url('/static/origin/header.png');
        background-size: 100% 100%;
        text-align: center;
        font-size: .933333rem;
        line-height: 2.3rem;
        color: white;
      }
    }
  }
}
</style>
