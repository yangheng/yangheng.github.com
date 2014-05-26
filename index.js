var http = require('http'),
    url=require('url'),
    fs=require('fs'),
    stream=require('stream'),
    util=require('util'),
    path=require('path');

    http.createServer(function(req,res){
        var path=url.parse(req.url,true),
           reallyPath=path.pathname,
           errorPath=__dirname+"/404.html";
       if(fs.exists(__dirname+reallyPath,function(exists){
           if(exists){

              fs.readFile(__dirname+reallyPath,function(err,data){
                  if(err){
                      res.writeHead(404,{'Content-Type': 'text/plain'});
                      console.log(err);
                      res.end('您访问的页面出了问题了');
                  }else{
                      res.writeHead(200,{'Content-Type':'text/html'});
                      res.write(data);
                      res.end();
                  }
              })
           }else{
               fs.readFile(errorPath,function(err,data){
                   res.writeHead(200,{'Content-Type':'text/html'});
                   res.write(data);
                   res.end();
               })

           }

       }));


    }).listen(1337,function(){console.log('server is open')});



