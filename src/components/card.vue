<template lang="pug">
  .card(@click="previewPic(list.image)")
    image.imgs(:src="list.image")
    p {{list.name}}
    p.price ￥{{list.price}}
</template>

<script>
/**
 * 预览图片
 * @param {String} url 图片路径
 */
function previewPic(url) {
  wx.previewImage({
    current: url, // 当前显示图片的http链接
    urls: [url] // 需要预览的图片http链接列表
  })
}
export default {
  props: ['list'],
  methods: {
    previewPic
  }
}
</script>

<style scoped lang="less">
.card {
  width:49%;
  margin-bottom:15px;
  .imgs {
    border-radius:6px;
    width:100%;
  }
  .price {
    color:red;
  }
}
</style>
