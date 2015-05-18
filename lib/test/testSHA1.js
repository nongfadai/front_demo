var timestamp=parseInt(new Date().getTime()/1000);
console.log(timestamp);

var app_id="wx3eb0718281190cf6";
var app_secret="6ff53b417eb39296fc92134c0e0d04bd";

var access_token="p4fobudNXSw5MZTZCJm-_CgbnQ9nkbnXzmoJclY8M3jcVxF-Ol8VyKCynS0F28JKeBlxWkEC5-J6P3lswVQp3ePNKFVs0E-DqyZiHSpJF0o";
var ticket="sM4AOVdWfPE4DxkXGEs8VECbW0laOLrWAmjGzBiX0kdm5OnJ-9XfdMSUKpm5UGeZlbQgGMljNnmqSTet4z_Zfw";
var conf={
	noncestr:"Wm3WZYTPz0wzccnW123",
	jsapi_ticket:ticket,
	timestamp:timestamp,
	url:"http://172.20.17.121/test/test.html"
};

var arr=["noncestr","jsapi_ticket","timestamp","url"];
var arr2=arr.sort();
var str="";
console.log(arr2.length);
for(var i=0;i<arr2.length;i++){
	var p=arr2[i];
	if(i>0){
		str+="&"
	}
	str+=p+"="+conf[p];
}

console.log(str);
str="jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg&noncestr=Wm3WZYTPz0wzccnW&timestamp=1414587457&url=http://mp.weixin.qq.com?params=value";
var sha1 = require('node-sha1');
var sign=sha1(str); 
console.log("sign",sign);
//0f9de62fce790f9a083d5c99e95740ceb90c27ed
//# 2ef7bde608ce5404e97d5f042f95f89f1c232871
// appid：	wxd930ea5d5a258f4f
// mch_id：	10000100
// device_info：	1000
// body：	test
// nonce_str：	ibuaiVcKdpRxkhJA

// stringSignTemp="stringA&key=192006250b4c09247ec02edce69f6a2d"
// sign=MD5(stringSignTemp).toUpperCase()="9A0A8659F005D6984697E2CA0A9CF3B7"


// noncestr=Wm3WZYTPz0wzccnW
// jsapi_ticket="sM4AOVdWfPE4DxkXGEs8VECbW0laOLrWAmjGzBiX0kcYXE1x3KFOHBWa8qgS35vvEFr7wEP-6pAkXjLp5JZnQg";
// timestamp=	1414587457
//				1422343109
// url=http://www.xiaoniu88.com/weixin/index.html