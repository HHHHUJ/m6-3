/**
 * 读取模板中间件
 */
const fs = require("fs");
const path = require("path");
function View(path){
    let tpl="";
    return async (ctx,next)=>{
        tpl = fs.readFileSync(path.join(__dirname,path),"utf-8")
        ctx.body= tpl
        await next();
    }
}
module.exports = View;