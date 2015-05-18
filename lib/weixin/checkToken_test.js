// JavaScript Document
var sha1=require("sha1");
var token="randomstr123QQ";
var signature="d6052d426941e652f7ee1a17a4febd9c6fe1ea5b";
var timestamp="1413285292";
var nonce="1828028929";
var echostr="4510389981213951469";
var crypto=require('crypto');

signature='5190964568f976ea72ec7f8f76cdf6db9423f9ab',
echostr='8777597893741096959',
timestamp='1428653757',
nonce='381217862';



var arr=[token,timestamp,nonce];
var str=arr.sort().join("");
console.log("str:",str);
var shasum=crypto.createHash('sha1');
var str2=shasum.update(str);
var shaResult=shasum.digest('hex');
console.log("shaResult",shaResult);
console.log("str2",str2);

var str3=sha1(str);

console.log("str3",str3);

var result=false;
if(str3==signature){
	result= true;
}
else{
	result= false;
}
console.log("check result",result);
