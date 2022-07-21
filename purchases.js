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
 
        default:
            return process.nextTick(cb,res,response);

    }
}


function register(method, pathname,params,cb){
    let response={
        key : params.key,
        errorcode : 0,
        errormessage : "success"
    };

    //null검사
    if(params.userid ==null || params.productsid ==null){
        response.errorcode=1;
        response.errormessage="Non-Parameters";
        cb(response);
    }else{
        //database.connectDB();
        let connection = mysql.createConnection(conn);
        connection.connect();
        connection.query("insert into purchases(userid, productsid) values(?,?)"
                        ,[params.userid, params.productsid]
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
     //null검사
     if(params.userid ==null || params.productsid ==null){
        response.errorcode=1;
        response.errormessage="Non-Parameters";
        cb(response);
    }else{
        let connection = mysql.createConnection(conn);
        connection.connect();
        connection.query("select userid, productsid from purchases where userid = ?"
                        ,[params.userid]
                        ,(error, results, fields) =>{    
                            if(error){
                                response.errorcode=1;
                                response.errormessage=error;
                            }else{
                                response.results=results;
                            }
                            cb(response);
                        });
        connection.end();
    }


}