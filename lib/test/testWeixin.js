var request = require("request");
var path=require("path");
var now = new Date();
var timeStamp = parseInt(now.getTime() / 1000); /*秒数*/
var fs = require("fs");
var encoding = {
	encoding: "utf8"
};
var url="";

function getAccessToken(param,cb) {


	console.log("timestamp", timeStamp);

	var data = fs.readFileSync(path.resolve(__dirname,"./data.json"), encoding);
	//console.log("data",data);
	var dataObj = JSON.parse(data);
	if(param.force==1){
		dataObj.timeStamp=0;
	}
	if (dataObj.timeStamp + 7200 < timeStamp) { //已经超时  需要重新获取
		var url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx3eb0718281190cf6&secret=6ff53b417eb39296fc92134c0e0d04bd";
		request.get(url, function(err, res, body) {
			var jsonObj = JSON.parse(body);
			console.log("body",body);
			jsonObj.timeStamp = timeStamp;
			fs.writeFileSync(path.resolve(__dirname,"./data.json"), JSON.stringify(jsonObj), encoding);
			cb(jsonObj);
		});
	} else {
		cb(dataObj);
	}
}

function getTicket(param,cb) {
	getAccessToken(param,function(data) {
		//if(data.timeStamp+7200<timeStamp){//已经过期了，重新获取
		var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + data.access_token + "&type=jsapi";
		request(url, function(err, res, body) {
			var jsonObj = JSON.parse(body);
			console.log("body", body);
			jsonObj.timeStamp = timeStamp;

			data.ticket = jsonObj.ticket;

			fs.writeFileSync(path.resolve(__dirname,"./data.json"), JSON.stringify(data), encoding);
			cb(data);
		});
		//}
		//else{
		//	cb(data);
		//}
	})
}

module.exports=function(req,res){
	console.log("body",req.body);

	var url=decodeURIComponent(req.body.url);
	getTicket(req.body,function(data){
		var result=genSha1(data,url);
		//console.log("sha1",data.sign);
		console.log("data", data);
		 data.signature=data.sign;
		 data.timestamp=data.timeStamp;
		 data.nonceStr=data.noncestr;
		res.send(JSON.stringify({data:result}));
	});
}

function init() {
	getTicket({force:1},getDataBack);
}

function getDataBack(data) {
	//console.log("getDataBack",data);
	var url="http://dev.xiaoniu88.com/weixin/share/detail/1d30d52bd04523d1";

	genSha1(data,url);
	//console.log("sha1",data.sign);
	console.log("data", data);
}


function genSha1(data,url) {
var app_id = "wx3eb0718281190cf6";
var app_secret = "6ff53b417eb39296fc92134c0e0d04bd";
//var url = "http://dev.xiaoniu88.com/testWeixinShare.html";
//var url="http://dev.xiaoniu88.com/weixin/resources/weixin/testWeixinShare.html";
//var url="http://dev.xiaoniu88.com/weixin/share/detail/1d30d52bd04523d1";
//var url="http://dev.xiaoniu88.com/weixin/share/detail/1d30d52bd04523d1";

//var url = "http://dev.xiaoniu88.com/bonus.html?from=singlemessage&isappinstalled=0";
var noncestr = "D2AE4FD7431A872114C05E67864B17D1";
	var access_token = data.access_token;
	var ticket = data.ticket;
	var conf = {
		noncestr: noncestr,
		jsapi_ticket: ticket,
		timestamp: data.timeStamp,
		url: url
	};

	var arr = ["noncestr", "jsapi_ticket", "timestamp", "url"];
	var arr2 = arr.sort();
	var str = "";
	//console.log(arr2.length);
	for (var i = 0; i < arr2.length; i++) {
		var p = arr2[i];
		if (i > 0) {
			str += "&"
		}
		str += p + "=" + conf[p];
	}

	console.log(str);
	var sha1 = require('node-sha1');
	var sign = sha1(str);
	data.url = url;
	data.noncestr = noncestr;
	//console.log("sign",sign);
	data.sign = sign;

	return data;
}


init();

// var url="http://dev.xiaoniu88.com/test.html";
// url=encodeURIComponent(url);
// var str="https://open.weixin.qq.com/connect/oauth2/authorize?";
// str+="appid=wx3eb0718281190cf6&";
// str+="redirect_uri="+url+"&";
// str+="response_type=code&";
// str+="scope=SCOPE&state=STATE#wechat_redirect";
// console.log("str",str);
