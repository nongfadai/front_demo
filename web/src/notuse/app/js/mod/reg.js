define(
	[
		"../db/db",
		"../tpl/register/register"
	],
	function(db, regView) {
		var modName="reg";
		
		function _exports() {
			var mod = {};
			
			mod.name=modName;
			
			//mod.extraButtonText="多余按钮";//多余按钮的效果
			//mod.extraButtonEventName="";
			
			mod.extraButtonClick="";
			
			mod.firstInit=firstInit;
			mod.init = init;
			mod.show = show;
			mod.unload = unload;
			
			return mod;
		}


		function firstInit(){//首次初始化
			render();
			show();//如果是首次加载 不必等待show指令 可主动展示
		}
		function init() { //模块入口
			console.log("register mod init");
			//init调用的是render render只负责渲染内容 show负责让内容显示

			render();
		}

		function show() {
			//alert("show");
			$("#foot").hide();
			$(".top_div").hide();
			
			$("#top_curr").animate({
				opacity: 1
			}, 300); //显示当前位置  显示当前
			
			$("#mod_"+modName).addClass("mod_"+modName+"_show");
		}

		function unload(nextMod) { //模块卸载
			$("#mod_"+modName).removeClass("mod_"+modName+"_show").remove();;
			//alert("");
			$(".top_div").hide();
			
			$("#top_curr").css("opacity",0);//隐藏掉位置指示器
			nextMod.show();
		}

		function render() { //绘制界面


			var html = regView();
			var div=document.createElement("div");
			div.innerHTML=html;
			div.className="mod_"+modName;
			div.id="mod_"+modName;
			
			$("#main")[0].appendChild(div);
		}


		return _exports();
	});