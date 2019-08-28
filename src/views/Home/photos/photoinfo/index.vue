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
</div>
</template>
<script>
export default {
  data: () => ({
    id: '',
    imgs: {},
    thums: []
  }),
  created () {
    this.id = this.$route.params.id
    this.getImgs()
    this.getThumImages()
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
    }
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
