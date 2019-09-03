<template>
<div class="photoinfo">
    <van-card :title="imgs.title">
        <div slot="price">
          <span>发表时间:{{imgs.add_time}}</span>
        </div>
        <div slot="num">
          <span>点击{{imgs.click}}次</span>
        </div>
      </van-card>
      <hr/>
      <div class="imgs-box">
          <div>
              <img :src="thum" alt="" v-for="(thum,index) in thums" :key="thum" @click="showImg(index)">
          </div>
          <p class="desc">{{imgs.content}}</p>
      </div>
      <!-- 评论 -->
      <comment :comments="comments" @postcomment="postcomment"></comment>
      <!-- 加载更多 -->
      <van-button plain type="danger" @click="getMore">{{hasFlag?'没有更多数据':'加载更多'}}</van-button>
</div>
</template>
<script>
import comment from '@/components/comment'
export default {
  data: () => ({
    id: '',
    imgs: {},
    thums: [],
    comments: [],
    hasFlag: false,
    pageindex: 0, // 页数
    limit: 6 // 每页多少条
  }),
  created () {
    this.id = this.$route.params.id
    this.getImgs()
    this.getThumImages()
    this.getComments()
  },
  methods: {

    async getImgs() {
      const {
        data: { message, status }
      } = await this.$http.get(`api/getimageInfo/${this.id}`)
      if (status !== 0) return this.$Toast('获取信息失败')

      this.imgs = message
    },
    async getThumImages() {
      const {
        data: { message, status }
      } = await this.$http.get(`api/getthumimages/${this.id}`)
      if (status !== 0) return this.$Toast('获取图片失败')

      //   this.imgs = message
      // 把对象中的图片  存到一个新的数组
      let arr = []

      message.forEach(item => {
        if (item.src) {
          arr.push(item.src)
        }
      })
      console.log(arr)
      this.thums = arr
    },
    showImg(startPosition) {
      this.$ImagePreview({
        images: this.thums,
        startPosition
      })
    },
    async getComments() {
      if (this.hasFlag !== false) return
      this.pageindex++
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
      this.getComments()
    },
    async postcomment(data) {
      const { data: { message, status } } = await this.$http.post(`api/postcomment/${this.id}`, { content: data })
      if (status !== 0) return this.$Toast('发表评论失败')
      console.log(message)
      this.comments.unshift({
        user_name: '匿名用户',
        content: data,
        add_time: Date.now()
      })
    }
  },
  components: {
    comment
  }
}
</script>
<style lang="less" scope>
.imgs-box{
    div{
        display: flex;
        align-items: center;
        justify-content: space-around;
        img{
        // width: 30%;
        // height: 30%;
        width: 100px;
        height: 100px;
    }
    }
}
</style>
