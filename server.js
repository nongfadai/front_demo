var express = require('express');
var app = express();
var fs = require("fs");
var util = require('util');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var xmlparser = require('express-xml-bodyparser');
var session = require('express-session');
var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/web/src/favicon.ico'));

var colors = require('colors');
process.on('uncaughtException', function(e) {
    console.log("server on error");　　
    console.log(e);
});


app.use(session({
    name: 'token',
    secret: 'secret.91blb.com',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    },
    debug: true
}));
app.use(cookieParser());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));

// parse application/json
app.use(bodyParser.json());
app.use(xmlparser());

function logErrors(err, req, res, next) {
    console.log("logErrors");
    console.error(err.stack);
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.send(500, {
            error: 'Something blew up!'
        });
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
}


function handler(req, res) { //处理所有服务请求
    try {
        var method = req.path.replace(/^.*?\/data/g, "");
        method = method.replace(/\.(js|txt|json).*$/, ""); //忽略后面的任意参数  捕获rest请求

        console.log(("method=" + method).green);

        var fn = require("./handler" + method + ".js");
        var result = fn(req, res); //也允许异步返回
        //console.log("result=["+result+"]");
    } catch (e) {
        console.log(e);
        var result = {
            ec: 501
        };
    }

    if (result !== undefined) res.send(result); //直接返回结果
}

function compileVm(req,res) {
	var path=req.path;
	var PATH=require("path");
	var vmRoot=PATH.resolve(__dirname,"web/m_nfd/vm");
	console.log("vmRoot",vmRoot);
	
	var opt={};
	opt.root=vmRoot;
	
    if(path=="/"){
      path="/index.html"
    }
    path=path.replace(/\.html$/ig,'');

    try {
        var fn = require("./lib/vm" + path + ".js");
        fn(req, res,null,opt); //也允许异步返回
    } catch (e) {
        console.log("compileVm error:",e);
        res.send(404,"");
    }
}

function checkVM(req, res, next) {
    if(req.path=="/"||/\.html$/ig.test(req.path)){
		console.log("check vm req.path:", req.path);
	}
	
    if (req.path == "/" || req.path == "/index.html") {
        compileVm(req,res);
    }else if (req.path == "/bonus.html") {
        compileVm(req,res);
    } else {
        next();
    }
}


app.all('*', checkVM);
app.use("/handler/", handler); //服务处理程序 handler
app.use("/", express.static(__dirname + "/web/m_nfd/")); //服务处理程序
app.use("/web/", express.static(__dirname + "/web/")); //静态资源web



var port = 4000;
var host = "127.0.0.1";
var host = "0.0.0.0";

console.log("app listen host=[" + host + "] on port=[" + port + "]");
app.listen(port, host);


/*自动化监视代码 并更新缓存*/
var watch = require('watch')

watch.watchTree(__dirname + "/lib/", handlerChange); //handler文件发生变化清除改项缓存
watch.watchTree(__dirname + "/handler/", handlerChange); //handler文件发生变化清除改项缓存

function handlerChange(f, curr, prev) { //服务变化
    if (typeof f == "object" && prev === null && curr === null) {
        // Finished walking the tree
    } else if (prev === null) {
        // f is a new file
        // var rs=require(f);
    } else if (curr.nlink === 0) {
        console.log("handler file delete " + f);
        delete require.cache[f]; //删除

    } else {
        console.log("handler file change " + f);
        delete require.cache[f];
        //var rs = require(f); //重新加载改资源  确保下次使用能快速
        //console.log(rs.toString());
    }
}