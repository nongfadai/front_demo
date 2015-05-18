var request = require("request");
var path = require("path");
var now = new Date();
var timeStamp = parseInt(now.getTime() / 1000); /*秒数*/
var fs = require("fs");
var encoding = {
	encoding: "utf8"
};
var url = "";
var getAccessToken = require("./getAccessToken");

function addMenu(cb) {
	getAccessToken(function(jsonObj) {
		console.log("jsonObj", jsonObj);
		var token = jsonObj["access_token"];
		var url = "https://api.weixin.qq.com/cgi-bin/menu/create"
		url += "?access_token=" + token;

		var body = {
			"button": [{
				"type": "view",
				"name": "我要投资",
				"key": "V1001_TODAY_MUSIC",
				"url": "http://www.51blb.com"
			}, {
				"type": "view",
				"name": "福利专区",
				"key": "V1002_TODAY_MUSIC",
				"url": "http://www.51blb.com"
			}, {
				"name": "客服中心",
				"sub_button": [{
					"type": "click",
					"name": "文本消息",
					"key": "CMD1"
				}, {
					"type": "click",
					"name": "图文消息",
					"key": "CMD2"
				}, {
					"type": "click",
					"name": "图片",
					"key": "CMD3",
				}, {
					"type": "click",
					"name": "音乐",
					"key": "CMD4",
				}]
			}]
		};
		var opt = {
			url: url,
			json: true,
			body: body
		}
		request.post(opt, function(err, res, body) {
			//var jsonObj = JSON.parse(body);
			console.log("body", body);
			//jsonObj.timeStamp = timeStamp;
			//fs.writeFileSync(path.resolve(__dirname,"./data.json"), JSON.stringify(jsonObj), encoding);
			//cb && cb(jsonObj);
		});
	});
	//https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
}


addMenu();