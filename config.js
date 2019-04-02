/**
 * 解析配置文件 server.conf
 * */
const fs = require('fs');
let globalConfig = {}; // 配置信息


/**
 * 将配置信息转成对象
 * */
const ctrlObj = function (data) {
    const arr = data.split('\r\n');
    for(const key of arr) {
        const keyArr = key.split('=');
        globalConfig[keyArr[0]] = keyArr[1];
    }
};

/**
 * 同步读取配置信息
 */
const obj = fs.readFileSync('./server.conf', 'utf-8');
// console.log(obj)

ctrlObj(obj);

module.exports = globalConfig;

