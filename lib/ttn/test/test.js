module.exports = function(req, res) {
	/**/

	//console.log(req2);
	//console.log("req.files",req.files);//目前一次只允许上传一个图片
	console.log("body", req.body);
	console.log("query", req.query);
	var param = req.query;
	var a = param.a || 0;
	var b = param.b || 0;
	var c = a + b;
	return {
		a: a,
		b: b,
		c: c
	};
}