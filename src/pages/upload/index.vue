<template lang='pug'>
  div
    form(@submit="formSubmit" @reset="formReset")
      label 名称：
      input(name="input" placeholder="请输入名称" v-model="formList.name")
      label 价格：
      input(name="input" placeholder="请输入价格" v-model="formList.price")
      button(@click="uploadPic") 上传图片
      image(v-for="(item, index) in imagesList" :key="index" :src="item" @click="previewPic(item)")
      button(form-type="submit") 提交
      button(form-type="reset") 重置
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
/**
 * 提交表单
 */
function formSubmit() {
  if(!this.formList.name&&!this.formList.price&&!this.formList.images.length) {
    wx.showToast({
      title: '必填项不能为空',
      icon: 'none'
    })
    return void 0;
  }
  wx.showLoading({
    title: '上传中'
  })
  this.$db.collection('goods').add({
    data: {
      name: this.formList.name,
      price: this.formList.price,
      image: this.formList.images[0]
    }
  })
  .then(res=>{
    wx.showToast({
      title: '上传成功'
    });
    this.formReset();
  })
  .catch(err=>{
    console.error(err);
    wx.hideLoading();
  })
  wx.hideLoading();
}

/**
 * 重置表单
 */
function formReset() {
  this.imagesList = []
}

/**
 * 上传图片
 */
function uploadPic() {
  wx.chooseImage({
    count:1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: res => {
      wx.showLoading({
        title: '上传中'
      })
      const filePath = res.tempFilePaths;
      this.imagesList = res.tempFilePaths;
      let cloudPath = [];
      filePath.forEach((item, index)=>{
        cloudPath.push(Math.random().toString(36).substring(2)+index+filePath[index].match(/\.[^.]+?$/)[0])
      })
      filePath.forEach((item,i)=>{
        wx.cloud.uploadFile({
          cloudPath: cloudPath[i],
          filePath: filePath[i],
          success: res=>{
            console.log('上传成功', res);
            this.formList.images.push(res.fileID);
          },
          fail: e=>{
            console.error(e);
          }
        })
      })
      wx.hideLoading();
    }
  })
}
export default {
  data () {
    return {
      imagesList: [],
      formList: {
        name: '',
        price: '',
        images: []
      }
    };
  },
  methods: {
    formSubmit,
    formReset,
    uploadPic,
    previewPic
  }
};
</script>

<style lang='less' scoped>

</style>