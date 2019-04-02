const timeFun = (date) => {
  const nian = date.getFullYear(); // 年
  const yue = date.getMonth() + 1; // 月份
  const hao = date.getDate(); // 日
  const shi = date.getHours(); // 时
  const fen = date.getMinutes(); // 分
  const miao = date.getSeconds(); // 秒
  return `${nian}-${yue}-${hao} ${shi}:${fen}:${miao}`;
};

module.exports.timeFun = timeFun;