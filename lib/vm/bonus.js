module.exports=function(req,res,next,opt){
	var compileVM=require("../compileVM/compile");

	var tplFile="bonus.vm";
	var root=opt.root;
	var jsonFile="data/bonus/302.json"
	//console.log("tplFile",tplFile);
	
	
	var render=compileVM(tplFile,root,jsonFile);
	res.set('Content-Type', 'text/html');
	res.end(render);
}