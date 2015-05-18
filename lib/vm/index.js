module.exports=function(req,res,next,opt){
	var compileVM=require("../compileVM/compile");

	var tplFile="index.vm";
	var root=opt.root;
	var jsonFile="data/index/101.json"
	//console.log("tplFile",tplFile);
	
	
	var render=compileVM(tplFile,root,jsonFile);
	res.set('Content-Type', 'text/html');
	res.end(render);
}