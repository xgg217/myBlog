/**
 * 标签 与 博客 映射
 */
const dbutil = require('./dbutil');

// 文章添加
const insertTagBlogmapping = (obj, suc) => {
  const querySql = "insert into tab_blog_mapping (tag_id, blog_id, ctime, utime) values(?, ?, ?, ?);";
  const arr = [obj.tagId, obj.blogId, obj.ctime, obj.utime];
  console.log(obj)
    console.log('dao 文章添加')
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

module.exports = {
  "insertTagBlogmapping": insertTagBlogmapping
};