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

// 最新评论
const getnewPl = (suc) => {
  commentDao.getnewPl(suc);
};

module.exports = {
  "pushComments": pushComments,
  "getComments": getComments,
  "getCommentsByGy": getCommentsByGy,
  "getnewPl": getnewPl
};