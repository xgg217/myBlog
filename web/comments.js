const serviceComment = require('./../service/serviceComments');
const returnString = require('./../util/serviceReturn');
const captcha = require('svg-captcha'); // 验证码
const url = require('url');
const path = new Map();

/**
 * 添加/发表评论
 */
const pushComments = (req, res) => {
  req.on('data', (data) => {
    const obj = JSON.parse(data);
    console.log('添加/发表评论 web层');
    console.log(obj);
    serviceComment.pushComments(obj, (data) => {
      res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
      res.write(returnString.serviceReturn('success', 'ok', null));
      res.end();
    });
  });
};
path.set('/pushComments', pushComments);

/**
 * 每个文章下的获取评论
 */
const getComments = (req, res) => {
  const pageObj = url.parse(req.url, true).query;
  console.log('获取评论 web层')
  console.log(pageObj)
  serviceComment.getComments(pageObj.id, (data) => {
    console.log('获取评论 回调 web层')
    console.log(data)
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write(returnString.serviceReturn('success', 'ok', data));
    res.end();
  });
};
path.set('/getComments', getComments);

/**
 * 关于页面下的评论
 */
const getCommentsByGy = (req, res) => {
  const pageObj = url.parse(req.url, true).query;
  console.log('关于页面下的评论 web层')
  console.log(pageObj);
  serviceComment.getCommentsByGy(pageObj.id, (data) => {
    console.log('关于页面下的评论 回调 web层')
    console.log(data)
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write(returnString.serviceReturn('success', 'ok', data));
    res.end();
  });
};
path.set('/getCommentsByGy', getCommentsByGy);

/**
 * 获取验证码
 */
const getCaptcha = (req, res) => {
  const img = captcha.create({fontSize: 50, width: 100, height: 30});
  res.writeHead(200);
  res.write(returnString.serviceReturn('success', '验证码获取成功', img));
  res.end();
};
path.set('/getCaptcha', getCaptcha);

module.exports.path = path;