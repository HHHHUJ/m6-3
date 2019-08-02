<template lang="pug">
div
  a(href="/pages/counter/main") 去往Vuex示例页面
  a(href="/pages/test/main") 前往test页面
  input(v-model="name" placeholder="请输入商品名称")
  input(v-model="size" placeholder="请输入商品型号")
  button(@click="addData") 插入数据
  div(v-for="(item,index) in list" :key="index")
    span 名称：{{item.name}}
    span 尺寸：{{item.size}}
    span(@click="delData(item._id)") 删除
  button(@click="uploadPic") 上传图片
  img(v-for="(item, index) in images" :src="item" :key="index" @click="previewImage")
  Button(@click="delData") 删除数据
  Button(@click="modifyData") 修改数据
  Button(@click="findData") 查找数据
  Button(@click="pulldown") 下拉刷新
  <button  open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">获取用户信息</button>
  div(style="width:132px;height:132px;")
    <open-data type="userAvatarUrl" class="avatar"></open-data>
  <button open-type="openSetting">打开授权设置页</button>
</template>

<script>
import card from '@/components/card'
/**
 * 获取所有数据
 */
function findAllData () {
  this.$db.collection('goods').get()
  .then(res=>{
    this.list = res.data;
  })
}
/**
 * 查找数据
 */
function findData() {
  this.$db.collection('goods').where({name:'童装'}).get()
  .then(res=>{
    console.log(res);
  })
  .catch(err=>{
    console.error(err);
  })
}
/**
 * 增加数据
 */
function addData () {
  if (!this.name&&!this.size) {
    return void 0;
  }
  this.$db.collection('goods').add({
    data: {
      name: this.name,
      size: this.size
    }
  })
  .then(res=>{
    mpvue.showToast({
      title: '插入商品成功',
      duration: 2000
    })
    this.findAllData();
    this.name = '';
    this.size = '';
    console.log(res);
  })
}
/**
 * 删除数据
 * @param {String} id 物品相关索引
 */
function delData (id) {
  this.$db.collection('goods').doc(id).remove()
  .then(res=>{
    console.log(res);
    mpvue.showToast({
      title: '删除成功',
      duration: 2000
    })
    this.findAllData();
  })
}
/**
 * 上传图片
 *
 */
function uploadPic () {
  wx.chooseImage({
    count:4,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: res => {
      console.log(res);
      this.images = res.tempFilePaths;
      // wx.cloud.uploadFile({
      //   cloudPath: 'images/panda.jpg',
      //   filePath: res.tempFilePaths[0],
      //   success: res => {
      //     console.log('上传成功', res);
      //   }
      // })
    }
  })
}
/**
 * 预览图片
 */
function previewImage() {
  let imagesList = this.images;
  mpvue.previewImage({
    current: this.images[0],
    urls: this.images
  });
}
export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      list:[],
      name: '',
      size: '',
      images: []
    }
  },

  components: {
    card
  },

  methods: {
    findAllData,
    findData,
    addData,
    delData,
    uploadPic,
    previewImage,
    bindViewTap () {
      // const url = '../logs/main'
      // if (mpvuePlatform === 'wx') {
      //   mpvue.switchTab({ url })
      // } else {
      //   mpvue.navigateTo({ url })
      // }
      mpvue.navigateTo({
        url: '../logs/main'
       })
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    },

    pulldown() {
      wx.startPullDownRefresh();
    },
    bindGetUserInfo(e){
      console.log(e.target.userInfo);
    },
  },
  onLoad() {
  },
  created () {
    // let app = getApp()
    this.findAllData();
    // mpvue.cloud.callFunction({
    //   name: 'getOpenId'
    // })
    // .then(res=>{
    //   console.log(res);
    // })
  }
}
</script>

<style scoped lang="less">
  .avatar {
    width:132px;
    height:132px;
  }
</style>
