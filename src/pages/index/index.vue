<template lang='pug'>
  .home
    swiper(:indicator-dots="true" :autoplay="true" :interval="3000" )
      swiper-item(v-for="img in images" :key="item")
        image(:src="img" style="width:100%")
    .wraper(v-for="(goods, index) in list" :key="index")
      line(:ctx="goods.type")
      .goods-wraper
        card(:list="good" v-for="(good, idx) in goods.child" :key="idx" @showDetail="showDetail")
</template>

<script>
import card from '@/components/card.vue';
import line from '@/components/line.vue';
/**
 * 获取商品信息
 */
function findGoods() {
  wx.showLoading({
    title:'刷新'
  });
  this.$db.collection('goods').get({
    success: res=>{
      console.log(res.data)
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

function showDetail(val) {
  console.log(val)
  this.$router.push(`/pages/detail/main?list=${JSON.stringify(val)}`)
}

export default {
  data () {
    return {
      images: ['https://picsum.photos/640/400','https://picsum.photos/id/237/640/400','https://picsum.photos/id/200/640/400'],
      list: []
    };
  },
  mounted() {
    this.findGoods();
  },
  methods: {
    findGoods,
    showDetail
  },
    // 下拉刷新
  async onPullDownRefresh() {
    console.log('onPullDownRefresh')
    await this.findGoods();
    wx.stopPullDownRefresh();
  },
  components: {
    card,
    line
  }
};
</script>

<style lang='less' scoped>
  .wraper {
    box-sizing: border-box;
    width:100%;
    padding-left:5px;
    padding-right:5px;
    .goods-wraper {
      display:flex;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: wrap;
      padding:0 8px;
    }
  }
</style>