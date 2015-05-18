// JavaScript Document
/*
	author: liudongjie
	time:2015-03-09
	usage: 首页
	layout:
		top		展示logo  用户账户名 可用余额
		banner	展示banner 和运营活动
		main	展示产品信息  安心牛或者标的
		nav		导航
	specication:
		1.
*/
define(
[
	"../db/db",
	"../tpl/index/index",
	"../util/util",
	"../util/canvas"
],
function(db,indexView,util,canvas){
	
	var modName="index";//模块名称
	
	function _exports(){
		var mod={};
		mod.name=modName;//
		
		mod.firstInit=firstInit;
		mod.init=init;
		mod.show=show;
		mod.unload=unload;
		
		return mod;
	}
	
	
	function prepare(){/*准备*/
	}
	
	function firstInit(){//首次初始化
		render();
		show();//如果是首次加载 不必等待show指令 可主动展示
	}
	
	function init(){//模块入口
		//init默认会在500ms后调用show吗  或者等上一模块unload结束后回调当前模块的show方法  
		render();
	}
	
	function show(){//展示  将场景展示出来	也许是动画     只关心本模块要操作的内容
		//比如标题和指示位置  渐变展示出来  按照约定  在show之前所有元素都是不可见的
		
		//这里show依赖render，因为这里是个异步render
		
		$("#foot").show();//导航栏要显示出来
		
		//$("#top_curr").hide();//显示首页登录 注册按钮  应该判断登录态 决定显示按钮还是余额信息
		$("#top_login").show();//显示首页登录 注册按钮  应该判断登录态 决定显示按钮还是余额信息
		$("#top_logo").animate({translateX:"0px"},400);
		
		$("#mod_"+modName).addClass("mod_"+modName+"_show");
		
		console.log("show index mod",$("#mod_"+modName));
		//alert("show index");
	}
	
	
	function unload(nextMod){//模块管理  unload事件
		//alert("index unload");
		//$("#main").html("");
		//$("#top_login").hide();
		//alert($("#top_logo").animate);
		$("#mod_"+modName).removeClass("mod_"+modName+"_show").remove();;

		$("#top_logo").animate({translateX:"-120px"},400,function(){
				//动画结束
				//alert("动画结束");
				nextMod.show();
			});//将首页的log隐藏
		
		
	}
	
	function render(){
		//var html=indexView(result,util);
		var div=document.createElement("div");
		div.innerHTML="";//要确保先给个基本的内容
		div.className="mod_"+modName;//样式 默认是隐藏样式  
		div.id="mod_"+modName;//id
		$("#main")[0].appendChild(div);
		
		db.getIndexData(null,renderAsyn);
	}
	
	
	function renderAsyn(result){//异步绘制界面
		console.log("index render");
		if(result){
			var html=indexView(result,util);
			//var div=document.createElement("div");
			//div.innerHTML=html;
			//div.className="mod_"+modName;//样式 默认是隐藏样式  
			//div.id="mod_"+modName;//id
			
			$("#mod_"+modName).html(html);
			
			setTimeout(initScroll,500);/*延迟0.5s后处理滚动事件*/
			showProcess();//使用canvas来绘制一个圆圈
			//console.log("render:",html);
		}
	}
	
	//圆形进度条
	function showProcess(){
		var borrowJd = $("#borrowJd").val();
		var opt={
			target:"canvas",			//目标id
			radius:25,					//半径
			circle_x:45,				//圆心X坐标
			circle_y:45,				//圆心Y坐标
			circle_inner_width:5,		//内圆弧宽
			circle_inner_color:"#dddddc",	//内圆弧色值
			circle_center_width:5,		//中间圆弧宽
			circle_center_color:"#dadad9",	//中间圆弧色值
			circle_outer_width:8,		//外圆弧宽
			circle_outer_color:"#cfa74a",	//外圆弧色值
			progress_val:borrowJd 			//进度值，必须为0-100
		};
		canvas.makeProgressCircle(opt);
	}
	/*初始化内容滚动*/
	function initScroll(){
		
		var topHeight=46;
		var footHeight=48;
		var imgHeight=$("#img").height()||0;
		var restHeight=document.body.clientHeight-46-48-imgHeight;
		var myScroll;
		$("#scroller").height(restHeight);
		myScroll = new IScroll('#scroller', {
			scrollbars: false,
			mouseWheel: true,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			fadeScrollbars: false,
			preventDefault: false
		});
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	}
	
	return _exports();
});