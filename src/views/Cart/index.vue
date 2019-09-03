<template>
  <div class="cart">
    <div class="cart-t" v-for=" (cart,index) in $store.state.cart" :key="cart.id">
      <van-switch v-model="checked" />
      <div class="cart-t-m">
        <van-card :num="cart.count" :price="cart.sell_price" :title="cart.title" :thumb="cart.src" props="index">
        <template slot="desc">
          <van-stepper v-model="cart.count" @plus="plus(index,cart.id)" @minus="plus(index,cart.id)" ref="stepRef"/>
        </template>
      </van-card>
      </div>
    </div>
    <van-submit-bar :price="$store.getters.getAllPrice.allPrice*100" button-text="提交订单" />
  </div>
</template>
<script>
export default {
  data: () => ({
    checked: true
  }),
  created() {},
  methods: {
    plus(index, id) {
      let value = this.$refs.stepRef[index].currentValue
      let arr = JSON.parse(localStorage.getItem('cart'))
      arr.some(item => {
        if (item.id === id) {
          item.count = value
          return true
        }
      })
      localStorage.setItem('cart', JSON.stringify(arr))
    }
  }
}
</script>
<style>
.cart-t {
  display: flex;
  align-items: center;
  border: 1px solid pink;
  padding: 8px;
  margin-bottom: 8px;
}
.van-card__content .van-card__title{
  color: black;
  text-align: left;
  margin-bottom: 4px;
}
.van-card__bottom, .van-card__desc {
    line-height: 0;
}
.cart-t-m{
  width: 100%;
}
.cart .van-card {
  padding-left: 0;
  margin-left: 14px;
}
.cart .van-card__thumb {
  margin-top: 6px;
}
</style>
