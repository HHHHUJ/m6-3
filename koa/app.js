const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const logger = require('koa-logger');
const path = require('path');
const koaNunjucks = require('koa-nunjucks-2');
const app = new Koa();
app.use(koaNunjucks({
  ext:'html',
  path: path.join(__dirname, './views'),
  nunjucksConfig: {
    trimBlocks: true //开启转义
  }
}));
app.use(logger())

app.use(bodyParser());
app.use(controller());

app.listen(3000);
app.on('error', err=>{
  console.error('server error', err);
})
console.log('app started at port 3000......');