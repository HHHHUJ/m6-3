<template>
  <div class="lineWrap">
    {{ctx}}
  </div>
</template>
 
<script>
export default {
  props:{
    ctx: {
      type: String,
      default:'热卖'
    }
  }
}
</script>
 
<style lang="less" scoped>
.lineWrap {
  padding:15px 0;
  text-align: center;
  position: relative;
  font-size:20px;
  color:#2A2C2B;
  &::before {
    content:'';
    height:2px;
    width:30%;
    position:absolute;
    background-image: linear-gradient(to top, #929292 0%, #686868 100%);
    top:52%;
    left:5%;
  }
  &::after {
    content:'';
    height:2px;
    width:30%;
    position:absolute;
    background-image: linear-gradient(to top, #686868 0%, #929292 100%);
    top:52%;
    right:5%;
  }
}
</style>