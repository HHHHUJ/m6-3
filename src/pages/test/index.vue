<template lang='pug'>
  div
    button 上传图片
</template>

<script>
export default {
  data () {
    return {

    };
  },
  mounted() {
    // const db = mpvue.cloud.database()
    this.$db.collection('goods').where({name:'童装'}).get()
    .then(res=>{
      console.log(res.data)
    })
    .catch(console.error)
  }
};
</script>

<style lang='less' scoped>
  .test {
    color:#333333;
  }
</style>