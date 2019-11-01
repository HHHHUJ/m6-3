<template lang="pug">
.detailWrap
  swiper(:indicator-dots="true" :autoplay="true" :interval="3000" style="height:270px;")
      swiper-item(v-for="img in list.image" :key="item")
        image.noExpandImgs(:src="img" style="width:100%" mode="aspectFit" @click="previewPic(img)")
  .operateBox
    .colorSelect.child colorSelect
    .photoExpand.child(@click="handleExpand")
      image.icon(src="cloud://hujie-b7d5f7.6875-hujie-b7d5f7-1258016123/images/expand.png")
      span Expand photo
</template>
 
<script>
function previewPic(url) {
  wx.previewImage({
    current: url, // 当前显示图片的http链接
    urls: [url] // 需要预览的图片http链接列表
  });
}
export default {
  data() {
    return {
      list: {},
      isExpand:false
    };
  },
  onLoad() {
    this.list = JSON.parse(this.$route.query.list);
    console.log(this.list.image)
  },
  methods: {
    handleExpand() {
      this.isExpand = !this.isExpand;
    },
    previewPic
  },
  onUnload() {
    Object.assign(this.$data, this.$options.data())
  }
};
</script>
 
<style lang="less" scoped>
.detailWrap {
  .noExpandImgs {
    width: 100%;
    // height: 300px;
    display:block;
  }
  .operateBox {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #dcdee0;
    border-top: 1px solid #dcdee0;
    overflow: hidden;
    .child {
      width: 50%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #424548;
      font-size: 18px;
      &:nth-child(1) {
        border-right: 1px solid #dcdee0;
      }
    }
    .photoExpand {
      display:flex;
      justify-content: space-around;
      align-items:center;
      .icon {
        width:20px;
        height:20px;
      }
    }
  }
}
</style>