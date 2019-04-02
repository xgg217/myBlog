const dbutil = require('./dbutil');

// 文章添加
const pushBlogContent = (obj, suc) => {
  const querySql = "insert into blog (title, content, views, tags, ctime, utime) values(?, ?, ?, ?, ?, ?);";
  const arr = [obj.title, obj.content, obj.views, obj.tags, obj.ctime, obj.utime];
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

// 当前页所有文章获取
const getBlogContent = (page, size, suc) => {
  const querySql = "select * from blog order by id desc limit ?, ?;";
  const arr = [(page - 1) * size, size];
  console.log('dao')
  console.log(page + 'page, size' + page)
  console.log(arr);

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

// 文章总数量
const getBlogCount = (suc) => {
  const querySql = "select count(1) as count from blog;";

  const connection = dbutil.createConnection();
  connection.connect();

    // 查询
  connection.query(querySql, (err, res) => {
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

// 获取指定文章
const getBlog = (id, suc) => {
  const querySql = "select * from blog where id = ?;";
  const arr = [id];
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

// 浏览量增加
const pushViews = (data, id, suc) => {
  const querySql = "update blog set views = ? where id = ?";
  // update student set age = 10, class = "幼儿园" where name = "小刚刚";
  const arr = [data, id];
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

// 所有文章获取
const getAllBlog = (suc) => {
  const querySql = "select id, title from blog order by id desc;";
  const arr = [];
  console.log('获取所有的博客文章 dao层')
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
  "pushBlogContent": pushBlogContent,
  "getBlogContent": getBlogContent,
  "getBlogCount": getBlogCount,
  "getBlog": getBlog,
  "pushViews": pushViews,
  "getAllBlog": getAllBlog
};