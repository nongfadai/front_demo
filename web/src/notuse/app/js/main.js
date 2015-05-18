// JavaScript Document
require.config({
	baseUrl:"js",
	paths:{
		//"db":"db/db_core"
		"zepto":"../lib/zepto/zepto",
		"iscroll":"../lib/iscroll/iscroll",
	},
	shim:{
		"zepto":{
           "exports": "Zepto"
		},
		"iscroll":{
           "exports": "IScroll"
		},
	}
});
require(["spa","zepto","iscroll","mod/index","mod/reg"],function(spa,$,iscroll){
		//console.log("zepto",$);
		//console.log("iscroll",iscroll);
		spa.init();
	});