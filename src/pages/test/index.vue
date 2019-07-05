<template lang='pug'>

</template>

<script>
export default {
  data () {
    return {

    };
  },
  mounted() {
    const db = mpvue.cloud.database({env: 'hujie-b7d5f7'})
    this.db.collection('books').get()
    .then(res=>{
      console.log(res.data)
    })
    .catch(console.error)
  }
};
</script>

<style lang='less' scoped>

</style>