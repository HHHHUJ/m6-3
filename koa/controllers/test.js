const fs = require('fs');
const fn_test = async (ctx, next) => {
  ctx.render('index',{msg:'hello world'});
};
module.exports = {
  'GET /test': fn_test
};