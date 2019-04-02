const express = require('express');
const globalConfig = require('./config');
const loader = require('./loader');

const app = new express();

// 静态文件位置
app.use(express.static('./page/'));

// 每日一句编辑
app.post('/pushEveryDay', loader.get('/pushEveryDay'));
// 每日一句 获取
app.get('/getEveryDay', loader.get('/getEveryDay'));

// 博客文章添加
app.post('/pushBlogContent', loader.get('/pushBlogContent'));
// 博客文章获取
app.get('/getBlogContent', loader.get('/getBlogContent'));
// 获取文章的总数量
app.get('/getBlogCount', loader.get('/getBlogCount'));

// 博客正文获取
app.get('/getBlog', loader.get('/getBlog'));

// 浏览量 + 1
app.post('/pushViews', loader.get('/pushViews'));

// 发表评论
app.post('/pushComments', loader.get('/pushComments'));

// 获取文章下评论
app.get('/getComments', loader.get('/getComments'));
// 获取关于页面下的评论
app.get('/getCommentsByGy', loader.get('/getCommentsByGy'));

// 获取验证码
app.get('/getCaptcha', loader.get('/getCaptcha'));

// 地图页面下获取所有文章
app.get('/getAllBlog', loader.get('/getAllBlog'));

// 随机云标签
app.get('/getTagAll', loader.get('/getTagAll'));

app.listen(globalConfig.port, () => {
  console.log('服务器启动');
});