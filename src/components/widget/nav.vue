<template lang="html">
  <nav class="all-nav font-gray">
    <router-link to='/index'>
      <i class="glyphicon glyphicon-home"></i>
      首页
    </router-link>
    <router-link to='/belts'>
      <i class="glyphicon glyphicon-belt"></i>
      产业带
    </router-link>
    <a :href='`${BASEURL}cart_list.html`'>
      <i class="glyphicon glyphicon-cart"></i>
      购物车
    </a>
    <a :href='`${BASEURL}member/member.html`'>
      <i class="glyphicon glyphicon-mine"></i>
      我的
    </a>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="less">
@import '../../styles/various.less';

.all-nav{
  position: fixed;
  bottom: 0;
  background-color: white;
  height: 3.333333rem;
  box-shadow: 0px -8px 4px 0 rgba(0, 0, 0, 0.05);
  width: 100%;
  font-size: .666667rem;
  i{
    padding-top: .333333rem;
    display: block;
    font-size: 1.866667rem;
  }
  a{
    &.router-link-exact-active{
      color: @fontHover;
    }
    width: 6rem;
    text-align: center;
    display: inline-block;
    color: @fontGray;
  }
}
</style>
