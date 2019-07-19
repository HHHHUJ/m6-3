const cloud = require('wx-server-sdk');

exports.main = async (event, context)=>{
  const {OPENID, APPID, UNIONID} = cloud.getWXContext();
  return {
    event,
    OPENID,
    APPID,
    UNIONID
  }
}