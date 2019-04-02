// 随机云标签
const initYbq = (function() {
  const oUl = document.querySelector('.warapp .tag .sjybq ul');
  console.log('1112')

  // 给有序的数组乱序
  const arrlx = (arr) => {
    return arr.sort(function(a,b) {
      return (Math.random()-0.5);
    });
  };

  // 随机返回 字体大小 和 颜色
  const sjFzColor = () => {
    // Math.floor(Math.random() * (max - min + 1)) + min;
    //  return "rgb(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 10) + ')';
    // 颜色
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // 字体大小
    const fz = Math.floor(Math.random() * (22 - 16 + 1)) + 16;

    return `font-size: ${fz}px; color: rgb(${r}, ${g}, ${b});`
  };
  console.log(sjFzColor())

  const init = () => {
    // 随机云标签获取
    getAjax();
  };

  // ajax-标签获取
  const getAjax = () => {
    axios.get('/getTagAll')
      .then(data => {
        console.log(data.data.data)
        render(data.data.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 渲染函数
  const render = (data) => {
    const arr = arrlx(data);
    sjyRender(arr)
  };

  // 随机云标签 渲染
  const sjyRender = (data) => {
    let str = '';
    oUl.innerHTML = '';
    for(const key of data) {
      str += `
        <li>
          <a href="javascript:;" style="${sjFzColor()}" title="${key.tag}标签">${key.tag}</a>
        </li>
      `;
    }
    // console.log(str);
    oUl.insertAdjacentHTML('afterbegin', str);
  };

  return () => {
    init();
  }
}());

