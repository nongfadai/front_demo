module.exports=function(req,res){
	console.log("jsp path",req.path);
	var compileJSP=require("./compileJSP");
	console.log(compileJSP);

	return compileJSP(req.path);
}