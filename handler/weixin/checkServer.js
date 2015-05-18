var check = require("../../lib/weixin/checkToken");
var bodyParser = require('body-parser')
	// create application/json parser 
var jsonParser = bodyParser.json()
	// create application/x-www-form-urlencoded parser 


var urlencodedParser = bodyParser.urlencoded({
	extended: false
})

module.exports = function(req, res, cb) { //微信校验
	var now = new Date();
	console.log("method", req.method);
	console.log(now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " " + now.getMilliseconds());

	var support_get_flag = true; //调试标记

	if (req.method == "GET" && support_get_flag) {
		var query = req.query;

		var signature = query.signature;
		var timestamp = query.timestamp;
		var nonce = query.nonce;
		var echostr = query.echostr;


		console.log("wexin check", req.query);
		var result = check(signature, timestamp, nonce, echostr);
		console.log("check result=[" + result + "]");
		if (result) {
			return echostr; //如果校验通过 按照微信要求 原样返回echostr
		} else {
			return false;
		}
	} else {
		console.log("headers", req.headers);
		console.log("body", req.body);

		res.header('Content-Type', 'text/xml');

		var result = "";
		//result += '<?xml version="1.0" encoding="utf-8"?>';
		var xml = req.body.xml || {};
		if (xml.eventkey && xml.eventkey[0] == "CMD1") {
			console.log("CMD1");
			result += "<xml>";
			result += "<ToUserName><![CDATA[" + xml.fromusername + "]]></ToUserName>";
			result += "<FromUserName><![CDATA[" + xml.tousername + "]]></FromUserName>";
			result += "<CreateTime>" + xml.createtime + "</CreateTime>";
			result += "<MsgType><![CDATA[text]]></MsgType>";
			result += "<Content><![CDATA[" + getNowStr() + "你好,测试被动推送消息]]></Content>";
			result += "</xml>";
		} else if (xml.eventkey && xml.eventkey[0] == "CMD2") {


			result += "<xml>";
			result += "<ToUserName><![CDATA["+xml.fromusername+"]]></ToUserName>";
			result += "<FromUserName><![CDATA["+xml.tousername+"]]></FromUserName>";
			result += "<CreateTime>"+xml.createtime+"</CreateTime>";
			result += "<MsgType><![CDATA[news]]></MsgType>";
			result += "<ArticleCount>2</ArticleCount>";
			result += "<Articles>";
			result += "<item>";
			result += "<Title><![CDATA[测试标题1]]></Title>";
			result += "<Description><![CDATA[测试描述1]]></Description>";
			result += "<PicUrl><![CDATA[http://www.51blb.com/static/images/logo.png]]></PicUrl>";
			result += "<Url><![CDATA[http://www.51blb.com]]></Url>";
			result += "</item>";
			result += "<item>";
			result += "<Title><![CDATA[测试标题2]]></Title>";
			result += "<Description><![CDATA[测试描述2]]></Description>";
			result += "<PicUrl><![CDATA[http://www.51blb.com/static/images/mt004.png]]></PicUrl>";
			result += "<Url><![CDATA[http://www.51blb.com]]></Url>";
			result += "</item>";
			result += "</Articles>";
			result += "</xml>";
		} else if (xml.eventkey && xml.eventkey[0] == "CMD2") {
			result += "<xml>";
			result += "<ToUserName><![CDATA[" + xml.fromusername + "]]></ToUserName>";
			result += "<FromUserName><![CDATA[" + xml.tousername + "]]></FromUserName>";
			result += "<CreateTime>" + xml.createtime + "</CreateTime>";
			result += "<MsgType><![CDATA[image]]></MsgType>";
			result += "<Image>";
			result += "<MediaId><![CDATA[Nst3OlirgKwCPzS6FLNfom0aRwz-pGIZNOEByG3GrVc]]></MediaId>";
			result += "</Image>";
			//result += "<Content><![CDATA[" + getNowStr() + "你好,测试被动推送消息]]></Content>";
			result += "</xml>";
		}


		//console.log("return content:", result);
		return result;
	}
	//return result;
}

function getNowStr() {
	var now = new Date();
	var str = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " ";
	str += now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
	return str;
}

//console.log(getNowStr());