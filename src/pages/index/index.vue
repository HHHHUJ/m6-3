<template lang='pug'>
  .home
    swiper(:indicator-dots="true" :autoplay="true" :interval="3000" )
      swiper-item(v-for="item in images" :key="item")
        image(:src="item" style="width:100%")
    .wraper
      .goods-wraper
        card(:list="item" v-for="(item, index) in list" :key="index")
</template>

<script>
import card from '@/components/card.vue';
/**
 * 获取商品信息
 */
function findGoods() {
  wx.showLoading();
  this.$db.collection('goods').get({
    success: res=>{
      this.list = res.data;
      return true;
    },
    fail: err=>{
      console.error(err);
    },
    complete: _=>{
      wx.hideLoading();
    }
  })
}

export default {
  data () {
    return {
      images: ['/static/images/banner1.jpg','/static/images/banner2.jpg','/static/images/banner3.jpg'],
      list: []
    };
  },
  mounted() {
    this.findGoods();
  },
  methods: {
    findGoods
  },
    // 下拉刷新
  async onPullDownRefresh() {
      wx.stopPullDownRefresh();
  },
  components: {
    card
  }
};
</script>

<style lang='less' scoped>
  .wraper {
    box-sizing: border-box;
    width:100%;
    padding-left:5px;
    padding-right:5px;
    margin-top:20px;
    .goods-wraper {
      display:flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
</style>