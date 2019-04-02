/**
 * 标签 与 博客 映射
 */
const studentDao = require('./../dao/TagBlogMappingDao');

const insertTagBlogmapping = (obj, suc) => {
  studentDao.insertTagBlogmapping(obj, suc);
};

module.exports = {
  "insertTagBlogmapping": insertTagBlogmapping
};