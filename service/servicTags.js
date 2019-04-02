/**
 * 标签
 */
const TagsDao = require('./../dao/TagsDao');

// 添加
const pushTags = (obj, suc) => {
  TagsDao.pushTags(obj, suc);
};

// 查询
const getTags= (tag, suc) => {
  TagsDao.getTags(tag, suc);
};

// 获取全部 标签
const getTagAll = (suc) => {
  TagsDao.getTagAll(suc);
};

module.exports = {
  "pushTags": pushTags,
  "getTags": getTags,
  "getTagAll": getTagAll
};