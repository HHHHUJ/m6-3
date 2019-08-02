const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const logger = require('koa-logger');
const app = new Koa();
app.use(logger())

app.use(bodyParser());
app.use(controller());

app.listen(3000);
app.on('error', err=>{
  console.error('server error', err);
})
console.log('app started at port 3000......');