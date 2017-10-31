/**
 * Created by zhulizhe on 2017/10/31.
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'football'
});

connection.connect();
var sql = 'INSERT INTO game_info(game_type,game_time,game_status) VALUES ?';


var  addSql = 'INSERT INTO game_info(game_type,game_time,game_status) VALUES(?,?,?)';
var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453'];

connection.query(addSql,addSqlParams, function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
});

connection.end();

