document.addEventListener('DOMContentLoaded',function(){
  init();
});

const init = function() {
  // 执行
  everyDayData(); // 每日一句

  blogContent(); // 博客文章

  // 随机云标签
  initYbq();
};

/**
 * 每日一句获取
 */
const everyDayData = (function() {
  const everyDay = document.querySelector('.warapp .box .js_every');
  const init = function() {
    // 页面初始化时 获取数据
    getAjax();
  };
  const getAjax = (page, size) => {
    axios.get('/getEveryDay')
      .then(function (data) {
          // alert('添加成功');
          render(data.data.data[0].content);
      })
      .catch(function (error) {
          console.log(error);
      });
  };

  // 渲染函数
  const render = function(data) {
    // console.log(data)
    everyDay.textContent = data;
  };

  return () => {
    init();
  }
}());

/**
 * 文章
 */
const blogContent = (function(){
  const oUl = document.querySelector('.warapp .con ul');

  const page = {
    newPage : 1, // 当前页，传到数据库中需要 - 1
    pageSize: 8, // 一页5条
    pageCount: 0 // 文章总数量
  };

  // 缓存数据
  const cache = {};

  const init = function() {
    // 页面初始化时 获取数据--文章
    getAjax(page.newPage, page.pageSize);

    // 文章总数量
    getAjaxBlogCount();
    
  };

  const getAjax = (page, size) => {
    axios.get('/getBlogContent',{
      params: {
        page,
        size
      }
    })
      .then(function (data) {
          // alert('添加成功');
          // render(data.data.data[0].content);
          console.log(data)
          const pageData = data.data.data;
          render(pageData);
      })
      .catch(function (error) {
          console.log(error);
      });
  };

  // 文章总数量
  const getAjaxBlogCount = () => {
    axios.get('/getBlogCount')
      .then(function (data) {
          // alert('添加成功');
          // render(data.data.data[0].content);
          console.log(data)
          page.pageCount = data.data.data[0].count; // 总页数

          // 翻页
          fyFun(page.pageCount, page.pageSize);

      })
      .catch(function (error) {
          console.log(error);
      });
  };

  // 渲染函数
  const render = function(data) {
    // console.log(data)
    // everyDay.textContent = data;
    blogData(data);
  };

  // 标签
  const tagsA = (str) => {
    const arr = str.split('/');
    let text = '';
    for(const key of arr) {
      text += `
      <a href="javascript:;">${key}</a>
      `
    }
    return text;
  };

  // 翻页
  const fyFun = (count, size) => {
    const pageSize = Math.ceil(count / size); // 总页数
    $('.pagination').pagination({
      pageCount: pageSize,
      totalData: count,
      jump: true,
      coping: true,
      homePage: '首页',
      endPage: '末页',
      prevContent: '上页',
      nextContent: '下页',
      callback: function (api) {
          // console.log(api.getCurrent())
          // console.log(api.getCurrent() + '也')
          page.newPage = api.getCurrent(); // 当前页
          getAjax(page.newPage, page.pageSize);
      }
    });
  }
  

  // 渲染函数--博客文章
  const blogData = (data) => {
    oUl.innerHTML = '';
    let str = '';
    for(const key of data) {
      str += `
        <li>
          <div class="con_warp">
            <h2><a href="/blog.html?blogId=${key.id}">${key.title}</a></h2>
            <div class="coun">${key.content}...</div>
          </div>
          <div class="con_qt">
            <p>
              发布于
              <span>${key.ctime}</span>
            </p>
            <span>|</span>
            <p>阅读量(${key.views})</p>
            <span>|</span>
            <p>tags:
              ${tagsA(key.tags)}
            </p>
          </div>
        </li>
      `;
    }
    oUl.insertAdjacentHTML('afterbegin', str);
  };

  return () => {
    init();
  };
}());