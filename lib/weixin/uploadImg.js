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

function uploadImage(cb) {
	getAccessToken(function(jsonObj) {
		console.log("jsonObj", jsonObj);
		var token = jsonObj["access_token"];
		var url = "https://api.weixin.qq.com/cgi-bin/menu/create"
		url += "?access_token=" + token;

		var formData = {
			// Pass a simple key-value pair
			//my_field: 'my_value',
			// Pass data via Buffers
			//my_buffer: new Buffer([1, 2, 3]),
			// Pass data via Streams
			my_file: fs.createReadStream(__dirname + '/../../web/src/favicon.ico'),
			// Pass multiple values /w an Array
			//attachments: [
			//  fs.createReadStream(__dirname + '/attachment1.jpg'),
			//  fs.createReadStream(__dirname + '/attachment2.jpg')
			//],
			// Pass optional meta-data with an 'options' object with style: {value: DATA, options: OPTIONS}
			// Use case: for some types of streams, you'll need to provide "file"-related information manually.
			// See the `form-data` README for more information about options: https://github.com/felixge/node-form-data
			//custom_file: {
			//  value: fs.createReadStream('/dev/urandom'),
			//  options: {
			//    filename: 'topsecret.jpg',
			//    contentType: 'image/jpg'
			//  }
			//}
		};

		//var url = "http://service.com/upload";
		//var url = "http://127.0.0.1:3000/handler/upload/reciever";
		request.post({
			url: url,
			formData: formData
		}, function optionalCallback(err, httpResponse, body) {
			if (err) {
				return console.error('upload failed:', err);
			}
			console.log('Upload successful!  Server responded with:', body);
		});
	});
	//https://api.weixin.qq.com/cgi-bin/menu/create?access_token=ACCESS_TOKEN
}



uploadImage();