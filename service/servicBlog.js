/**
 * 博客文章
 */

const studentDao = require('./../dao/blogDao');

// 添加 博客文章
const pushBlogContent = (obj, suc) => {
  console.log('service层')
  studentDao.pushBlogContent(obj, suc);
};

// 获取 博客文章
const getBlogContent = (page, size, suc) => {
  console.log('service层 获取 博客文章')
  studentDao.getBlogContent(page, size, suc);
};

// 获取文章总数量
const getBlogCount = (suc) =>{
  studentDao.getBlogCount(suc);
};

// 获取博客正文
const getBlog = (id, suc) => {
  studentDao.getBlog(id, suc)
};

// 浏览量增加
const pushViews = (data, id, suc) => {
  studentDao.pushViews(data, id, suc);
};

// 博客所有文章获取
const getAllBlog = (suc) => {
  console.log('获取所有的博客文章 s层')
  studentDao.getAllBlog(suc);
}

module.exports = {
  "pushBlogContent": pushBlogContent,
  "getBlogContent": getBlogContent,
  "getBlogCount": getBlogCount,
  "getBlog": getBlog,
  "pushViews": pushViews,
  "getAllBlog": getAllBlog
};