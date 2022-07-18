/*
* Server.js실행후, Client.js실핼하면 localhost:3000에 출력된 data가 client에 전달되어 console로 출력됨.
* HTTP server/client는 이벤트 기반의 비동기 네트워크 통신을 지원함.
*/
var http = require('http');

var options ={
    host : "127.0.0.1",
    port : 3000,
    path : "/"
};

var req = http.request(options, (res)=>{
    var data="";
    res.on('data', (chunk)=>{
        data+=chunk;
    });

    res.on('end', ()=>{
        console.log('End....['+data+'}');
    });
});

req.end();
