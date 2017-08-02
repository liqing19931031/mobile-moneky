<template lang="html">
  <div class="slide-component">
    <div class="slide-navs" v-if='specialDom === "bestGoods"'>
      <div class="slide-nav" :class='nowindex === index && "active"' @click='changeIndex(nowindex)' v-for='(item, nowindex) in this.imgList' v-if='nowindex >= 1 && nowindex < imgList.length - 1'>
        <i class="glyphicon" :class='`glyphicon-${icons[nowindex]}`'></i>
        {{item.name}}
      </div>
    </div>
    <div class="slide-navs bestBusiness" v-if='specialDom === "bestBusiness"'>
      <div class="slide-nav" :class='nowindex === index && "active"' @click='changeIndex(nowindex)' v-for='(item, nowindex) in this.imgList' v-if='nowindex >= 1 && nowindex < imgList.length - 1'>
        {{item.name}}
      </div>
    </div>
    <div class="slide-group" :style='{height: this.height}'>
      <div class="slide-box" :style='{
        width: this.imgList.length * 25 + "rem",
        transition: `all ease ${this.slideSecond}s`,
        height: this.height,
        left: this.groupLeft + "px"
        }'>
        <div class="slide-one" ref="slides" v-for='(item, index) in this.imgList' v-if='item'>
          <a href="" v-if='specialDom === ""'>
            <img :src='item.homepage_pic' alt="">
          </a>
          <div v-else :is='specialDom' :data='item'>
          </div>
        </div>
      </div>
      <div class="slide-dots" v-if='this.hasDot'>
        <div v-for='(item, nowindex) in this.imgList' :data-index='nowindex' class='slide-dot' :class='nowindex === index && "dot-active"' v-if='nowindex >= 1 && nowindex < imgList.length - 1'>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: 根据天猫的思路swiper插件的思路根据自己定制的移动端轮播组件 待优化： 需要对获取获取过来的数据二次处理(二次传递的数据在父组件已经做了)，这样真的不怎么好
// 有能看懂本渣渣写的组件的人的话 帮我改一下吧~这样真的不怎么合理不够抽象和父组件产生了耦合
import bestGoods from './bestGoods'
import bestBusiness from './bestBusiness'

export default {
  props: {
    imgList: {
      type: Array,
      default: function () {
        return []
      }
    },
    height: { // 组件高度
      type: String,
      default: '11rem'
    },
    autoplay: { // 是否开启自动轮播
      type: Boolean,
      default: false
    },
    time: { // 轮播间隔事件
      type: Number,
      default: 1000
    },
    hasDot: { // 是否 需要点状标识
      type: Boolean,
      default: false
    },
    specialDom: { // 接受特殊组件dom
      type: String,
      default: ''
    }
  },
  components: {
    bestGoods,
    bestBusiness
  },
  data () {
    return {
      groupLeft: -document.documentElement.getBoundingClientRect().width, // 轮播组左偏移距离
      startX: 0,
      endX: 0,
      icons: [
        '',
        'clothing',
        'household',
        'materials',
        'config',
        'electronic'
      ],
      index: 1,
      allWidth: document.documentElement.getBoundingClientRect().width,
      lastTouchmove: 0, // touchMove 过程中的位置 （用于计算偏移量）
      slideSecond: 0.3 // 轮播过渡动画时间
    }
  },
  mounted () {
    let that = this
    setTimeout(() => { // 确保dom被加载才用的延时 待修改
      for (let item of this.$refs.slides) { // touch 事件绑定
        item.addEventListener('touchstart', function (e) {
          that.handleStart(e)
        })
        item.addEventListener('touchmove', function (e) {
          that.handleMove(e)
        })
        item.addEventListener('touchend', function (e) {
          that.handleEnd(e)
        })
      }
    }, 1000)
    // this.autoPlay()
  },
  methods: {
    autoPlay (index) {
      setTimeout(() => {
        this.changeIndex(index)
        this.index = this.index + 1
      }, 1500)
      this.autoPlay(index)
    },
    handleStart (e) { // touchstart
      this.slideSecond = 0
      this.startX = e.touches[0].pageX
    },
    handleMove (e) { // touchmove
      let pianyi = this.lastTouchmove === 0 ? 0 : e.touches[0].pageX - this.lastTouchmove
      this.groupLeft = pianyi + this.groupLeft
      this.lastTouchmove = e.touches[0].pageX
      this.endX = e.touches[0].pageX
    },
    handleEnd (e) { // touch时间结束
      this.slideSecond = 0.3
      this.lastTouchmove !== 0 && this.endSlide()
      this.lastTouchmove = 0
    },
    changeIndex (index) {
      this.index = index
      this.groupLeft = -index * document.documentElement.getBoundingClientRect().width
    },
    setDot (num) { // 圆点设置方法
      if (num === 0 || num === -(this.imgList.length - 1)) {
        this.index = num === 0 ? this.imgList.length - 2 : 1
      } else {
        this.index = -num
      }
    },
    endSlide () { // touchend
      if (Math.abs(this.startX - this.endX) > (this.allWidth / 3)) { // 拖动距离大于整体宽度三分之一时 执行滑动动作
        let number = this.startX > this.endX ? parseInt(this.groupLeft / this.allWidth) - 1 : parseInt(this.groupLeft / this.allWidth)
        this.groupLeft = number * this.allWidth
        if (number === 0 || number === -(this.imgList.length - 1)) {
          setTimeout(() => {
            this.slideSecond = 0
            if (number === 0) {
              this.groupLeft = -(this.imgList.length - 2) * this.allWidth
            } else {
              this.groupLeft = -this.allWidth
            }
          }, 300)
        }
        this.setDot(number)
        // this.setState({'index': number === this.props.data.slideData.length - 2 ? 1 : number})
      } else { // 拖动距离小于三分之一时 回到当前位置
        let number = this.startX > this.endX ? parseInt(this.groupLeft / this.allWidth) : parseInt(this.groupLeft / this.allWidth) - 1
        this.groupLeft = number * this.allWidth
        this.setDot(number)
      }
    }
  }
}
</script>

<style lang="less">
.slide-navs{
  height: 4.333333rem;
  background-color: #f95355;
  &.bestBusiness{
    background-color: white;
    font-size: .666667rem;
    line-height: 4.333333rem;
    border-bottom: 2px solid #e5e5e5;
    .slide-nav{
      &.active{
        color: #cb1b1d;
        border-bottom: 2px solid #cb1b1d;
      }
    }
  }
  .slide-nav{
    text-align: center;
    display: inline-block;
    width: 5rem;
    font-size: .8rem;
    color: #333;
    i{
      display: block;
      font-size: 2rem;
      padding-top: .5rem;
    }
    &.active{
      color: white;
      font-weight: bold;
      i{
        color: white;
      }
    }
  }
}
.slide-group{
  width: 100%;
  overflow: hidden;
  position: relative;
  .slide-box{
    position: absolute;
    left: 0;
    top: 0;
    .slide-one{
      width: 25rem;
      height: 100%;
      display: inline-block;
      img{
        width: 25rem;
        height: 100%;
      }
    }
  }
  .slide-dots{
    position: absolute;
    width: 25rem;
    bottom: 5px;
    left: 0;
    text-align: center;
    .slide-dot{
      display: inline-block;
      width: .6rem;
      height: .6rem;
      border-radius: 50%;
      border: 1px solid white;
      opacity: 0.8;
      &.dot-active{
        background-color: #cb1b1d;
        border-color: #cb1b1d;
      }
    }
    .slide-dot + .slide-dot{
      margin-left: .333333rem;
    }
  }
}

</style>
