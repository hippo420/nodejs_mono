/*
* net을 사용해 tcp 서버/클라이언트를 생성
* 이벤트 기반의 비동기 소켓통신을 지원함.
*/
var net = require('net');

var options={
    port : 3000,
    host : "127.0.0.1"
};

var client = net.connect(options,()=>{
    console.log('Connected......');
});

client.on('data', (data)=>{
    console.log(data.toString());
});

client.on('end',()=>{
    console.log('disconnected....');
});