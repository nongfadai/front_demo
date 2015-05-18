var path=require("path");
var fs=require("fs-extra");
module.exports=function(req,res){
	
	//var file="../../data/a1_index/a11.json";
	var file="../../data/a1_index/a12.json";
	return fs.readJsonSync(path.resolve(__dirname,file));
}