/**
 * 每日一句编辑
 */

const studentDao = require('./../dao/EveryDayDao');

// 添加每日一句
const pushEveryDay = (content, ctime, suc) => {
  studentDao.pushEveryDay(content, ctime, suc);
};

// 查找每日一句
const getEveryDay = ( suc) => {
  studentDao.getEveryDay(suc);
};

module.exports = {
  "pushEveryDay": pushEveryDay,
  "getEveryDay": getEveryDay
};