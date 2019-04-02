const returnString = require('./../util/serviceReturn');
const studentService = require('./../service/servicEveryDay');
const path = new Map();

/**
 * 添加数据库添加每日一句
 * @param {*} req 
 * @param {*} res 
 */
const pushEveryDay = (req, res) => {
  req.on('data', (data) => {
    // 
    // 2019-3-28 11:16:19
    const {content, time} = JSON.parse(data);
    console.log(content)
    console.log(time)
    studentService.pushEveryDay(content, time, (re) => {
      res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
      res.write(returnString.serviceReturn('success', '添加成功', null));
      res.end();
    });
  });
};

path.set('/pushEveryDay', pushEveryDay);

/***
 * 获取每日一句
 */
const getEveryDay = (req, res) => {
  studentService.getEveryDay((data) => {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write(returnString.serviceReturn('success', 'ok', data));
    res.end();
  });
};
path.set('/getEveryDay', getEveryDay);

module.exports.path = path;