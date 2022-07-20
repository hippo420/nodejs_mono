/*@title : 상품관리모듈
* export ? exports 
* process.nextTick
*/

const database =require('./database.js');

const mysql = require('mysql');

const conn ={
    host : 'localhost',
    user : '',
    password : '',
    database : ''   
};

//다른 곳에서 호출하게 export함
exports.onRequest= function(res, method, pathname, param, cb){
    //매소드별로 분기
    switch(method){
        case "POST":
            return register(method, pathname, params,(response)=>{
                //처리
                process.nextTick(cb,res,response);
            });

        case "GET":
            return inquiry(method, pathname, params,(response)=>{
                process.nextTick(cb,res,response);
            });

        case "DELETE":
            return unregister(method, pathname, params,(response)=>{
                process.nextTick(cb,res,response);
            });
        
        default:
            return process.nextTick(cb,res,response);
    }
}

function register(method, pathname,params,cb){
    let response={
        errorcode : 0,
        errormessage : "success"
    };

    //null검사
    if(params.name ==null || params.category ==null || params.price==null||params.description ==null){
        response.errorcode=1;
        response.errormessage="Non-Parameters";
        cb(response);
    }else{
        //database.connectDB();
        let connection = mysql.createConnection(conn);
        connection.connect();
        connection.query("insert into purchases(userid, productid) values(?,?)"
                        ,[params.userid, params.productid]
                        ,(error, results, field) =>{    
                            if(error){
                                response.errorcode=1;
                                response.errormessage=error;
                            }
                            cb(response);
                        });
        connection.end();
    }

};