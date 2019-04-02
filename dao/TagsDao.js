/**
 * 标签分类
 */
const dbutil = require('./dbutil');

// 添加
const pushTags = (obj, suc) => {
  const querySql = "insert into tags (tag, ctime, utime) values(?, ?, ?);"
  const arr = [obj.tag, obj.ctime, obj.utime];
  console.log(obj)
    console.log('dao层 标签添加')
    console.log(arr)


  const connection = dbutil.createConnection();
  connection.connect();

    // 查询
  connection.query(querySql, arr, (err, res) => {
    // console.log(err);
    if(!err) {
      suc(res);
    } else {
      throw new Error('查询异常' + err);
    }
  });
  // 关闭数据库
  connection.end();
};

// 查询 指定 标签
const getTags = (tag, suc) => {
  const querySql = "select * from tags where tag = ?;"
  const arr = [tag];
  // console.log(arr)
    // console.log('dao层 标签添加')
    // console.log(arr)
  const connection = dbutil.createConnection();
  connection.connect();

    // 查询
  connection.query(querySql, arr, (err, res) => {
    // console.log(err);
    if(!err) {
      suc(res);
    } else {
      throw new Error('查询异常' + err);
    }
  });
  // 关闭数据库
  connection.end();
};

// 查询所有标签
const getTagAll = (suc) => {
  const querySql = "select * from tags;"
  const arr = [];
    console.log('dao层 查询所有标签')
    // console.log(arr)
  const connection = dbutil.createConnection();
  connection.connect();

    // 查询
  connection.query(querySql, arr, (err, res) => {
    // console.log(err);
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
  "pushTags": pushTags,
  "getTags": getTags,
  "getTagAll":getTagAll
};