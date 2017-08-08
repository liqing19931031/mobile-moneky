<template lang="html">
  <div class="belt">
    <div class="to-Top text-center" @click='this.goTop'>
      <i class="glyphicon glyphicon-top"></i>
      顶部
    </div>
    <header class="banner">
      <img :src="`/static/${this.TOPIC[$route.query.id]}`" alt="">
    </header>
    <nav :style='this.NAVCLASS'>
      <i class="glyphicon-turn-left glyphicon pull-left" :style='{opacity: this.navColor}'></i>
      <div class="navs pull-left">
        <ul ref='navigation'>
          <li v-for='(item, index) in NAVS' :class='index === floor && "active"' @click='changeFloor(index)'>
            <a :href='`#${index}`'>{{item.catName}}</a>
          </li>
        </ul>
      </div>
      <i class="glyphicon-turn-right glyphicon pull-left" :style='{opacity: this.navColor}'></i>
    </nav>
    <div class="belt-banner">
      <a href="#">
        <img :src="`/static/${this.BANNER[$route.query.id]}`" alt="">
      </a>
    </div>
    <div class="floor" v-for='(item, index) in NAVS' :id='index' ref='floor'>
      <div class="floor-title">
        <div class="title-line inline-block">

        </div>
        <div class="inline-block">
          {{item.catName}}
        </div>
        <div class="title-line inline-block">

        </div>
      </div>
      <div class="floor-content-one" v-if='index === 0'>
        <div class="one-shop inline-block" v-for='item in NAVS[index].goodsData'>
          <router-link :to="{ path: '/detail', query: {id: item.gid} }">
            <img :src='item.pics' alt="">
            <div class="remake">
              <div class="name">
                {{item.name}}
              </div>
              <div class="price">
                ￥{{item.price}}/件
              </div>
              <div class="buy text-center">
                立即购买
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="floor-content-two clearfix">
        <div class="one-shop clearfix" v-for='item in NAVS[index].goodsData'>
          <router-link :to="{ path: '/detail', query: {id: item.gid} }">
            <img src='/static/load.jpg' class="lazyImg in" alt="" :data-url='item.pics'>
            <div class="introduction">
              <div class="introduction-content">
                {{item.content}}
              </div>
              <div class="address inline-block">
                <i class="glyphicon-address glyphicon"></i>{{item.source}}
              </div>
              <div class="price inline-block pull-right">
                ￥{{item.price}}/件
              </div>
            </div>
            <div class="buy text-center">
              立即购买
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="floor">
      <div class="floor-title">
        <div class="title-line inline-block">
        </div>
        <div class="inline-block">
          更多产地
        </div>
        <div class="title-line inline-block">
        </div>
      </div>
      <div class="more-origin">
        <div class="more-belt" :style='{backgroundColor: item.color}' v-for='(item, index) in MOREORIGIN'>
          <a :href='`/belt?id=${item.id}`'>
            <img :src='`/static/${item.pic}`' alt="">
            <div class="belt-title text-center">
              {{item.address}}
            </div>
            <div class="origin text-center">
              {{item.classify}}
            </div>
          </a>
        </div>
      </div>
    </div>
    <!-- <div class="no-more text-center">
      没有更多了
    </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      floor: 0,
      navColor: 0,
      NAVCLASS: '',
      TOPIC: [
        '',
        'belt-8.jpg',
        'belt-2.jpg',
        'belt-5.jpg',
        'belt-3.jpg',
        'belt-1.jpg',
        'belt-4.jpg',
        'belt-7.jpg',
        'belt-6.jpg'
      ],
      BANNER: [
        '',
        'banner-8.jpg',
        'banner-2.jpg',
        'banner-5.jpg',
        'banner-3.jpg',
        'banner-1.jpg',
        'banner-4.jpg',
        'banner-7.jpg',
        'banner-6.jpg'
      ],
      NAVS: [
        '精选布料',
        '环保桌布',
        '高档窗帘布',
        '纺织品厂家直销',
        '纺织品厂家直销'
      ],
      MOREORIGIN: [
        {
          pic: 'origin-1.jpg',
          address: '浙江杭州',
          id: 8,
          color: '#32b16c',
          classify: '橱窗 / 门 / 板材 / 楼梯 / 水龙头'
        },
        {
          pic: 'origin-2.jpg',
          address: '浙江杭州',
          id: 6,
          color: '#448aca',
          classify: '刚床 / 机床 / 角钢 / 方管 / 线材'
        },
        {
          pic: 'origin-4.jpg',
          address: '浙江杭州',
          color: '#f39800',
          id: 7,
          classify: '方巾 / 女装 / 男装 / 童装 / 配饰'
        },
        {
          pic: 'origin-3.jpg',
          address: '浙江宁波',
          color: '#af2f2f',
          id: 3,
          classify: '排线 / 喷漆 / 吊机 / 探头 / 法兰'
        }
      ]
    }
  },
  mounted () {
    let that = this
    this.getBeltData()
    let Cheight = document.documentElement.clientHeight
    let Cwidth = document.documentElement.clientWidth
    let imgs = document.getElementsByClassName('lazyImg')
    this.$refs.navigation.addEventListener('scroll', function () {
      that.navColor = this.scrollLeft === 0 ? 0 : 1
    })
    document.addEventListener('scroll', function () {
      that.NAVCLASS = document.body.scrollTop > Cwidth * 0.48 ? {position: 'fixed', top: 0} : ''
      that.lazyLoad(imgs, Cheight)
      that.navChange()
    })
    setTimeout(() => {
      this.lazyLoad(imgs, Cheight)
    }, 500)
  },
  methods: {
    changeFloor (index) {
      this.floor = index
    },
    getBeltData () {
      this.$ajax('get', '', {
        ctl: 'Industrial_BeltManage',
        met: 'getBeltData',
        typ: 'json',
        beltId: this.$route.query.id
      }).then((data) => {
        console.log(data)
        this.NAVS = data.data
      })
    },
    goTop () {
      document.documentElement.scrollTop = document.body.scrollTop = 0
    },
    navChange () {
      let floors = Array.prototype.slice.call(this.$refs.floor, 0)
      let Nheight = window.scrollY - document.documentElement.clientHeight
      floors.forEach((floor, i) => {
        if (i > 0) {
          if (floors[i].offsetTop > Nheight && floors[i - 1].offsetTop < Nheight) {
            this.floor = i
          }
        } else {
          if (floors[i].offsetTop > window.scrollY) {
            this.floor = 0
          }
        }
      })
    },
    lazyLoad (imgs, Cheight) {
      let imgsArrray = Array.prototype.slice.call(imgs, 0)
      imgsArrray.forEach((img, i) => {
        if ((img.offsetTop + img.offsetHeight * 0.5 - Cheight) < window.scrollY) {
          img.className = 'on'
          img.setAttribute('src', img.getAttribute('data-url'))
        }
      })
    }
  }
}
</script>

<style lang="less">
.belt{
  background-color: #eee;
  .to-Top{
    z-index: 5;
    width: 2.666667rem;
    height: 2.666667rem;
    position: fixed;
    top: 26.666667rem;
    right: 1rem;
    border-radius: 50%;
    background-color: #fafafa;
    box-shadow: 0px 2px 2px 0px rgba(4, 0, 0, 0.2);
    font-size: .533333rem;
    i{
      width: 100%;
      font-size: 1.6rem;
    }
  }
  header{
    &.banner{
      margin-bottom: .666667rem;
      img{
        display: block;
        height: 11.333333rem;
        width: 100%;
      }
    }
  }
  nav{
    z-index: 111;
    font-size: .8rem;
    width: 100%;
    line-height: 2.666667rem;
    height: 2.666667rem;
    background-color: white;
    i{
      text-align: center;
      line-height: 2.8rem;
    }
    .navs{
      height: 100%;
      width: 23rem;
      ul{
        white-space: nowrap;
        overflow-x: auto;
        li{
          position: relative;
          display: inline-block;
          padding: 0 .533333rem;
          border-bottom: 1px solid white;
          &.active{
            border-color: #cb1b1d;
            a{
              color: #cb1b1d;
            }
          }
        }
      }
    }
  }
  .belt-banner{
    padding: .666667rem 1rem 0 1rem;
    margin-bottom: -2.666667rem;
    img{
      display: block;
      width: 23rem;
      height: 9.666667rem;
    }
  }
  .floor{
    padding-top: 2.666667rem;
    margin-bottom: -2.666667rem;
    .floor-title{
      text-align: center;
      font-size: 1.133333rem;
      height: 3.333333rem;
      line-height: 3.333333rem;
      .title-line{
        width: 2.333333rem;
        height: .333333rem;
        border-top: 1px solid #333;
      }
    }
    .floor-content-one{
      height: 14rem;
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      padding-left: 1rem;
      .one-shop{
        box-sizing: border-box;
        padding: .333333rem;
        width: 14rem;
        height: 14rem;
        background-color: #ffffff;
        border: solid 1px #ddddd;
        position: relative;
        & + .one-shop{
          margin-left: .333333rem;
        }
        img{
          position: absolute;
          top: .333333rem;
          left: .333333rem;
          z-index: 0;
          width: 13.333333rem;
          height: 13.333333rem;
        }
        .remake{
          position: absolute;
          bottom: .333333rem;
          width: 13.333333rem;
          background-color: rgba(0, 0, 0, 0.5);
          height: 5rem;
          color: white;
          padding-top: 1rem;
          font-size: .666667rem;
          padding-left: 1.666667rem;
          box-sizing: border-box;
          .price{
            margin-top: .666667rem;
            font-size: .8rem;
          }
          .buy{
            width: 4rem;
            height: 1.333333rem;
            border: 1px dashed white;
            font-size: .733333rem;
            position: absolute;
            line-height: 1.333333rem;
            right: .333333rem;
            bottom: .333333rem;
          }
        }
      }
    }
    .floor-content-two{
      padding: 0 1rem;
      .one-shop{
        width: 11rem;
        height: 16.666667rem;
        float: left;
        margin-bottom: 1rem;
        &:nth-child(2n){
          margin-left: 1rem;
        }
        &:nth-last-child(1){
          margin-bottom: 0;
        }
        &:nth-last-child(2){
          margin-bottom: 0;
        }
        img{
          height: 11rem;
          width: 11rem;
          display: block;
          border-top-left-radius: .2rem;
          border-top-right-radius: .2rem;
          transition: all 1s ease;
        }
        .introduction{
          height: 4rem;
          background-color: white;
          font-size: .6rem;
          padding: .666667rem;
          padding-bottom: 0;
          box-sizing: border-box;
          .introduction-content{
            height: 1.8rem;
            overflow: hidden;
          }
          .address{
            font-size: .466667rem;
            color: #ff6600;
            margin-top: .333333rem;
          }
          .price{
            margin-top: .2rem;
            color: #cb1b1d;
          }
        }
        .buy{
          color: white;
          height: 1.666667rem;
          background-color: #cb1b1d;
          font-size: .6rem;
          line-height: 1.666667rem;
          border-bottom-left-radius: .2rem;
          border-bottom-right-radius: .2rem;
        }
      }
    }
    .more-origin{
        white-space: nowrap;
        padding-left: 1rem;
        width: 100%;
        overflow-x: auto;
        box-sizing: border-box;
        .more-belt{
          width: 9.666667rem;
          height: 13rem;
          display: inline-block;
          color: white;
          & + .more-belt{
            margin-left: 1rem;
          }
          img{
            display: block;
            padding: .133333rem;
            width: 9.666667rem;
            height: 9.666667rem;
          }
          .belt-title{
            font-size: .666667rem;
            border-top: 0.5px solid white;
            padding: .533333rem;
          }
          .origin{
            font-size: .466667rem;
          }
        }
    }
  }
  .no-more{
    color: #999;
    padding: 1.666667rem 0 .333333rem 0;
  }
}
</style>
