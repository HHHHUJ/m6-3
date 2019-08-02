<template lang="pug">
div
  .user #[p 1]#[p 2]
  button(@click="goto") 评论
  a(href="../logs/main") 日志
</template>

<script>
export default {
  data () {
    return {
      msg: 'hello'
    };
  },
  onLoad() {
    this.getList();
  },
  methods: {
    pull() {
      console.log(123)
    },
    goto() {
      console.log(this.$router.push('/pages/logs/main?name=123'))
    },
    getList() {
      this.$ajaxGet(`hello`, {name:'world'}).then(res=>{
        console.log(res);
      })
    }
  }
};
</script>

<style lang='less' scoped>
  .box {
    width:200px;
    height:100px;
    border:1px solid red;
    font-size:18px;
    .smallbox {
      color:yellow;
      height:500px;
    }
  }
</style>