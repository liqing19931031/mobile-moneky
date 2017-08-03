<template lang="html">
  <div class="evaluation">
    <div class="detail-navs">
      <i class="glyphicon glyphicon-back" @click='$router.go(-1)'></i>
      <div class="detail-nav">
        <span>评价</span>
      </div>
    </div>
    <div class="eva-nav">
      <div class="eva-navs" v-for='(itme, index) in this.types' :class='index === type && "active"' @click='changeType(index)'>
        {{itme}}
      </div>
    </div>
    <div class="eva-lists" v-if='this.evaList.length > 0'>
      <div class="eva-one" v-for='(item, index) in this.evaList'>
        <div class="eva-one-title">
          <img :src='item[0].user_logo' alt="">
          <span>{{item[0].user_name}}</span>
        </div>
        <div class="eva-fenlei">
          {{item[0].goods_spec}}
        </div>
        <div class="eva-content">
          {{item[0].content}}
          <div class="">
            <img :src='item' alt="" v-for='item in item[0].image_row'>
          </div>
        </div>
        <div class="eva-bytime">
          购买日期：{{item[0].create_time}} <span @click='openEva(index)'>追加评价 <i class="glyphicon glyphicon-top"></i> </span>
        </div>
        <div class="eva-addeva--list">
          <div class="eva-addeva" v-for='(evas, nowIndex) in item'  v-if='nowIndex >= 1' v-show='item.is_open === 1'>
            <span>
              用户追评 <time>{{evas.create_time}}</time>
            </span>
            <div class="">
              {{evas.content}}
            </div>
          </div>
        </div>
      </div>
      <div class="text-center get-more" style='color: #999'>
        {{this.getMore}}
      </div>
    </div>
    <div class="eva-lists text-center" v-else>
      无评论信息~
    </div>
    <div class="loadding" v-if='this.isloadding'>
      <img src='/static/loadding.gif' alt="">
    </div>
  </div>
</template>

<script>
// 动画效果暂时没做
export default {
  data () {
    return {
      types: [
        '全部评价',
        '好评',
        '中评',
        '差评',
        '有图'
      ],
      evaList: [],
      currentPage: 0,
      getMore: '',
      type: 0,
      isloadding: false
    }
  },
  mounted () {
    this.getEvaluation()
    document.addEventListener('scroll', this.handlerScroll)
  },
  methods: {
    getEvaluation (type) {
      this.currentPage = type !== undefined ? 1 : this.currentPage + 1
      this.isloadding = true
      this.$ajax('get', '', {
        ctl: 'Goods_GoodsExt',
        met: 'getGoodsEvaluationList',
        typ: 'json',
        type: this.type,
        sou: 'wap',
        goods_id: 299,
        curpage: this.currentPage,
        page: 4
      }).then((data) => {
        this.isloadding = false
        this.evaList = type !== undefined ? data.data.items : [...this.evaList, ...data.data.items]
        this.getMore = data.data.items.length ? '已经到底了只能帮你到这里啦~' : ''
      })
    },
    getScrollTop () {
      let scrollTop = 0
      let bodyScrollTop = 0
      let documentScrollTop = 0
      if (document.body) {
        bodyScrollTop = document.body.scrollTop
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop
      }
      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop
      return scrollTop
    },
    getScrollHeight () {
      let scrollHeight = 0
      let bodyScrollHeight = 0
      let documentScrollHeight = 0
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight
      }
      scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
      return scrollHeight
    },
    getWindowHeight () {
      var windowHeight = 0
      if (document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight
      } else {
        windowHeight = document.body.clientHeight
      }
      return windowHeight
    },
    handlerScroll () {
      if (this.getScrollTop() + this.getWindowHeight() === this.getScrollHeight()) {
        this.getEvaluation()
      }
    },
    openEva (index) {
      this.evaList[index].is_open = Math.abs(this.evaList[index].is_open - 1)
    },
    changeType (type) {
      this.type = type
      this.getEvaluation(type)
    }
  }
}
</script>

<style lang="less">
.evaluation{
  background-color: #fafafa;
  .detail-navs{
    height: 3.333333rem;
    width: 100%;
    background-color: white;
    position: relative;
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
    i{
      position: absolute;
      top: 1.133333rem;
      left: 1rem;
    }
  }
  .eva-nav{
    margin-bottom: 1.333333rem;
    height: 2rem;
    line-height: 2rem;
    background-color: white;
    margin-top: 1.333333rem;
    .eva-navs{
      display: inline-block;
      width: 5rem;
      text-align: center;
      &.active{
        color: #cb1b1d;
      }
    }
  }
  .eva-lists{
    background-color: white;
    .eva-one{
      font-size: .666667rem;
      padding: .666667rem 1rem;
      border-bottom: 1px solid #ddd;
      .eva-one-title{
        line-height: 1.666667rem;
        color: #333;
        img{
          width: 1.666667rem;
          height: 1.666667rem;
          display: inline-block;
          margin-right: .666667rem;
        }
      }
      .eva-fenlei{
        line-height: 2.266667rem;
        font-size: .6rem;
        color: #888;
      }
      .eva-bytime{
        font-size: .6rem;
        color: #888;
        line-height: 1.2rem;
        span{
          border: solid 1px #dddddd;
          border-radius: 1rem;
          padding: 0 0.4rem;
          display: block;
          float: right;
        }
      }
      .eva-content{
        img{
          width: 7rem;
          height: 7rem;
          margin-left: 1rem;
          display: inline-block;
          &:nth-child(3n + 1){
            margin-left: 0;
          }
        }
      }
      .eva-addeva--list{
        margin-top: 1rem;
        .eva-addeva{
          font-size: .6rem;
          height: 3rem;
          span{
            color: #cb1b1d;
            display: block;
            margin-bottom: .666667rem;
          }
          time{
            color: #888;
          }
        }
      }
    }
    .get-more{
      line-height: 2rem;
    }
  }
}
</style>
