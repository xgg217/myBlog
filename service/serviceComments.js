/**
 * 评论
 */
const commentDao = require('./../dao/commentsDao');

// 添加评论
const pushComments = (obj, suc) => {
  commentDao.pushComments(obj, suc);
};

// 获取评论
const getComments = (id, suc) => {
  commentDao.getComments(id, suc);
};

// 关于页面下的评论
const getCommentsByGy = (id, suc) => {
  commentDao.getCommentsByGy(id, suc);
};

module.exports = {
  "pushComments": pushComments,
  "getComments": getComments,
  "getCommentsByGy": getCommentsByGy
};