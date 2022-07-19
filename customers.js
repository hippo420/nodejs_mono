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