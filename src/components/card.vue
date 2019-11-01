<template lang="pug">
  .card(@click="checkDetail(list.image)")
    image.imgs(:src="list.image[0]" mode="scaleToFill" :lazy-load="true")
    p.name.toe-1 {{list.name}}
    p.fc6 颜色：{{list.color}}
    .tagWrap.fcf {{list.size}}
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
  });
}

export default {
  props: ["list"],
  methods: {
    previewPic //scaleToFill aspectFit aspectFill
  },
  created() {

  },
  methods: {
    checkDetail() {
      this.$emit('showDetail', this.list);
    }
  },
  computed: {
    price() {
      return parseInt(this.list.price).toFixed(2)
    }
  },
  components: {
    
  }
};
</script>

<style scoped lang="less">
.card {
  width: 49%;
  margin-bottom: 15px;
  letter-spacing: 0px;
  position: relative;
  .imgs {
    width: 100%;
    height: 220px;
    border-radius: 4px;
  }
  .name {
    font-family: "PlayfairDisplay-Regular";
    color: #424548;
    font-size: 18px;
  }
}
 .tagWrap {
   padding:0 10px;
   height:20px;
   line-height: 20px;
   background-color:rgba(0,0,0,.65);
   border-radius:3px;
   position:absolute;
   top:3px;
   right:3px;
   font-size:14px;
 }
</style>
