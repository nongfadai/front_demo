// JavaScript Document

var sha1=require("sha1");
var token="randomstr123QQ";
module.exports=check;

function check(signature,timestamp,nonce,echostr){
	//var signature="b23bd0812d9b257ca24509ab3fe26190838c0954";
	//var timestamp="1428655447";
	//var nonce="1501919065";
	//var echostr="4062024845586574711";
	//{ signature: 'b23bd0812d9b257ca24509ab3fe26190838c0954',
  //echostr: '4062024845586574711',
  //timestamp: '1428655447',
  //nonce: '1501919065'

	var arr=[token,timestamp,nonce];
	var str=arr.sort().join("");
	//console.log("str:",str);
	var str2=sha1(str);
	
	var result="false";
	if(str2==signature){
		result= true;
	}
	else{
		result= false;
	}
	//console.log("check result",result);
	return result;
}
