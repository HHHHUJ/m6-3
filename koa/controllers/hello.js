const model = require('../model/good.js');
var fn_hello = async (ctx, next) => {
  let result = await model.find();
  ctx.response.body = result;
  next();
};

module.exports = {
  'GET /list': fn_hello
};