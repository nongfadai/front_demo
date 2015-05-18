
function genSha1(data) {
	var app_id = "wx3eb0718281190cf6";
	var app_secret = "6ff53b417eb39296fc92134c0e0d04bd";
	var url = "http://dev.xiaoniu88.com/test.html";
	var noncestr = "1321312312312WER";
	var access_token = data.access_token;
	var ticket = data.ticket;
	var conf = {
		noncestr: noncestr,
		jsapi_ticket: ticket,
		timestamp: data.timestamp,
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

	console.log("sha1("+str+")");
	var sha1 = require('node-sha1');
	var sign = sha1(str);
	data.url = url;
	delete data.expires_in;
	data.jsapi_ticket=data.ticket;
	delete data.ticket;
	delete data.acess_token;
	data.noncestr = noncestr;
	//console.log("sign",sign);
	data.sign = sign;

	var obj={};
	obj.jsapi_ticket=data.jsapi_ticket;
	obj.noncestr=data.noncestr;
	obj.timestamp=data.timestamp;
	obj.url=data.url;
	obj.sign=data.sign;
	return obj;
}
var data={};
data.ticket="sM4AOVdWfPE4DxkXGEs8VECbW0laOLrWAmjGzBiX0kdvkPHu75DNoXgfXpVcZNUqXviVJ8PBUj8CIXu-v9WCYQ";
data.timestamp="1422406557";
var obj=genSha1(data);
console.log("obj",obj)