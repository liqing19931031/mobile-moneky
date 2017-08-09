<template lang="html">
  <div>
    <div class="detail" v-if='this.shopDetail.baseSpec'>
      <div class="detail-navs">
        <i class="glyphicon glyphicon-back" @click='$router.go(-1)'></i>
        <div class="detail-nav">
          <span :class='this.title === "shop" && "active"' @click='changeallNav("shop")'><a href="#order">商品</a></span>
          <span :class='this.title === "detail" && "active"' @click='changeallNav("detail")'><a href="#goods-detail">详情</a></span>
        </div>
        <mu-icon-menu class="glyphicon glyphicon-menu"
          icon=""
          :anchorOrigin='{horizontal: "right", vertical: "top"}'
          :targetOrigin='{horizontal: "right", vertical: "top"}'
        >
          <a href="/index">
            <mu-menu-item title="首页" />
          </a>
          <a :href='`${BASEURL}cart_list.html`'>
            <mu-menu-item title="购物车" />
          </a>
          <a :href='`${BASEURL}store_search.html`'>
            <mu-menu-item title="搜索" />
          </a>
          <a :href='`${BASEURL}member/member.html`'>
            <mu-menu-item title="我的" />
          </a>
        </mu-icon-menu>
      </div>
      <div class="order">
        <div class="order-left">
          <a :href='`${BASEURL}store.html?shop_id=${this.shopDetail.baseSpec.shop_id}`'>
            <div class="order-nav">
              <i class='glyphicon glyphicon-shop'></i>
              店铺
            </div>
          </a>
          <div class="order-nav" @click='toCollect()'>
            <i class='glyphicon' :class='this.shopDetail.is_collect ? "glyphicon-collect-in active" : "glyphicon-collect"'></i>
            收藏
          </div>
          <div class="order-nav">
            <i class='glyphicon glyphicon-contact'></i>
            联系
          </div>
        </div>
        <div class="order-right">
          <div class="add-order" @click="open(0)">
            加入进货单
          </div>
          <div class="buy-order" @click="open(1)">
            立即订购
          </div>
        </div>
      </div>
      <div class="img-priew" id="order">
        <img :src='this.shopDetail.baseSpec.goods_image' alt="">
      </div>
      <div class="shop-des">
        <div class="shop-name">
          {{this.shopDetail.baseSpec.goods_name}}
        </div>
        <div class="shop-price">
          <div class="ladder-price" v-for='item in this.shopDetail.ladder' v-if='shopDetail.ladder'>
            <time>￥</time><span>{{item.price}}</span>（≥{{item.number}}件）
          </div>
          <div v-if='this.shopDetail.interval'>
            <time>￥</time><span>{{this.shopDetail.interval.min}}~</span><time>￥</time><span>{{this.shopDetail.interval.max}}</span>
          </div>
        </div>
      </div>
      <div class="shop-evalution" v-if='this.shopDetail.evaluation.items.length > 0'>
        <router-link :to="{ path: '/evaluation', query: {id: this.$route.query.id} }">
          <div class="">
            <span style="color: #888">买家评论</span>
            <span style="margin-left: 15px">{{this.shopDetail.baseSpec.common_evaluate}}人已评论</span>
            <span class="stars pull-right">{{this.shopDetail.baseSpec.goods_evaluation_good_star}}
              <i class='glyphicon glyphicon-star'v-for='n in this.shopDetail.baseSpec.goods_evaluation_good_star'></i>
            </span>
          </div>
          <div class="eva-user">
            <img :src='this.shopDetail.evaluation.items[0][0].user_logo' alt="">
            <span>{{this.shopDetail.evaluation.items[0][0].user_name}}</span>
            <div class="eva-content">
              {{this.shopDetail.evaluation.items[0][0].content}}
            </div>
            <div style="color: #888">
              {{this.shopDetail.evaluation.items[0][0].goods_spec}}
            </div>
            <div class="text-center">
              <div class="inline-block search-eva">
                查看全部评价
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="shop-evalution" v-else>
        暂无评论~
      </div>
      <div class="join-market">
        <a :href='`${BASEURL}store.html?shop_id=${this.shopDetail.baseSpec.shop_id}`'>
          <div class="market-title">
            <img :src='this.shopDetail.storeInfo.store_logo' alt="">
            <span>{{this.shopDetail.storeInfo.store_name}}</span>
          </div>
          <div class="market-content">
            <section v-for='item in this.shopDetail.storeInfo.store_credit'>
              {{item.text}}: %{{item.credit}}
            </section>
          </div>
          <div class="market-button">
            <span><i class="glyphicon-shop glyphicon"></i>进入店铺</span>
          </div>
        </a>
      </div>
      <div class="shop-reco">
        <div class="common-reco">
          同店推荐
        </div>
        <div class="reco-list--group">
          <div class="reco-lists">
            <a :href='`/detail?id=${item.goods_id}`' v-for='(item, index) in this.recoList'>
              <div class="reco-list">
                <img :src='item.goods_image' alt="">
                <div class="reco-price">
                  ￥{{item.goods_price}}
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="goods_detail" id="goods-detail" v-html='this.shopDetail.baseSpec.goods_detail'>
      </div>
    </div>
    <div v-else style="margin-top: 150px" class="text-center">
      <mu-circular-progress :size="90" color="red" :strokeWidth="5" v-if='this.isloadding'/>
    </div>
    <mu-dialog :open="dialog" @close="close" dialogClass='modal-body' v-if='this.shopDetail.baseSpec'>
      <div class="modal-title">
        <img :src='this.shopDetail.image[this.currentType][0]' alt="">
        <div class="modal-name">
          <div>
            {{this.shopDetail.baseSpec.goods_name}}
          </div>
        </div>
      </div>
      <div class="modal-form">
        <div class="modal-nav" v-for='(value, key) in this.shopDetail.goods_stock' :class='key === currentType && "active"' @click='changeModalNav(key)'>
          <mu-badge :content='calcNumber(key)' class="demo-icon-badge" circle secondary>
            {{shopDetail.spec1[key]}}
          </mu-badge>
        </div>
      </div>
      <div class="modal-form-data" v-for='(value, key) in this.shopDetail.goods_stock' v-show='key === currentType'>
        <div class="one-shop" v-for='(xh, xhid) in value'>
          <div class="pull-left">
            <div style="color: #333">
              {{shopDetail.spec2[xhid]}}
            </div>
            <div>
              ￥{{xh.price}}
            </div>
          </div>
          <div class="pull-right goods-num">
            库存：{{xh.stock}}
            <el-input-number v-model="xh.num" @change="handleChange" :min="0" :max="xh.stock"></el-input-number>
          </div>
        </div>
      </div>
      <div class="all-number">
        共计：{{this.caclAllNumber()}} <span>￥{{this.caclAllNumber(1)}}</span>
      </div>
      <div class="button" @click='byShops()'>
        确定
      </div>
    </mu-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  data () {
    return {
      title: 'shop',
      shopDetail: {},
      recoList: [],
      isloadding: true,
      dialog: false,
      currentImg: undefined,
      currentType: '',
      isbuy: 0
    }
  },
  mounted () {
    this.getShopDetail()
  },
  methods: {
    changeModalNav (index) { // 修改当前所在商品类型
      this.currentType = index
    },
    changeallNav (nownav) { // 改变title栏
      this.title = nownav
    },
    calcNumber (index, isprice) { // 计算分类商品数量
      let number = 0
      let price = 0
      for (let key in this.shopDetail.goods_stock[index]) {
        number = +this.shopDetail.goods_stock[index][key].num + number
        price = +this.shopDetail.goods_stock[index][key].num * +this.shopDetail.goods_stock[index][key].price + price
      }
      return isprice ? price : number.toString()
    },
    isin () { // 判断是否登录
      if (!this.getCookie('user_account')) {
        window.location.href = this.setUrl()
      }
    },
    toCollect () { // 收藏操作
      this.isin()
      if (this.shopDetail.is_collect === 1) {
        Message('您已经收藏过此店铺拉~')
      }
      this.$ajax('get', '', {
        ctl: 'Goods_GoodsExt',
        met: 'collectGoods',
        typ: 'json',
        goods_id: this.shopDetail.baseSpec.goods_id
      }).then((data) => {
        if (data.data.status === 200) {
          this.shopDetail.is_collect = 1
        }
      })
    },
    caclAllNumber (isprice) { // 计算商品价格
      let number = 0
      for (let index in this.shopDetail.goods_stock) {
        number = number + +this.calcNumber(index, isprice)
      }
      return +number
    },
    editPrice (price) {
      for (let key in this.shopDetail.goods_stock) {
        for (let newKey in this.shopDetail.goods_stock[key]) {
          this.shopDetail.goods_stock[key][newKey].price = price
        }
      }
    },
    handleChange () { // 阶梯价二次渲染
      setTimeout(() => {
        if (this.shopDetail.ladder.length > 0) {
          this.shopDetail.ladder.forEach((item, index) => {
            if (this.shopDetail.ladder[index + 1]) {
              if (this.caclAllNumber() > item.number && this.caclAllNumber() < this.shopDetail.ladder[index + 1].number) {
                this.editPrice(item.price)
              }
            } else {
              if (this.caclAllNumber() > item.number) {
                this.editPrice(item.price)
              }
            }
            if (this.caclAllNumber() <= this.shopDetail.ladder[0].number) {
              this.editPrice(this.shopDetail.ladder[0].price)
            }
          })
        }
      }, 100)
    },
    byShops () { // 下单 / 加入购物车
      this.isin()
      let goodsNorms = {}
      for (let key in this.shopDetail.goods_stock) {
        for (let newKey in this.shopDetail.goods_stock[key]) {
          if (this.shopDetail.goods_stock[key][newKey].num > 0) {
            goodsNorms[`${key}_${newKey}`] = this.shopDetail.goods_stock[key][newKey].num
          }
        }
      }
      if (JSON.stringify(goodsNorms) === '{}') {
        Message({
          message: '请在购物车中添加商品~',
          type: 'warning'
        })
      } else {
        JSON.stringify(goodsNorms) !== '{}' && this.$ajax('get', '', {
          ctl: 'Buyer_CartExt',
          met: 'addCart',
          typ: 'json',
          goods_norms: JSON.stringify(goodsNorms),
          common_id: this.shopDetail.baseSpec.goods_id
        }).then((data) => {
          if (data.data.status === 200) {
            this.isbuy ? window.location.href = 'http://wap.mhw001.com/tmpl/cart_list.html' : Message({
              message: '加入购物车成功~',
              type: 'success'
            })
          }
        })
      }
    },
    getShopDetail () { // 初始化数据获取
      this.$ajax('get', '', {
        ctl: 'Goods_GoodsExt',
        met: 'goodsInfo',
        typ: 'json',
        gid: this.$route.query.id
      }).then((data) => {
        if (data.status === 200) {
          this.shopDetail = data.data
          let typeArry = []
          for (let key in data.data.spec1) {
            typeArry.push(key)
          }
          this.currentType = typeArry[0]
          return this.$ajax('get', '', {
            ctl: 'Goods_GoodsExt',
            met: 'recommendedInSameStore',
            typ: 'json',
            shopId: data.data.baseSpec.shop_id
          })
        }
      }).then((result) => {
        if (result.status === 200) {
          this.recoList = result.data
          this.isloadding = false
        }
      })
    },
    close () { // 模态框开启关闭
      this.dialog = false
    },
    open (isbuy) {
      this.isbuy = isbuy
      this.dialog = true
    }
  }
}
</script>

<style lang="less">
a{
  color: inherit;
}
.detail{
  padding-bottom: 3.333333rem;
  background-color: #f6f6f6;
  padding-top: 3.333333rem;
}
.detail-navs{
  height: 3.333333rem;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  background-color: white;
  text-align: center;
  .detail-nav{
    line-height: 3.333333rem;
    font-size: 1.133333rem;
    width: 9rem;
    display: inline-block;
    span{
      padding: .2rem 0;
      &.active{
        border-bottom: 2px solid #cb1b1d;
      }
    }
    span + span{
      margin-left: 3rem;
    }
  }
  .glyphicon-back{
    position: absolute;
    top: 1.133333rem;
    left: 1rem;
  }
  .glyphicon-menu{
    float: right;
    width: 1.333333rem;
    height: 3.333333rem;
    padding: 1.133333rem 0;
    padding-right: 2rem;
  }
}
.order{
  position: fixed;
  bottom: 0;
  height: 3.333333rem;
  z-index: 999;
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
  .order-left{
    float: left;
    display: inline-block;
    height: 100%;
    width: 11rem;
    color: #888;
    .order-nav{
      height: 100%;
      display: inline-block;
      width: 3.333333rem;
      text-align: center;
      font-size: .6rem;
      i{
        padding-top: .666667rem;
        display: block;
        font-size: 1.333333rem;
      }
    }
  }
  .order-right{
    float: left;
    display: inline-block;
    height: 100%;
    width: 14rem;
    .add-order,
    .buy-order{
      height: 100%;
      float: left;
      text-align: center;
      width: 7rem;
      line-height: 3.333333rem;
      font-size: .933333rem;
    }
    .add-order{
      color: #cb1b1d;
      background-color: #f5d1d1;
    }
    .buy-order{
      color: white;
      background-color: #cb1b1d;
    }
  }
}
.img-priew{
  height: 25rem;
  width: 25rem;
  img{
    height: 100%;
    width: 100%
  }
}
.shop-des{
  padding: .666667rem 1rem;
  background-color: white;
  border-bottom: 1px solid #ddd;
  .shop-name{
    font-size: .666667rem;
    color: #333;
  }
  .shop-price{
    .ladder-price{
      width: 7.666667rem;
      display: inline-block;
      font-size: .6rem;
    }
    time{
      font-size: .6rem;
      color: #cb1b1d;
    }
    span{
      font-size: 1rem;
      color: #cb1b1d;
    }
  }
}
.shop-evalution{
  font-size: .666667rem;
  padding: 1.333333rem 1rem;
  background-color: white;
  margin: .666667rem 0;
  .stars{
    color: #cb1b1d;
  }
  .eva-user{
    margin-top: 1.333333rem;
    img{
      width: 1.666667rem;
      height: 1.666667rem;
      display: inline-block;
      margin-right: .666667rem;
    }
    .eva-content{
      margin-top: .666667rem;
    }
    .search-eva{
      margin-top: .5rem;
      padding: .266667rem .6rem;
      border: 1px solid #cb1b1d;
      color: #cb1b1d;
      border-radius: 1rem;
    }
  }
}
.shop-reco{
  padding: .666667rem 1rem;
  border-top: 1px solid #ddd;
  background-color: white;
  height: 12rem;
  .common-reco{
    margin-left: .666667rem;
    margin-bottom: .666667rem;
  }
  .reco-list--group{
    overflow-x: auto;
    overflow-y: hidden;
  }
  .reco-lists{
    white-space: nowrap;
    width: 100%;
    height: 8.666667rem;
    a + a{
      margin-left: .333333rem;
    }
    .reco-list{
      display: inline-block;
      width: 7.333333rem;
      height: 8.666667rem;
      padding: .333333rem;
      box-sizing: border-box;
      border: 1px solid #bbb;
      img{
        width: 6.666667rem;
        height: 6.666667rem;
        display: block;
      }
      .reco-price{
        color: #cb1b1d;
        font-size: .533333rem;
        text-align: center;
        line-height: 1.5rem;
      }
    }
  }
}
.join-market{
  height: 10rem;
  margin-bottom: .666667rem;
  background-color: white;
  margin-top: .666667rem;
  padding: .666667rem 1rem;
  box-sizing: border-box;
  .market-title{
    height: 3.333333rem;
    line-height: 3.333333rem;
    img{
      display: inline-block;
      float: left;
      width: 3.333333rem;
      height: 3.333333rem;
      margin-right: 1rem;
    }
  }
  section{
    width: 11.333333rem;
    display: inline-block;
    color: #888;
    font-size: .6rem;
    line-height: 1rem;
  }
  .market-button{
    text-align: center;
    margin-top: .333333rem;
    span{
      padding: .1rem .4rem;
      font-size: .8rem;
      border: 1px solid #cb1b1d;
      color: #cb1b1d;
      border-radius: 1rem;
    }
  }
}
.goods_detail{
  width: 100%;
  img{
    width: 100%!important
  }
  table{
    width: 100%!important;
  }
}
.modal-body{
  width: 25rem;
  left: 0;
  position: absolute;
  bottom: 0;
  height: 30rem;
  .modal-title{
    height: 7rem;
    padding: 1rem;
    box-sizing: border-box;
    position: relative;
    .modal-name{
      margin-left: 8rem;
      font-size: .666667rem;
    }
    img{
      position: absolute;
      left: 1rem;
      top: -1.333333rem;
      width: 6.666667rem;
      height: 6.666667rem;
      z-index: 999;
      border-radius: .266667rem;
    }
  }
  .mu-dia-body{
    padding: 0;
    margin: 0;
    overflow: visible!important;
  }
  .button{
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    line-height: 2.666667rem;
    text-align: center;
    color: white;
    background-color: #cb1b1d;
  }
  .modal-form{
    height: 2rem;
    white-space: nowrap;
    background-color: #fafafa;
    padding: 0 2rem;
    .modal-nav{
      display: inline-block;
      font-size: .733333rem;
      padding: 0 .266667rem;
      & + .modal-nav{
        margin-left: 3rem;
      }
      &.active{
        color: #cb1b1d;
        border-bottom: 1px solid #cb1b1d;
      }
    }
  }
  .modal-form-data{
    padding: 0 1rem;
    overflow: auto;
    .one-shop{
      font-size: .6rem;
      height: 4rem;
      padding: .666667rem;
      border-bottom: 1px solid #ddd;
      .goods-num{
        line-height: 2rem;
        .goods-reduce,
        .goods-add{
          width: 1.333333rem;
          height: 1.333333rem;
          text-align: center;
          border: 1px solid #ddd;
        }
      }
    }
  }
  .all-number{
    font-size: .6rem;
    line-height: 2rem;
    float: right;
    padding-right: 2rem;
  }
}
</style>
