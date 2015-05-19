module.exports=function(req,res,next,opt){
	var compileVM=require("../compileVM/compile");

	var tplFile="index.vm";
	var root=opt.root;
	var data=
	console.log("tplFile",tplFile);
	var render=compileVM(tplFile,root,context);
	res.set('Content-Type', 'text/html');
	res.send("hello world");
}