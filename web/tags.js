const serviceTags = require('./../service/servicTags');
const returnString = require('./../util/serviceReturn');
const path = new Map();

/**
 * 获取全部 标签
 */
const getTagAll = (req, res) => {
  console.log('获取全部 标签 web层')
  serviceTags.getTagAll((data) => {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
    res.write(returnString.serviceReturn('success', '获取所有标签', data));
    res.end();
  });
};
path.set('/getTagAll', getTagAll);

module.exports.path = path;