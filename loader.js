/**
 * 读取 web 文件夹下的所有文件
 */
const fs = require('fs');
const globalConfig = require('./config');

const controllerSet = [];
const pathMap = new Map();

// 读取 web 文件夹 下所有的 文件名
const files = fs.readdirSync(globalConfig['web_path'], 'utf-8');
// console.log(files)

// 将 web 文件夹下所有文件 读取
for(const key of files) {
    const temp = require('./' + globalConfig['web_path'] + key);
    // console.log(temp)
    // 必须在文件中导出 path
    if(temp.path){
        controllerSet.push(temp);
        //
        for(const [key, value] of temp.path){
            // 当 url 请求地址不能一样
            if(!pathMap.get(key)){
                pathMap.set(key, value);
            } else {
                throw new Error('url path 异常，url是' + key)
            }
        }
    }
}

module.exports = pathMap;