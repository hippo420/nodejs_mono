/*@title : 상품관리모듈
* export ? exports 
* process.nextTick
*/

const database =require('./database.js');


//다른 곳에서 호출하게 export함
exports.onRequest= function(res, method, pathname, param, cb){
    //매소드별로 분기
    switch(method){
        case "POST":
            return register(method, pathname, params,(response)=>{
                //처리
                process.nextTick(cb,res,response);
            });
            break;

        case "GET":
            return inquiry(method, pathname, params,(response)=>{
                process.nextTick(cb,res,response);
            });
            break;

        case "DELETE":
            return unregister(method, pathname, params,(response)=>{
                process.nextTick(cb,res,response);
            });
            break;
        
        default:
            return process.nextTick(cb,res,response);
            break;
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
    //DB접속
    }

};