require.config({
	baseUrl:"/js"
//	paths:{
//		//"db":"db/db_core"
//		"zepto":"../lib/zepto/zepto",
//		"iscroll":"../lib/iscroll/iscroll",
//	},
//	shim:{
//		"zepto":{
//           "exports": "Zepto"
//		},
//		"iscroll":{
//           "exports": "IScroll"
//		},
//	}
});
require(["mod/common"],function(common){
	
	function init(){
		common.init();
	}
	init();/*首页模块初始化*/
});