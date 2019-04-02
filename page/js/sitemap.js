/**
 * 地图页面
 */
document.addEventListener('DOMContentLoaded',function(){
  init();
});



const init = function() {
  // 文章内容
  initBlog();
};

// 文章内容

const initBlog = (function() {

  const oUl = document.querySelector('.box .box_ul ul');

  const init = function() {
    // // 获取文章ID
    // const blogId = urlID();
    ajaxAllBlog();
  };

  // 获取所有文章
  const ajaxAllBlog = () => {
    axios.get('/getAllBlog')
      .then(data => {
        console.log(data);
        render(data.data.data)
      })
      .catch(err => {
        console.log(err);
      })
  };

  // 渲染 HTML
  const render = (data) => {
    titleHtml(data);
  };

  // 页面内容
  const titleHtml = (data) => {
    let str = '';
    oUl.innerHTML = '';
    for(const key of data) {
      str += `
        <li>
          <a href="/blog.html?blogId=${key.id}">${key.title}</a>
        </li>
      `;
    }
    oUl.insertAdjacentHTML('afterbegin', str);
  }

  return () => {
    init();
  }
}());