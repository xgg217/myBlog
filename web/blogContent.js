const studentService = require('./../service/servicBlog');
const returnString = require('./../util/serviceReturn');
const serviceTags = require('./../service/servicTags');
const srviceTagBlogMapping = require('./../service/srviceTagBlogMapping')
const timeFun = require('./../util/timeFun').timeFun;
const url = require('url');
const path = new Map();

/**
 * 添加 博客文章
 * @param {*} req 
 * @param {*} res 
 */
const pushBlogContent = (req, res) => {
  req.on('data', (data) => {
    const obj = JSON.parse(data);
    studentService.pushBlogContent(obj, (re) => {
      res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
      res.write(returnString.serviceReturn('success', '添加成功', null));
      res.end();

      const blogId = re.insertId; // 新添加进去的id
      const tagList = obj.tags.split('/'); // 标签
      console.log(tagList)
      for (const key of tagList) {
        if(key === '') {
          // 内容为空
          continue;
        }
        // 当标签不存在时，添加一个标签
        queryTag(key, blogId);
      }
    });
  });
};
path.set('/pushBlogContent', pushBlogContent);

/**
 * 博客文章获取
 */
const getBlogContent = (req, res) => {
  const pageObj = url.parse(req.url, true).query;
  console.log('博客文章获取 web层')
  // console.log(pageObj)
  studentService.getBlogContent(parseInt(pageObj.page), parseInt(pageObj.size), (data) => {
    // 过滤图片
    console.log('过滤图片 web层')
    for (const key of data) {
      // console.log(key.content)
      key.content = key.content.replace(/<img.*?(?:>|\/>)/gi, ''); // 过滤图片
      key.content = key.content.substring(0, 300); // 最多显示300个字符
    }
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write(returnString.serviceReturn('success', 'ok', data));
    res.end();
  });
};
path.set('/getBlogContent', getBlogContent);

/**
 * 
 * 获取文章的总数量
 */
const getBlogCount = (req, res) => {
  studentService.getBlogCount((data) => {
    // console.log(data)
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write(returnString.serviceReturn('success', 'ok', data));
    res.end();
  });
};
path.set('/getBlogCount', getBlogCount);

/**
 * 标签分类 查找
 * 当不存在时，就添加一个标签
 */
const queryTag = (tag, blogId) => {
  serviceTags.getTags(tag, (data) => {
    if((data === null) || data.length === 0) {
      // 当标签不存在时,添加一个
      insertTag(tag, blogId);
    } else {
      const time = timeFun(new Date());
      const obj = {tagId:data[0].id, blogId, ctime:time, utime:time};
      srviceTagBlogMapping.insertTagBlogmapping(obj, (data)=>{

      })
    }
    // res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    // res.write(returnString.serviceReturn('success', '标签添加成功', null));
    // res.end();
  })
};

/**
 * 添加标签
 * @param {*} tag 
 * @param {*} blogId 
 */
const insertTag = (tag, blogId) => {
  const time = timeFun(new Date());
  const obj = {tag, ctime:time, utime:time};
  serviceTags.pushTags(obj, (data)=>{
    // 添加映射
    insertTagBlogmapping(data.insertId, blogId);
  })
};
// path.set('/pushTags', pushTags);

/**
 * 标签 与 博客 映射
 */
const insertTagBlogmapping = (tagId, blogId) => {
  const time = timeFun(new Date());
  const obj = {tagId, blogId, ctime:time, utime:time}
  srviceTagBlogMapping.insertTagBlogmapping(obj, (data)=>{});
};

/**
 * 博客正文获取
 */
const getBlog = (req, res) => {
  const pageObj = url.parse(req.url, true).query;
  console.log('博客文章获取 web层')
  console.log(pageObj)
  studentService.getBlog(pageObj.blogId, (data) => {
    // console.log(data)
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write(returnString.serviceReturn('success', 'ok', data));
    res.end();
  });
};
path.set('/getBlog', getBlog);

/**
 * 浏览量增加
 */
const pushViews = (req, res) => {
  req.on('data', (data) => {
    const {data:views, id} = JSON.parse(data);
    // console.log(views)
    // console.log(id)
    // console.log('111111')
    // console.log(data);
    // console.log('2222')
    studentService.pushViews(views, id, (re) => {
      res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
      res.write(returnString.serviceReturn('success', 'ok。浏览量 + 1。', null));
      res.end();
    });
  });
};
path.set('/pushViews', pushViews);

// 获取所有的博客文章
const getAllBlog = (req, res) => {
  console.log('获取所有的博客文章 web层')
  studentService.getAllBlog((data) => {
    // console.log(data)
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write(returnString.serviceReturn('success', '获取所有的博客文章', data));
    res.end();
  });
};
path.set('/getAllBlog', getAllBlog);

module.exports.path = path;