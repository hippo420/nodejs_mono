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

//회원관리 api테스트
function customers(callback){
    customers_delete(()=>{
        customers_post(()=>{
            customers_get(callback);
        });
    });

    function customers_post(cb){
        options.method="POST";
        options.path="/customers";
        request(cb,{
            username: "test_Account",
            password : "1234",
            passwordCon : "1234"
        });
    }

    function customers_get(cb){
        options.method="GET";
        options.path="/customers?username=test_Account&password=1234";
        request(cb);
    }

    function customers_delete(cb){
        options.method="DELETE";
        options.path="/customers?username=test_Account";
        request(cb);
    }
}

//구매관리 api테스트
function purchases(callback){
    purchases_post(()=>{
        purchases_get(()=>{
           callback();
        });
    });

    function purchases_post(cb){
        options.method="POST";
        options.path="/purchases";
        request(cb,{
            userid: "user1",
            productsid : "pro1"
        });
    }

    function purchases_get(cb){
        options.method="GET";
        options.path="/purchases?userid=user1";
        request(cb);
    }

}

console.log("customer list");
customers(()=>{
    console.log("customer list");
    products(()=>{
        console.log("purchase list");
        purchases(()=>{
            console.log("Done!");
        });
    });
});