/**
 * 
 */
const dbutil = require('./dbutil');

/**
 * 将每日一句的内容插入到数据库
 * @param {*} content 内容
 * @param {*} ctime 时间
 * @param {*} suc 回调函数
 */
const pushEveryDay = (content, time, suc) => {
  const querySql = "insert into every_day (content, ctime) values(?, ?);";
  const arr = [content, time];
  console.log(arr)

  const connection = dbutil.createConnection();
  connection.connect();

    // 查询
  connection.query(querySql, arr, (err, res) => {
    console.log(err)
    if(!err) {
      suc(res);
    } else {
      throw new Error('查询异常' + err);
    }
  });
  // 关闭数据库
  connection.end();
};

/***
 * 从数据库中获取每日一句
 */
const getEveryDay = (suc) => {
  // 取最后一个
  const querySql = "select * from every_day order by id desc limit 1;";
  const connection = dbutil.createConnection();
  connection.connect();

    // 查询
  connection.query(querySql, (err, res) => {
    // console.log(err)
    if(!err) {
      suc(res);
    } else {
      throw new Error('查询异常' + err);
    }
  });
  // 关闭数据库
  connection.end();
};

module.exports = {
  "pushEveryDay": pushEveryDay,
  "getEveryDay" : getEveryDay
};