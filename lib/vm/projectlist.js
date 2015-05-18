module.exports=function(req,res,next,opt){
	var compileVM=require("../compileVM/compile");

	var tplFile="project_list.vm";
	var root=opt.root;
	var jsonFile="data/project_list/201.json"
	//console.log("tplFile",tplFile);
	
	
	var render=compileVM(tplFile,root,jsonFile);
	res.set('Content-Type', 'text/html');
	res.end(render);
}