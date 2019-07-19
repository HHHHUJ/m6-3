<template lang="pug">
.box 123
  .smallbox 456

</template>

<script>
export default {
  data () {
    return {
      msg: 'hello'
    };
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
    }
  }
</style>