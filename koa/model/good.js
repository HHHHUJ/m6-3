const mongoose = require('../db.js');
let Schema = mongoose.Schema;

let goodsSchema = new Schema({
  name: String,
  size: String,
  color: String,
  price: Number
})
var goods_collection = mongoose.model('good', goodsSchema); //collection模型
var goods_document = new goods_collection();  //document文档

module.exports = goods_collection;