/*
* export ? exports 
* process.nextTick
*/

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
        key: params.key,
        errorcode : 0,
        errormessage : "success"
    };

    //null검사
    if(params.username ==null || params.password ==null){
        response.errorcode=1;
        response.errormessage="Non-Parameters";
        cb(response);
    }else{
        //database.connectDB();
        let connection = mysql.createConnection(conn);
        connection.connect();
        connection.query("insert into customers(username, password) values('"+params.username+"', password('"+params.password+"'));"
                        ,(error, results, fields) =>{    
                            if(error){
                                response.errorcode=1;
                                response.errormessage=error;
                            }
                            cb(response);
                        });
        connection.end();
    }

}

function unregister(method, pathname, params, cb){
    let response={
        key : params.key,
        errorcode : 0,
        errormessage : "success"
    };
    if(params.username ==null){
        response.errorcode=1;
        response.errormessage="Non-Parameters";
        cb(response);
    }else{
        let connection = mysql.createConnection(conn);
        connection.connect();
        connection.query("delete from customers where username = '"+params.username+"';"
                        ,(error, results, fields) =>{    
                            if(error){
                                response.errorcode=1;
                                response.errormessage=error;
                            }
                            cb(response);
                        });
        connection.end();
    }


}

function inquiry(method, pathname, params, cb){
    let response={
        key : params.key,
        errorcode : 0,
        errormessage : "success"
    };
    if(params.username ==null || params.password ==null){
        response.errorcode=1;
        response.errormessage="Non-Parameters";
        cb(response);
    }else{
        let connection = mysql.createConnection(conn);
        connection.connect();
        connection.query("select * from customers where username='"+params.username+"' and password=password('"+params.password+"');"
                        ,(error, results, fields) =>{    
                            if(error || results.length==0){
                                response.errorcode=1;
                                response.errormessage=error ? error : "비번틀림";
                            }else{
                                response.userid=results[0].id;
                            }
                            cb(response);
                        });
        connection.end();
    }
    
    


}