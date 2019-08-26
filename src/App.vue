<template>
   <div class="app">
    <van-nav-bar
      title="长沙H5-1903"
      left-text="返回"
      left-arrow
    />
    <router-view></router-view>
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
  }
}
</script>
<style>
</style>
