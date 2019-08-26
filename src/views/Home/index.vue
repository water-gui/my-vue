<template>
  <div class="hoem">
    <div class="lunbo">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in lunbolist" :key="item.id">
          <img :src="item.img" alt="" width="100%" height="200px">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="jiugg">
      <van-grid :column-num="3">
        <van-grid-item v-for="grid in grids" :key="grid.id" :text="grid.title" props="grid">
          <template slot="icon">
            <img :src="grid.src" alt="">
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>

export default {
  data: () => ({
    lunbolist: [],
    grids: []
  }),
  created () {
    this.getlunbo()
    this.getGrids()
  },
  methods: {
    async getlunbo() {
      const {
        data: { message, status }
      } = await this.$http.get('api/getlunbo')
      if (status !== 0) return this.$Toast('获取轮播图失败')

      this.lunbolist = message
    },
    async getGrids() {
      const {
        data: { message, status }
      } = await this.$http.get('http://localhost:5000/api/girds')
      if (status !== 0) return this.$Toast('获取九宫格失败')

      this.grids = message
      console.log(message)
    }
  }
}
</script>
<style>
.jiugg img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
