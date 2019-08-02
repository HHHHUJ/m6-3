const fs = require('fs');
const fn_test = async (ctx, next) => {
  ctx.response.body = '1111';
};
console.log(__filename)
module.exports = {
  'GET /test': fn_test
};