<template lang='pug'>
  div.pb46
    form 
      input(name="input" type="text" confirm-type="done" placeholder="请输入商品类别" v-model="type")
      button.mb40.mt5(type="warn" @click="addType") 新增类别
      input(name="input" type="text" confirm-type="done" placeholder="请输入名称" v-model="formList.name")
      input(name="input" type="text" confirm-type="done" placeholder="请输入型号" v-model="formList.size")
      input(name="input" type="text" confirm-type="done" placeholder="请输入颜色" v-model="formList.color")
      picker(@change="bindPickerChange" :value="index" :range="typeOptions" :range-key="'type'" mode="selector")
        input(type="text" placeholder="请选择类别" disabled v-model="formList.type")
    .flex.fixed
      .btn.warn(@click="uploadPic") 上传图片
      .btn.primary(@click="formSubmit") 提交
      .btn.info(@click="formReset") 重置
    .mt10.mb10
      image.imgs(v-for="(item, index) in imagesList" mode="aspectFit" :key="index" :src="item" @click="previewPic(item)")
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
  });
}
/**
 * 提交表单
 */
function formSubmit() {
  if (
    !this.formList.name &&
    !this.formList.size &&
    !this.formList.images.length &&
    !this.formList.type &&
    !this.formList.color
  ) {
    wx.showToast({
      title: "必填项不能为空",
      icon: "none"
    });
    return void 0;
  }
  wx.showLoading({
    title: "上传中"
  });
  const db = this.$db;
  const _ = db.command;
  const goods = db.collection("goods");
  goods
    .aggregate()
    .project({ type: 1 })
    .end()
    .then(res => {
      if (res.list.length) {
        let _id = res.list.find(item => item.type === this.formList.type)
        if (!_id) {
          this.add(goods);
        } else {
          this.update(goods, _id._id, _);
        }
      } else {
        this.add(goods);
      }
    });

  wx.hideLoading();
}

/**
 * 重置表单
 */
function formReset() {
  this.imagesList = [];
  this.formList.size = "";
  this.formList.name = "";
  this.formList.type = "";
  this.formList.color = "";
  this.formList.images = [];
}

/**
 * 上传图片
 */
function uploadPic() {
  wx.chooseImage({
    count: 9,
    sizeType: ["compressed"], // 源图片、压缩图片
    sourceType: ["album", "camera"], // 图片的来源相册或相机
    success: res => {
      wx.showLoading({
        title: "上传中"
      });
      const filePath = res.tempFilePaths;
      this.imagesList = res.tempFilePaths;
      let cloudPath = [];
      console.log(res.tempFilePaths);
      filePath.forEach((item, index) => {
        cloudPath.push(
          Math.random()
            .toString(36)
            .substring(2) +
            index +
            filePath[index].match(/\.[^.]+?$/)[0]
        );
      });
      filePath.forEach((item, i) => {
        wx.cloud.uploadFile({
          cloudPath: cloudPath[i],
          filePath: filePath[i],
          success: res => {
            console.log("上传成功", res);
            this.formList.images.push(res.fileID);
          },
          fail: e => {
            console.error(e);
          }
        });
      });
      wx.hideLoading();
    }
  });
}

function addType() {
  wx.showLoading({
    title: "上传中"
  });
  this.$db
    .collection("types")
    .add({
      data: {
        type: this.type
      }
    })
    .then(res => {
      wx.showToast({
        title: "新增成功"
      });
      this.getType();
      this.type = "";
    })
    .catch(err => {
      console.error(err);
      wx.hideLoading();
    });
  wx.hideLoading();
}
function createUniqueId(n) {
  var random = function() {
    // 生成10-12位不等的字符串
    return Number(
      Math.random()
        .toString()
        .substr(2)
    ).toString(36); // 转换成十六进制
  };
  var arr = [];
  function createId() {
    var num = random();
    var _bool = false;
    arr.forEach(v => {
      if (v === num) _bool = true;
    });
    if (_bool) {
      createId();
    } else {
      arr.push(num);
    }
  }
  var i = 0;
  while (i < n) {
    createId();
    i++;
  }
  return arr;
}
/**
 * 获取类别
 */

function getType() {
  wx.showLoading();
  this.$db
    .collection("types")
    .aggregate()
    .project({
      type: 1,
      _id: 0
    })
    .end()
    .then(res => {
      console.log(res);
      this.typeOptions = res.list;
      wx.hideLoading();
    });
}

function add(collection) {
  collection
    .add({
      data: {
        type: this.formList.type,
        child: [
          {
            name: this.formList.name,
            size: this.formList.size.toUpperCase(),
            color: this.formList.color,
            image: this.formList.images
          }
        ]
      }
    })
    .then(res => {
      this.formReset();
      console.log(res + "新增成功");
    });
}
function update(collection, id, command) {
  collection.doc(id).update({
    data: {
      child: command.push({
        name: this.formList.name,
        size: this.formList.size.toUpperCase(),
        color: this.formList.color,
        image: this.formList.images
      })
    }
  })
  .then(res=>{
    this.formReset();
    console.log(res+'update')
  })
}
export default {
  data() {
    return {
      imagesList: [],
      formList: {
        name: "",
        size: "",
        type: "",
        color:"",
        images: []
      },
      typeOptions: [],
      selectValue: null
    };
  },
  methods: {
    formSubmit,
    formReset,
    uploadPic,
    previewPic,
    addType,
    createUniqueId,
    getType,
    add,
    update,
    bindPickerChange(e) {
      this.selectValue = e.mp.detail.value;
      this.formList.type = this.typeOptions[this.selectValue].type;
    }
  },
  onLoad() {
    // Object.assign(this.$data, this.$options.data());
    this.getType();
  },
  mounted() {
    this.getType();
  }
};
</script>

<style lang='less' scoped>
input {
  height: 50px;
  border-bottom: 1px solid #999999;
  padding: 0 5px;
}
.btn {
  height: 46px;
  text-align: center;
  line-height: 46px;
  flex: 1 1 auto;
}
.fixed {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
.imgs {
  width: 100%;
}
</style>