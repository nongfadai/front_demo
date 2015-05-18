define(function(){
	/* spa 是一个单页应用程序管理器  所有的模块请求都要经过spa进行管理*/
	function _exports(){
		var spa={};
		spa.init=init;
		spa.loadMod=loadMod;
		return spa;
	}
	
	
	var stage={};//舞台只有一个
	var currMod=null;/*当前模块*/
	var currModName=null;	
	/*监听hash change事件*/
	
	function init(){//spa 单页应用程序管理对象
		//读取hash
		window.onhashchange=hashChange;
		
		var hash=document.location.hash||"";
		var mod=hash.match(/mod=[^&]*/ig);
		mod=(mod&&mod[0].substr(4))||"index";
		
		loadMod(mod,true);//首次登陆
		//mod.show();//主动调用mod的show方法
		
		bindEvent();
	}
	
	function bindEvent(){
		$("#btn_goBack").on("click",goBack);
	}
	
	
	function goBack(){
		console.log("goBack");
		//alert("goBack");
		history.go(-1);
	}
	
	function hashChange(){
		//alert("hashChange"+window.location.hash);
		var hash=document.location.hash||"";
		var mod=hash.match(/mod=[^&]*/ig);
		mod=(mod&&mod[0].substr(4))||"index";
		if(mod){
		//alert("mod="+mod);
			loadMod(mod);
		}
	}
	
	function loadMod(modName,firstLoadFlag){/*加载一个模块*/
		//var mod=require();
		require(["mod/"+modName],function(whichMod){
				//目标模块执行初始化
				if(firstLoadFlag){
					whichMod.firstInit();//首次加载
				}
				else{
					whichMod.init();//初始化新模块
				}
				console.log(modName+" init!");
				
				if(currMod){
					console.log("currMod unload:"+ currModName);
					currMod.unload(whichMod);//这里whichMod是什么 
					/*卸载当前模块 可能执行的是一些动画 或者把当前模块的DOM内容保存起来，便于下次使用*/
					/*unload事件要把当前模块传递过去  在unload成功后，例如离场动画结束后调用whichMod的show方法*/
				}
				
				$("#con").removeClass("con_"+currModName).addClass("con_"+modName);//移除上个模块的样式
				currModName=modName;//记录当前模块名
				currMod=whichMod;//记录当前模块
			});/*异步加载新模块*/
	}
	
	
	return _exports();
});