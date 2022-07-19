/*
*url모듈
*querystring : uri정보 파싱모듈
*클라이언트가 접속하면 req에서 method 및 uri정보 파싱
*HTTP Protocol 
*POST,PUT => data,end이벤트
*GET,DELETE => url의 parse활용
*/

/*REST API 
* REST 구성 
  - 자원 : URI
  - 행위 : HTTP Method => GET(Read:조회), POST(Create:생성), PUT(Update:수정), DELETE(Delete:삭제)
*  GET
*  POST
*  PUT
*  DELETE
*/
const http = require('http');
const url = require('url');
const querystring = require('querystring');

let server = http.createServer((req, res) =>{
    let method = req.method;
    let uri = url.parse(req.url,true);
    let pathname = uri.pathname;

    if(method=="POST" || method =="PUT")
    {
        let body="";
        
        req.on('data',function(data){
                body+=data;
        });

        req.on('end', function () {
            let params="";

            if(req.headers['content-type']=="application/json")
            {
                params = JSON.parse(body);
            }else{
                params = querystring.parse(body);
            }

            onRequest(res, method, pathname, params);
        });

    }else{//GET,DELETE
        onRequest(res,method, pathname, uri.query);
    }
}).listen(3000);

function onRequest(res, method, pathname, params){
    res.end("response!");
}


