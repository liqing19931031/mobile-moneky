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
      <div class="zone" v-for='(item, index) in this.shops' :id='index'>
        <div class="zone-title">
          {{item.name}}
        </div>
        <div class="zone-content clearfix">
          <div class="zone-one" v-for='(shop, childindex) in item.shopData' v-if='index !== 2'>
            <img class="lazyImg in" src='/static/load.jpg' alt="" :data-url='`/static/origin/${index + 2}-${childindex + 1}.png`'>
            <div class="des">
              <div class="des-content">
                {{shop.content}}
              </div>
              <div>
                <div class="price pull-left">
                  <span>￥</span>{{shop.price}}/件
                </div>
                <div class="address pull-right">
                  <i class="glyphicon glyphicon-address"></i>{{shop.address}}
                </div>
              </div>
            </div>
          </div>
          <div class="zone-one--shop" v-else>
            <img class="lazyImg in" src='/static/load.jpg' alt="" :data-url='`/static/origin/${index + 2}-${childindex + 1}.png`'>
            <div class="des">
              <div class="address text-center">
                <i class="glyphicon glyphicon-address"></i>{{shop.address}}
              </div>
              <div class="clasic text-center">
                {{shop.clasic}}
              </div>
              <div class="shop-name">
                {{shop.shop}}
              </div>
            </div>
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
            },
            {
              content: '胖妈妈大码女装2017夏季黑白两色无袖连衣裙',
              price: '197.50',
              address: '杭州港宝贸易有限公司'
            },
            {
              content: '2017娃娃机各多彩类水果机拍拍乐，任君挑选',
              price: '725.00',
              address: '永互电子'
            },
            {
              content: '三级螺纹钢 HRB400E螺纹钢 申特抗震建筑螺纹钢筋',
              price: '1500.00',
              address: '杭州耀途钢铁有限公司'
            },
            {
              content: '韩版百变披肩超大高档雪纺印花围巾丝巾围脖 春夏汽车防晒 沙滩水墨画长巾',
              price: '37.50',
              address: '大地丝绸'
            },
            {
              content: '五菱宏光 宏光S 宏光/荣光V后尾灯 刹车灯 倒车灯专项组合总成配件',
              price: '37.50',
              address: '海庆配饰'
            },
            {
              content: '文容厂家直销多孔加工可调式多轴器/两轴器/三轴器固定非标器',
              price: '3000.00',
              address: '杭州天撩精密机械有限公司'
            },
            {
              content: '大棚 温室花卉蔬菜 翅片管 翅片管蒸汽热水循环散热管烟气换热管',
              price: '250.00',
              address: '杭州吉伟冷暖设备有限公司'
            }
          ]
        },
        {
          name: '热卖爆品',
          shopData: [
            {
              content: '2017新款橙色撞色棉麻长裙两件套，手工绘制花纹图案',
              price: '122.50',
              address: '杭州'
            },
            {
              content: '性能稳定化，外形美观化，款式多样化，风格灵动秀美整版铜门',
              price: '1625.00',
              address: '杭州'
            },
            {
              content: '环保户外塑木木塑地板花园防腐木生态实木浴室阳台室外地板庭院',
              price: '16.25',
              address: '杭州'
            },
            {
              content: '新材质新材料不锈钢无声雨蓬板长短任意定制',
              price: '22.50',
              address: '杭州'
            },
            {
              content: 'WG-01A豪华无障碍沙门进口折叠网、挺直耐用、不易变形',
              price: '600.00',
              address: '杭州'
            },
            {
              content: '德国都芳漆 晶典内墙乳胶漆套装 水性涂料室内墙面油漆 原装进口',
              price: '122.50',
              address: '杭州'
            },
            {
              content: '尚动龙头冷热面盆龙头台盆浴室洗脸盆水龙头旋转加高单孔水龙头',
              price: '62.50',
              address: '杭州'
            },
            {
              content: '不锈钢，集装箱门锁，标箱门锁具，杆锁，车厢门锁杆，304材质',
              price: '31.50',
              address: '杭州'
            },
            {
              content: '韩式田园窗帘 女孩男孩八角窗凸窗落地窗定制可做飘窗垫',
              price: '145.00',
              address: '杭州'
            }
          ]
        },
        {
          name: '精选店铺',
          shopData: [
            {
              address: '杭州',
              shop: '杭州五间头门业',
              clasic: '家居用品'
            },
            {
              address: '杭州',
              shop: '杭州群鑫建材',
              clasic: '机械装备'
            },
            {
              address: '杭州',
              shop: '杭州鼎晶楼梯',
              clasic: '家居用品'
            },
            {
              address: '杭州',
              shop: '醉梦装饰材料商行',
              clasic: '家居用品'
            },
            {
              address: '宁波',
              shop: '溪口恒欣电机厂',
              clasic: '机械装备'
            },
            {
              address: '绍兴',
              shop: '绍兴奥嘉纺织品',
              clasic: '服装纺织'
            },
            {
              address: '绍兴',
              shop: '杭州群鑫建材',
              clasic: '机械装备'
            },
            {
              address: '宁波',
              shop: '得顺起重设备',
              clasic: '机械装备'
            },
            {
              address: '宁波',
              shop: '威齐自动化',
              clasic: '机械装备'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    let that = this
    let Cheight = document.documentElement.clientHeight
    let imgs = document.getElementsByClassName('lazyImg')
    document.addEventListener('scroll', function () {
      that.lazyLoad(imgs, Cheight)
    })
    setTimeout(() => {
      this.lazyLoad(imgs, Cheight)
    }, 500)
  },
  methods: {
    changeNav (index) {
      this.NOWNAV = index
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
      .zone-content{
        padding: .666667rem;
        .zone-one{
          width: 11.666667rem;
          height: 15.666667rem;
          float: left;
          margin-bottom: .333333rem;
          &:nth-child(2n){
            margin-left: .333333rem;
          }
          img{
            display: block;
            width: 11.666667rem;
            height: 11.666667rem;
          }
          .des{
            background-color: white;
            height: 4rem;
            padding: .333333rem;
            box-sizing: border-box;
            .des-content{
              font-size: .666667rem;
              color: #333;
              height: 1.866667rem;
              overflow: hidden;
              margin-bottom: .333333rem;
            }
            .price{
              font-size: .8rem;
              color: #cb1b1d;
              span{
                font-size: .6rem;
              }
            }
          }
        }
        .zone-one--shop{
          float: left;
          width: 7.333333rem;
          height: 9.666667rem;
          margin-bottom: 1.333333rem;
          margin-left: .833333rem;
          &:nth-child(3n + 1){
            margin-left: 0;
          }
          img{
            display: block;
            width: 7.333333rem;
            height: 7.333333rem;
          }
          .des{
            background-color: white;
            height: 2.4rem;
            position: relative;
          }
        }
        .address{
          font-size: .466667rem;
          color: #999;
          line-height: 1.066667rem;
        }
        .clasic{
          font-size: .533333rem;
          color: #333;
        }
        .shop-name{
          position: absolute;
          height: 1rem;
          bottom: -0.5rem;
          line-height: 1rem;
          border-radius: 1rem;
          color: white;
          font-size: .666667rem;
          width: 6.666667rem;
          text-align: center;
          left: .333333rem;
          background-color: #cb1b1d;
        }
      }
    }
  }
}
</style>
