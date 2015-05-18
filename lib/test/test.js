module.exports=function(req,res){
module.exports=function(req,res){
	var param=req.query;
	var body=req.body;

	
	console.log(param);
	console.log(body);
	var a=param.a||0;
	var b=param.b||0;

	return {a:a,b:b,c:a+b};
}