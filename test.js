const http =require('http');
const { createBrotliCompress } = require('zlib');

let options={
    host : '127.0.0.1',
    port : 3000,
    header : {
        'Content-Type':'application/json'
    }
};

function request(cb, params){
    let req = http.request(options,(res)=>{
        let data ="";
        
        
        res.on('data',(chunk)=>{
            data+=chunk;
        });

        res.on('end',()=>{
            console.log(options,data);
            cb();
        });
    });

    if(params){
        req.write(JSON.stringify(params));
    }
    req.end();

}

//상품관리 api테스트
function products(callback){
    products_post(()=>{
        products_get(()=>{
            products_delete(callback);
        });
    });

    function products_post(cb){
        options.method="POST";
        options.path="/products";
        request(cb,{
            name: "test Product",
            category : "test_cate",
            price : 9999,
            description: "test_des"
        });
    }

    function products_get(cb){
        options.method="GET";
        options.path="/products";
        request(cb);
    }

    function products_delete(cb){
        options.method="DELETE";
        options.path="/products?id=1";
        request(cb);
    }
}