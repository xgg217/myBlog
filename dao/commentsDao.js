/**
 * 评论
 */
const dbutil = require('./dbutil');

// 发表评论
const pushComments = (obj, suc) => {
  const querySql = "insert into comments (blog_id, parent, parent_name, user_name, comments, email, utime, ctime) values(?, ?, ?, ?, ?, ?, ?, ?);";
  const arr = [obj.id, obj.parent, obj.parentName, obj.userName, obj.comments, obj.email, obj.utime, obj.ctime];
  // console.log(arr)
    console.log('dao')
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

// 获取评论
const getComments = (id, suc) => {
  // select name from student where age = 10;
  const querySql = "select * from comments where blog_id = ? order by id desc;";
  // const arr = [obj.id, obj.parent, obj.userName, obj.comments, obj.email, obj.utime, obj.ctime];
  const arr = [id];
  // console.log(arr)
    console.log('dao')
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
}

// 获取关于页面下的评论
const getCommentsByGy = (id, suc) => {
  const querySql = "select * from comments where blog_id = ? order by id desc;";
  const arr = [id];
  // console.log(arr)
    console.log('dao')
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
}

// 获取最新评论--倒序
const getnewPl = (suc) => {
  const querySql = "select * from comments order by id desc limit 10;";
  const arr = [];
  // console.log(arr)
    console.log('dao')
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
}

module.exports = {
  "pushComments": pushComments,
  "getComments": getComments,
  "getCommentsByGy": getCommentsByGy,
  "getnewPl": getnewPl
};