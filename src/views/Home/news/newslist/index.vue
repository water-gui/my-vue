<template>
  <div class="newlist">
    <router-link v-for="item in newslist" :key="item.id" :to="'/home/newsinfo/'+item.id">
      <van-card :title="item.title" :thumb="item.img_url">
        <div slot="price">
          <span>发表时间:{{item.add_time}}</span>
        </div>
        <div slot="num">
          <span>点击{{item.click}}次</span>
        </div>
      </van-card>
    </router-link>
  </div>
</template>
<script>
// 获取新闻列表信息
export default {
  data: () => ({
    newslist: []
  }),
  created() {
    this.getNewsList()
  },
  methods: {
    async getNewsList() {
      const {
        data: { message, status }
      } = await this.$http.get('api/getnewslist')
      if (status !== 0) return this.$Toast('获取新闻信息失败')

      this.newslist = message
    }
  }
}
</script>
<style>

.van-card__header .van-card__thumb{
  height: 53px;
}
.van-card__header .van-card__content{
  min-height: 53px;
}
.van-card__price,.van-card__num{
  margin-top: 15px;
}
.newlist .van-card__title{
  color: #000;
  font-size: 14px;
  text-align: left;
}
</style>
