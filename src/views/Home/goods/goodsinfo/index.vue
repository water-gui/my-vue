<template>
  <div class="goods-info">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="isShow" id="ball" ref="ballRef"></div>
    </transition>
    <div class="lunbo">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="thum in thums" :key="thum.id">
          <img :src="thum.src" alt width="100%" height="200px" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- <div v-for="good in goods" :key="good.id" > -->
        <van-panel :title="newslist.title" class="goods-cen" >
             <p class="fsite-p">市场价格:<span>{{newslist.market_price}}</span>销售价格:<span>{{newslist.sell_price}}</span></p>
            <div class="g-cen-d">
            <!-- 步进器 -->
                <p>购买数量:<van-stepper v-model="value" /></p>
            <!-- 按钮 -->
                <van-button type="primary" size="small">立即购买</van-button>
                <van-button type="danger" size="small" @click="addCart" :disabled="isDisable">加入购物车</van-button>
            </div>
        </van-panel>
        <van-panel title="商品信息" class="goods-cen" >
             <div class="fsite-p">
                 <p>商品货号: <span> {{newslist.goods_no}}</span></p>
                 <p>库存情况: <span> {{newslist.stock_quantity}}件</span></p>
                 <p>上架时间: <span> {{newslist.add_time}}</span></p>
            </div>
        </van-panel>
    <!-- </div> -->
    <div>注意事项:</div>
    <p style="font-size:12px;color:#999;padding:0 8px;">1、订单生成后如何修改订单：
A、 基于网站在售部分商品属于低价促销，因此订单应付金额（不含使用的优惠券金额)大于等于99元选择在线支付全国范围内普通快递包邮；如低于99元，您需要每单支付15元运费。
B、 您的订单生成后，所有订单信息您将无法自行修改，如需修改可通过以下两种方式进行操作：
 方法一：自主取消订单后重新订购商品
 方法二：联系优购客服修改订单
2、如何查询订单配送情况：
订单发货后，您可以直接在“我的优购-我的订单-订单详情”中，查看到订单的具体配送信息，无需登录快递公司官网进行查询。
3、签收商品时，您需要注意的是：
第一步：检查物流包装、“优购安全封条”是否完好
 第二步：开箱验货
 第三步：
 A、 满意无问题：签收/付款
 B、 商品不满意/存在质量问题：直接拒收
 C、 缺少商品，直接拒收</p>
  </div>
</template>
<script>
export default {
  data: () => ({
    id: '',
    thums: [],
    newslist: [],
    value: 1,
    isShow: false,
    xDist: 0,
    yDist: 0,
    isDisable: false
  }),
  created() {
    this.id = this.$route.params.id
    this.getThumImages()
    this.getGoodsinfo()
    this.aaa()
  },
  methods: {
    async getThumImages() {
      const {
        data: { message, status }
      } = await this.$http.get(`api/getthumimages/${this.id}`)
      if (status !== 0) return this.$Toast('获取图片失败')
      console.log(message)
      this.thums = message
    },
    async getGoodsinfo() {
      const {
        data: { message, status }

      } = await this.$http.get(`/api/goods/getinfo/${this.id}`)
      if (status !== 0) return this.$Toast('获取商品信息失败')
      this.newslist = message
      console.log(message)
    },
    getBound() {
      // 起始的位置
      let ball = this.$refs.ballRef.getBoundingClientRect()
      let info = document.querySelector('.van-info').getBoundingClientRect()
      console.log(ball)
      console.log(info)

      this.xDist = info.left - ball.left
      this.yDist = info.top - ball.top
    },
    addCart() {
      this.isShow = !this.isShow
      //   点击的瞬间 禁用按钮
      this.isDisable = true
      setTimeout(() => {
        // 当动画结束了 再 重新激活按钮
        this.isDisable = false
      }, 400)
      let goodsinfo = {
        id: this.$route.params.id,
        count: this.value,
        sell_price: this.newslist.sell_price,
        selected: true,
        title: this.newslist.title,
        src: this.thums[0].src,
        timer: null
      }
      this.$store.commit('addCart', goodsinfo)
    },
    beforeEnter(el) {
      // 设置起始的位置
      console.log(el)
      el.style.transform = 'translate(0,0)'
    },
    enter(el, done) {
      // eslint-disable-next-line no-unused-expressions
      el.offsetLeft
      // 获取移动的距离
      this.getBound()
      // 设置目的地的位置
      el.style.transform = `translate(${this.xDist}px,${this.yDist}px)`
      el.style.transition = 'all .3s ease'
      done()
    },
    afterEnter() {
      this.isShow = false
    }
  }
}
</script>
<style lang="less" scoped>
.goods-info {
    position: relative;
    .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    top: 266px;
    left: 156px;
    z-index: 10;
  }
  .lunbo {
    height: 150px;
    img {
      width: 100%;
      display: block;
    }
  }
  .goods-cen{
      border: 1px solid #ccc;
      border-radius: 4px;
      margin: 6px 2px;
      .fsite-p{
          margin: 0 12px;
          font-size: 14px;
          color:#666;
          padding-top: 4px;
          border-top:1px solid #ccc;
      }
      .g-cen-d{
          padding:0 12px;
          padding-bottom: 10px;
          p{
            font-size: 14px;
            margin-top: 8px;
            margin-bottom: 8px;
            color:#666;
              .van-stepper{
                vertical-align: 4px;
                display: inline-block
            }
          }
          button{
              margin-right: 8px;
          }
      }
  }
}
</style>
