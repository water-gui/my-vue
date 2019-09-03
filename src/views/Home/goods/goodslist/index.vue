<template>
  <div class="goodslist">
      <div v-for="good in goods" :key="good.id" @click="goTargrt(good.id)">
        <img :src="good.img_url" alt="">
        <h1>{{good.title}}</h1>
        <ul>
          <li class="img-t">￥{{good.sell_price}} &nbsp;<del> ￥{{good.market_price}}</del></li>
          <li class="img-b"><span>热卖中</span><span>剩余{{good.stock_quantity}}件</span></li>
        </ul>
      </div>
      <van-button type="danger" @click="getMore">{{hasFlag?'没有更多数据':'加载更多'}}</van-button>
  </div>
</template>
<script>
export default {
  data: () => ({
    pageindex: 0,
    goods: [],
    limit: 3,
    hasFlag: false
  }),
  created () {
    this.getGoods()
  },
  methods: {
    async getGoods() {
      if (this.hasFlag !== false) return
      this.pageindex++
      const {
        data: { message, status, count }
      } = await this.$http.get(`/api/getgoods?pageindex=${this.pageindex}&limit=${this.limit}`)
      if (status !== 0) return this.$Toast('获取商品信息失败')
      console.log(message)
      this.goods = this.goods.concat(message)
      this.hasFlag = this.pageindex * this.limit > count
      console.log(this.hasFlag)
    },
    getMore() {
      this.getGoods()
    },
    goTargrt(id) {
      this.$router.push('/home/goodsinfo/' + id)
    }
  }
}
</script>
<style  lang="less" scope>
.goodslist{
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  li{
    list-style: none;
  }
  h1{
    font-size: 16px;
    padding-left:4px;
  }
  img{
    width: 100%;
    height: 140px;
  }
  .img-t{
    color: rgb(253, 117, 27);
    font-weight: 600;
    font-size: 16px;
    padding-left:6px;
    del{
      color: #000;
      font-size: 12px;
      font-weight: 400;
    }
  }
  .img-b{
    font-weight: 600;
    background:#ccc;
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    padding: 0 8px;
  }
  div{
    box-sizing: border-box;
    width: 50%;
    height: 250px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 8px #ccc;
    margin-bottom: 4px;
  }
}
</style>
