document.addEventListener('DOMContentLoaded',function(){
  init();
});



const init = function() {
  // 文章内容
  initBlog();

  // 评论
  llcontent();
}

// 博客文章 + 标题 + 浏览
const initBlog = (function () {
  const blog = document.querySelector('.warapp .content .blog');
  const blogContent = blog.querySelector('.blog_zw'); // 正文
  const blogTitle = blog.querySelector('.blog_title .js_title'); // 标题
  const blogDate = blog.querySelector('.blog_title .js_date'); // 发布时间
  const blogViews = blog.querySelector('.blog_title .js_views'); // 浏览量

  // 获取 文章 ID
  const urlID = () => {
    const searc =  window.location.search;
    // let blogId = '';
    if(searc) {
      return searc.split('?')[1].split('=')[1];
    } else {
      return false;
    }
  };

  const init = function() {
    // 获取文章ID
    const blogId = urlID();

    // 页面初始化时 获取数据
    getAjax(blogId);

    // 执行事件
    // bindEvent();
  };

  // ajax
  const getAjax = function(id) {
    axios.get('/getBlog',{
      params: {
        blogId: id,
      }
    })
      .then(function (data) {
          // alert('添加成功');
          console.log(data)
          render(data.data.data[0]);
      })
      .catch(function (error) {
          console.log(error);
      });
  };

  // 浏览量 + 1
  const pushViews = (views, id) => {
    axios.post('/pushViews',{
      data: views,
      id
    })
      .then(function (data) {
          // alert('添加成功');
          console.log(data)
          // render(data.data.data[0]);
      })
      .catch(function (error) {
          console.log(error);
      });
  };

  // 渲染 HTML
  const render = function(data) {
    console.log(data)
    // 正文
    blogHtml(data.content);
    // 标题
    titleFun(data.title);
    // 发布时间
    dateFun(data.ctime);
    // 浏览量
    viewsFun(data.views);

    const viewsData = parseInt(data.views) + 1;
    // 增加浏览量
    pushViews(viewsData, data.id);
  };

   // 文章内容--正文
   const blogHtml = (data) => {
    // let str = '';
    blogContent.innerHTML = '';
    blogContent.insertAdjacentHTML('afterbegin', data);
  };

  // 标题
  const titleFun = (data) => {
    blogTitle.textContent = data;
  };

  // 发布时间
  const dateFun = (data) => {
    blogDate.textContent = data;
  };

  // 浏览量
  const viewsFun = (data) => {
    // console.log(blogViews)
    blogViews.textContent = '浏览(' + data + ')';
  };

  return function() {
    init();
  }
}());

// 留言
const llcontent = (function() {
  const ly = document.querySelector('.warapp .content .ly');
  const lyData = ly.querySelector('h6 span'); // 留言数量
  const titleLydata = document.querySelector('.warapp .blog_title .js_pjsl'); // 标题处的评论数量
  const lyList = ly.querySelector('.list_box'); //评论内容

  const llb = document.querySelector('.warapp .llb');
  const but = llb.querySelector('.tj button'); // 提交
  const reply = llb.querySelector('.reply input'); //
  const replyName = llb.querySelector('.reply_name input'); // 回复名字
  const name = llb.querySelector('.name input'); // 昵称
  const emite = llb.querySelector('.emite input'); // 邮箱
  const text = llb.querySelector('.text textarea'); // 评论内容
  const yzm = llb.querySelector('.yzm input'); // 验证码
  const yzmImg = llb.querySelector('.yzm .img'); // 验证码图片
  let yzmData = ''; // 验证码的内容

  // 获取 文章 ID
  const urlID = () => {
    const searc =  window.location.search;
    // let blogId = '';
    if(searc) {
      return searc.split('?')[1].split('=')[1];
    } else {
      return false;
    }
  };

  // 时间转换
  const timeFun = (date) => {
    const nian = date.getFullYear(); // 年
    const yue = date.getMonth() + 1; // 月份
    const hao = date.getDate(); // 日
    const shi = date.getHours(); // 时
    const fen = date.getMinutes(); // 分
    const miao = date.getSeconds(); // 秒
    return `${nian}-${yue}-${hao} ${shi}:${fen}:${miao}`;
  };

   // 获取文章ID
  const blogId = urlID();
  const init = function() {
    // 页面初始化时 获取数据
    getAjax(blogId);

    // 验证码获取
    getCaptcha();

    // 执行事件
    bindEvent();
  };

  // 事件
  const bindEvent = function() {
    but.addEventListener('click', event1, false);

    // 更换验证码
    yzmImg.addEventListener('click', yzmFun, false);

    // 评论回复
    lyList.addEventListener('click', plhfFun, false);
  };

  // 获取评论-ajax
  const getAjax = (id) => {
    axios.get('/getComments', {
        params:{
          id
        }
      })
      .then(data => {
        console.log(data);
        render(data.data.data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  // 提交评论
  const event1 = () => {
    // 
    const replyVal = reply.value;

    // 回复昵称
    const replyNameVal = replyName.value;

    const nameVal = name.value;
    console.log(nameVal)
    if(nameVal === '') {
      alert('请输入昵称')
      return;
    }
    console.log('评论ok')

    const emiteVal = emite.value;
    if(emiteVal === '') { 
      alert('请输入邮箱')
      return;
    }

    const textVal = text.value;
    console.log(textVal)
    if(textVal === '') {
      alert('请输入评论内容')
      return;
    }

    const yzmVal = yzm.value;
    if(yzmVal === yzmData) {
      alert('验证码错误');
      return;
    }

    // 时间
    const time = timeFun(new Date());
    // 推送数据
    pushAjax(blogId, replyVal, replyNameVal, nameVal, textVal, emiteVal, time);
  };

  // 点击更换验证码
  const yzmFun = () => {
    getCaptcha();
  };

  // 评论回复
  const plhfFun = (e) => {
    const targets = e.target;
    console.log(e.target)
    if(targets.nodeName !== 'A') {return}
    // id
     reply.value = targets.dataset.reaply;

     // 回复昵称
     replyName.value = targets.dataset.reaplyName;

     // 发送请求
     event1();

  };

  // ajax--添加评论
  const pushAjax = function(id, reply, replyName, name, text, email, time) {
    axios.post('/pushComments', {
        id,
        parent: reply,
        parentName: replyName,
        userName: name,
        comments: text,
        email,
        utime: time,
        ctime: time
      })
      .then(data => {
        console.log(data);
        alert('评论成功');
        
      })
      .catch(err => {
        console.log(err);
      });
    // axios.get('/getBlog',{
    //   params: {
    //     blogId: id
    //   }
    // })
    //   .then(function (data) {
    //       // alert('添加成功');
    //       console.log(data)
    //       // render(data.data.data[0]);
    //   })
    //   .catch(function (error) {
    //       console.log(error);
    //   });
  };

  // 验证码获取
  const getCaptcha = () => {
    axios.get('/getCaptcha')
      .then(data => {
        console.log('验证码');
        console.log(data)
        yzmRender(data.data.data.text, data.data.data.data)
      })
      .catch(err => {
        console.log(err)
      });
  };

  // 验证码渲染
  const yzmRender = (data, img) => {
    // console.log(data)
    // console.log(img)
    yzmImg.innerHTML = img;
    yzmData = data;
  };

  // 渲染 HTML
  const render = function(data) {
    // console.log(data)
    lyts(data.length); // 评论数量
    lyListHtml(data); // 评论内容
  };

  // 回复
  const hf = (val, name) => {
    if(val > 0) {
      return `回复@${name}  `;
    } else {
      return '';
    }
  };

  // 留言数量
  const lyts = (len) => {
    lyData.textContent = len;
    titleLydata.textContent = '评价(' + len + ')';
  };

  // 留言内容列表
  const lyListHtml = (data) => {
    // console.log(data)
    let str = '';
    lyList.innerHTML = '';
    for(const key of data) {
      str += `
        <div class="ly_list">
          <p>
            <i></i>
            <strong>${key['user_name']}：</strong>
            <span>${hf(key.parent, key['parent_name'])}发表于${key.ctime}
              <a href="#llb" data-reaply="${key.id}" data-reaply-name="${key['user_name']}">[回复]</a>
            </span>
          </p>
          <p>${key.comments}</p>
        </div>
      `;
    }
    // console.log(str)
    lyList.insertAdjacentHTML('afterbegin', str);
  };


  return () => {
    init();
  }
}());

