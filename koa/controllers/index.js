var fn_index = async (ctx, next) => {
  ctx.response.type = 'text/html;charset=utf-8';
  ctx.response.body =
  `
    <h1>提交表单123</h1>
    <form action="/file" method="post">
      <input type="hidden" name="username" value="hujie">
      <input type="hidden" name="password" value="123456">
      <input type="submit" value="提交" />
    </form>`

  next();
};

module.exports = {
  'GET /': fn_index
};