const fn_file = async (ctx, next) => {
  var username = ctx.request.body.username;
  var password = ctx.request.body.password;
  ctx.response.body = `你的姓名是：${username}/n密码是：${password}`
  next();
}
module.exports = {
  'POST /file': fn_file
};