<template>
  <div class="comment">
    <!-- <van-cell-group>
      <van-cell title="单元格" value="内容" />
      <van-cell title="单元格" value="内容" label="描述信息" />
    </van-cell-group> -->
    <h2>发表评论</h2>
    <hr />
    <textarea v-model="text" class="text" cols="30" rows="10" placeholder="请输入内容"></textarea>
    <van-button type="danger" @click="addComment">发表评论</van-button>
    <div class="comment-list" v-for="(comment,index) in comments" :key="index">
        <div class="comment-list-tele">
            <span>第{{index+1}}楼</span>
            <span>用户:{{comment.user_name}}</span>
            <span>发表时间:{{comment.add_time | datefmt}}</span>
        </div>
        <div class="comment-list-text">
                {{comment.content}}
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    text: ''
  }),
  props: {
    comments: {
      type: Array
    }
  },
  created() {},
  methods: {
    addComment() {
      if (this.text.length === 0) return this.$Toast('请输入内容')
      this.$emit('postcomment', this.text)
      this.text = ''
    }
  }
}
</script>
<style>
.text{
    width: 100%;
    height: 85px;
    font-size: 16px;
    border: none;
}
.van-button--normal{
    width: 100%;
}
.comment-list-tele{
    background: #cccccc;
}
.comment-list-text{
    margin-right: 4px;
    font-size: 12px
}
</style>
