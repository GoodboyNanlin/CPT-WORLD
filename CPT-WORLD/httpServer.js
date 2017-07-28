/**
 * Created by Administrator on 2017/6/16.
 */
// 引入相关的模块
var http = require("http");
var path = require("path");
var express = require("express");
var url = require("url");
var fs = require("fs"); // 文件系统

// 引入body-parser模块
var bodyParser = require("body-parser");
// 创建application/x-www-form-urlencoded解析器。其中extended是必须的
var urlEncodedParser = bodyParser.urlencoded({ extended: false });

var formidable = require("formidable"); // 引入formidable模块
//var ejs = require("ejs");

var app = express();

// 设置模板引擎: 1)告诉express，模板文件放在哪里;
app.set("views", path.resolve(__dirname, "views"));
//               2)告诉express，使用哪一种视图引擎来解析视图模板
app.set("view engine","ejs");

// 处理对静态资源的请求
var staticPath = path.resolve(__dirname, "public");  // 解决文件路径跨平台
app.use(express.static(staticPath));

app.post('/',function(req,res){
    if(req.url!=="/favicon.ico"){
        req.on('data',function(data){
            var newData = decodeURIComponent(data,true);
            console.log("服务器接收到的数据：　"+newData);
        });
        req.on("end",function(){
            /*console.log('客户端请求数据全部接收完毕');*/
        });
    }
    res.render("success");
})

app.use(function (req, res) {
    res.render("404");
});


http.createServer(app).listen(8080,function(){
    console.log("web服务器正运行在8080端口");
});