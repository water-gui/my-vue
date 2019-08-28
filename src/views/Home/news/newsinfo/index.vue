<template>
  <div class="newsinfo">
    <van-card :title="newsinfo.title">
      <div slot="price">
        <span>发表时间:{{newsinfo.add_time}}</span>
      </div>
      <div slot="num">
        <span>点击{{newsinfo.click}}次</span>
      </div>
    </van-card>
    <hr />
    <div class="txts">
        {{newsinfo.content}}
    </div>

    <!-- 评论区 -->
    <comment :comments="comments" @postcomment="postcomment"></comment>

    <van-button plain type="danger" @click="getMore">{{hasFlag?'没有更多数据':'加载更多'}}</van-button>
  </div>
</template>
<script>
import Comment from '@/components/comment'
export default {
  data: () => ({
    id: '',
    newsinfo: {},
    pageindex: 1,
    limit: 3,
    comments: [],
    hasFlag: false
  }),
  created() {
    this.id = this.$route.params.id
    this.getNewsInfo()
    this.getComments()
  },
  methods: {
    async getNewsInfo() {
      const {
        data: { message, status }
      } = await this.$http.get(`/api/getnew/${this.id}`)
      if (status !== 0) return this.$Toast('获取新闻资讯信息失败')

      this.newsinfo = message
    },
    async getComments() {
      if (this.hasFlag !== false) return
      const {
        data: { message, status, count }
      } = await this.$http.get(`/api/getcomments/${this.id}?pageindex=${this.pageindex}&limit=${this.limit}`)
      if (status !== 0) return this.$Toast('获取新闻资讯信息失败')
      this.comments = this.comments.concat(message)
      this.hasFlag = this.pageindex * this.limit > count
      // console.log(count)
      // console.log(this.hasFlag)
    },
    getMore() {
      this.pageindex++
      this.getComments()
    },
    async postcomment(data) {
      const { data: { message, status } } = await this.$http.post(`api/postcomment/${this.id}`, { content: data })
      if (status !== 0) return this.$Toast('发表评论失败')
      // console.log(message)
      this.comments.unshift({
        user_name: '匿名用户',
        content: data,
        add_time: Date.now()
      })
    }
  },
  components: {
    Comment
  }
}
</script>
<style>
.app{
    padding: 0 4px;
}
.van-button--plain{
    width: 100%;
}
.van-card{
    background: none;
}
.van-card__title{
    font-size: 16px;
    color: red;
    text-align: center;
}
.van-card__price span{
    color: #226aff;
}
.txts{
    /* text-indent: 2em; */
}
</style>
