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
	function makeTab(dom){
		dom.find(".hd a").on("click",tabClick);
		
		function tabClick(e){
			var target=$(e.target);
			console.log(target);
			if(target.hasClass("selected")){
				console.log("haveClass");
			}
			else{/**/
				dom.find(".selected").removeClass("selected");
				//target.addClass("selected");
				dom.find("."+target.attr("data-tab")).addClass("selected");
			}
		}
		
	}
	
	function loadMore(){
		var currentPage = document.getElementById("currentPage").value;
		currentPage = parseInt(currentPage)+1;
		var pageCount = document.getElementById("pageCount").value;
		if(currentPage <= parseInt(pageCount)){
			$.ajax({
				url: "/projectListMore.htm",
				//url: "/projectListMore.json",//本地测试数据
				data: {
					currentPage: currentPage
				},
				dataType: "json",
				success: function(d){
					if(d){
						var len = d.length;
						var morehtml = new Array();
						for(var i = 0;i<len;i++){
							var creditInfo = d[i];
							var status = 0;
							if(creditInfo.F11 == 'YDF'){
								status = 1;
							}else if(creditInfo.F11 == 'YJQ'){
								status = 4;
							}else if(creditInfo.F11 == 'HKZ'){
								status = 3;
							}else if(creditInfo.F11 == 'DFK'){
								status = 2;
							}
							var project_status="project_status_"+status;
							morehtml.push("<a href=\"project_details.html?id="+creditInfo.F02+"\" class=\"project "+project_status+"\">");
							morehtml.push("<div class=\"title\">");
							morehtml.push("<span class=\"name\">"+creditInfo.F04+"</span>");
							morehtml.push("<span class=\"contract\"></span>");
							if(creditInfo.F11 != creditInfo.YFB) {
								if(creditInfo.proess==1){
									morehtml.push("<span class=\"btn btn_gray\">投资</span>");
								}else{
									morehtml.push("<span class=\"btn\">投资</span>");
								}
							}else{
								morehtml.push("<span>"+creditInfo.F13+"即将开启</span>");
							}
							morehtml.push("</div>");
							morehtml.push("<div class=\"info\">");
							morehtml.push("<div class=\"left\">");
							morehtml.push("<div class=\"secondary\">年化率</div>");
							morehtml.push("<div class=\"annual-rate\">");
							morehtml.push(creditInfo.F07+"<span class=\"secondary\">%</span>");
							morehtml.push("</div>");
							morehtml.push("</div>");
							morehtml.push("<div class=\"left\">");
							morehtml.push("<div class=\"secondary margin\">期限</div>");
							morehtml.push("<div class=\"deadline\">");
							if(creditInfo.S == creditInfo.F19){
								morehtml.push(creditInfo.F20 + "<span class=\"symbol\">天<span>");
							}else{
								morehtml.push(creditInfo.F10 + "<span class=\"symbol\">个月</span>");
							}
							morehtml.push("</div>");
							morehtml.push("</div>");
							morehtml.push("<div class=\"left\">");
							morehtml.push("<div class=\"secondary margin\">金额</div>");
							morehtml.push("<div class=\"money\">");
							if(creditInfo.F06>=10000){
								morehtml.push("<span class=\"amount\">"+creditInfo.F06/10000+"</span>");
								morehtml.push("<span class=\"symbol\">万元</span>");
							}else{
								morehtml.push("<span class=\"amount\">"+creditInfo.formatAmountF06+"</span><span class=\"symbol\">元</span>");
							}
							morehtml.push("</div>");
							morehtml.push("</div>");
							morehtml.push("<div class=\"right progress progress-bar-"+parseInt(creditInfo.proess*100)+"\">");
							morehtml.push("<div class=\"percent\">");
							if(creditInfo.proess==1){
								morehtml.push("满");
							}else{
								morehtml.push(parseInt(creditInfo.proess*100)+"<span class=\"secondary\">%</span>");
							}
							morehtml.push("</div>");
							morehtml.push("</div>");
							morehtml.push("</div>");
							morehtml.push("<div class=\"project_status project_status_min\">");
							morehtml.push("</div>");
							morehtml.push("</a>");
						}
						$("#nfd-projects").append(morehtml.join(''));
						if(window.myScroll){
							window.myScroll.refresh();
						}
						document.getElementById("currentPage").value = currentPage;
					}
				},error:function(){
					alert("加载项目列表异常，请重试！");
				}

			});
		}
		if(currentPage >= parseInt(pageCount)){
			document.getElementById("more").style.display = "none";
		}
	}

	function init(){
		common.init();
		makeTab($("#nfd-investments"));

		$(".load-more").click(loadMore);
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