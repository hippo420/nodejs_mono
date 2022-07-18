const net = require('net');

var server = net.createServer((socket)=>{
    socket.end('TCP Server...');
});

server.on('error',(err)=>{
    console.log('에러: '+err);
});

server.listen(3000,()=>{
    console.log('listen 정보: ', server.address());
});

