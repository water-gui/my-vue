<template>
  <div class="photos">
    <van-tabs @change="getImgs" animated>
      <van-tab v-for="cate in photoslist" :title="cate.title" :key="cate.id">
          <div v-if="imgs.length !==0">
              <router-link v-for="img in imgs" :key="img.id" :to="'/home/photos/'+img.id">
                  <!-- <img :src="img.img_url" alt="" > -->
                  <img v-lazy="img.img_url" alt="" >
              </router-link>
          </div>
          <div v-else><p class="none">亲,没有了哦!</p></div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data: () => ({
    photoslist: [],
    imgs: []
  }),
  created() {
    this.getPhotoList()
    this.getImgs(0)
  },
  methods: {
    async getPhotoList() {
      const {
        data: { message, status }
      } = await this.$http.get('api/getimgcategory')
      if (status !== 0) return this.$Toast('获取分类信息失败')
      message.unshift({ id: 0, title: '全部' })
      this.photoslist = message
      console.log(message)
    },
    async getImgs(index) {
      const {
        data: { message, status }
      } = await this.$http.get(`api/getimages/${index}`)
      if (status !== 0) return this.$Toast('获取图片失败')
      this.imgs = message
      console.log(message)
    }
  }
}
</script>

<style>
.van-tab__pane img{
width: 100%;
height: 100%;
}
.none{
    text-align: center;
    letter-spacing: 10px;
    color: brown;
}
</style>
