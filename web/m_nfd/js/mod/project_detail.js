require.config({
	baseUrl:"/js"
//		paths:{
//		//"db":"db/db_core"
//		"zepto":"../lib/zepto/zepto",
//		"iscroll":"../lib/iscroll/iscroll",
//		},
//		shim:{
//		"zepto":{
//		"exports": "Zepto"
//		},
//		"iscroll":{
//		"exports": "IScroll"
//		},
//		}
});


require(["mod/common"],function(common){
	function makeTab(controlDom,targetDom){
		controlDom.on("click",tabClick);
		
		function tabClick(e){
			//alert("click");
			var target=$(e.target).closest("a");
			
			console.log(target);
			if(target.hasClass("selected")){
				console.log("haveClass");
			}
			else{/**/
				controlDom.find(".selected").removeClass("selected");
				targetDom.find(".selected").removeClass("selected");
				
				target.addClass("selected");
				targetDom.find("."+target.attr("data-tab")).addClass("selected");
			}
		}
		
	}
	

	function init(){
		common.init();
		makeTab($("#my_tab"),$("#my_tab_content"));
	}
	init();/*首页模块初始化*/
});


//!
//function() {
//KISSY.use("event, dom, io",
//function(a, b, c, d) {
//var e = 10, //skip， 从第10条开始取
//f = 10; //take， 每次取10条
//b.on("#nfd-projects .more", "click",
//function() {
//var a = c.text(this),
//b = this;
//c.text(this, "加载中..."),
//new d({
//type: "get",
//url: "#", //加载更多项目列表
//data: {
//skip: e,
//take: f
//}
//}).then(function(d) {
//d[0] ? (c.append(c.create(d[0]).getElementById('nfd-projects-bd'), "#nfd-projects .bd"), e += f, c.text(b, a)) : c.hide(b)
//},
//function() {
//alert("加载项目列表异常，请重试！"),
//c.text(b, "加载中...")
//})
//})
//})
//} ();