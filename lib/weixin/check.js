var sha1=require("sha1");
var token="randomstr123QQ";
module.exports=function(param,sysParam,cb){//微信校验
	
	var req=sysParam.req;
	var signature=req.signature;
	var timestamp=req.timestamp;
	var nonce=req.nonce;
	var echostr=req.echostr;
	
	var arr=[token,timestamp,echostr];
	var str=arr.sort().join("");
	
	var str2=sha1(str);
	
	var result="false";
	if(str2==signature){
		result= echostr;
	}
	else{
		result= "false";
	}
	console.log("wechat check",req.query);
	console.log("check result",result);

	return false;
}// JavaScript Document