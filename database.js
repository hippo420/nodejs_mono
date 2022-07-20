/*
* 데이터베이스 연동하기 위한 코드 
*conn Param
* @Param : ip
* @Param : DB사용자명
* @Param : DB비번
* @Param : DB스키마명
*/

const mysql = require('mysql');

const conn ={
    host : 'localhost',
    user : '',
    password : '',
    database : ''   
};

function connectDB(){
    let connection = mysql.createConnection(conn);
    connection.connect();
    connection.query("query",(error, results, field) =>{
        //결과처리
    });
}
exports.connectDB =connectDB;
