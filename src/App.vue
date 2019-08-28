<template>
   <div class="app">
    <van-nav-bar
      title="长沙H5-1903"
      left-text="返回"
      left-arrow
      @click-left="goback"
      fixed
    />
    <transition name='h-animet'>
      <router-view></router-view>
    </transition>
    <van-tabbar v-model="active">
  <van-tabbar-item icon="home-o" to="/home">home</van-tabbar-item>
  <van-tabbar-item icon="search" dot to="/cart">cart</van-tabbar-item>
  <van-tabbar-item icon="friends-o" info="5" to="/friends">friends</van-tabbar-item>
  <van-tabbar-item icon="setting-o" info="20" to="/search">search</van-tabbar-item>
</van-tabbar>
  </div>
</template>
<script>
export default {
  data: () => ({
    active: 0
  }),
  created () {
  },
  methods: {
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.app{
  padding-top: 46px;
  padding-bottom: 50px;
  overflow: hidden;
  .h-animet-enter{
    transform: translateX(100%);
  }
  .h-animet-leave-to{
    transform: translateX(-100%);
    position: absolute;
  }
  .h-animet-enter-active,
  .h-animet-leave-active{
    transition: all .3s ease;
  }
}
</style>
