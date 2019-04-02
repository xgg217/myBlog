/**
 * 数据库公共
 */

const mysql = require("mysql");

// 连接数据库--保证每次连接都是新的
const createConnection = () => {
    const connection = mysql.createConnection({
        host: "127.0.0.1",
        port: "3306",
        user: "root",
        password: "081213",
        database: "my_blog"
    });
    return connection;
};

module.exports.createConnection = createConnection;