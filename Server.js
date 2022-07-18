const http = require('http');

var server =http.createServer((req,res)=>{
    res.end("Server....");
});

server.listen(3000);