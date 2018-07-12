let http = require('http');
let fs = require('fs');
let path = require('path');
let mime= require('mime');
let querystring=  require('querystring');

let rootpath=path.join(__dirname,'www');
// console.log(rootpath);

http.createServer((request,response)=>{
    // console.log('jinlaile');
 let filepath = path.join(rootpath,querystring.unescape(request.url));
    console.log(filepath);
    let isexists=fs.existsSync(filepath);
    // console.log(isexists);  
    if(isexists){
        // 目录存在
        fs.readdir(filepath,(err,files)=>{
            // 判断是否是文件
            // 是文件
            // console.log(err);
            
            if(err){
                fs.readFile(filepath,(err,data)=>{
                    if(err){
                        console.log(err);                      
                    }else{
                        response.writeHead(200,{
                            'content-type':mime.getType(filepath)
                        });
                        response.end(data)

                    }
                });
            }
            // 是文件夹
            else{
                console.log(files);
                
                // 有首页
                if(files.indexOf("index.html")!=-1){
                    fs.readFile(path.join(filepath,'index.html'),(err,data)=>{
                        if(err){
                            console.log(err);                         
                        }else{
                            response.end(data);
                        }
                    })
                }
                // 没有首页
                else{
                    let backdata="";
                    for(let i=0;i<files.length;i++){
                        backdata+=`<h2><a href="${request.url=='/'?"":request.url}/${files[i]}">${files[i]}</a></h2>`
                    }
                    response.writeHead(200,{
                        'content-type':'text/html;charset=utf-8'
                    })
                    response.end(backdata)
                }
                // console.log("bushiwenjian");
                
            }

        })
    }else{
        // 目录不存在
        response.writeHead(404,{
            'content-type':'text/html;charset=utf-8'
        });
        response.end(`
                <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
                <html><head>
                <title>404 Not Found</title>
                </head><body>
                <h1>Not Found</h1>
                <p>The requested URL /index.hththt was not found on this server.</p>
                </body></html>
        `)
    }
    
}).listen(80,'127.0.0.1',()=>{
    console.log('监听开始');
    
    // response.end(data)
})