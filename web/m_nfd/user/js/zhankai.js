function show(obj) {
	var obj = document.getElementById(obj);
	if (obj.style.display == "block") {
		obj.style.display = "none";
	} else
		obj.style.display = "block";

}

function openShutManager(oSourceObj, oTargetObj, shutAble, oOpenTip, oShutTip,phoneNumber) {
	var sourceObj = typeof oSourceObj == "string" ? document
			.getElementById(oSourceObj) : oSourceObj;
	var targetObj = typeof oTargetObj == "string" ? document
			.getElementById(oTargetObj) : oTargetObj;
	var openTip = oOpenTip || "";
	var shutTip = oShutTip || "";
	if (targetObj.style.display != "none") {
		if (shutAble)
			return;
		targetObj.style.display = "none";
		if (openTip && shutTip) {
			sourceObj.innerHTML = shutTip;
		}
		$("div#"+oTargetObj +" .text").val("");
		$("div#"+oTargetObj +" .error_tip").html("");
		//history.go(0);
		if("box3"== oTargetObj && oShutTip=="修改"){
			initBandEmail();
		}

		if( "box4" == oTargetObj && oShutTip=="修改"){
			initBandPhone();
		}
		
	} else {
		if("box5" == oTargetObj && phoneNumber==null){
//			targetObj.style.display = "block";
//			$(".tou_li").html("<li style='text-align: center;color: red;'>请先认证手机号码</li>");
//			sourceObj.innerHTML = openTip;
			$("#box51").show();
			$("#box51").find("input").bind("click",function(){
				$("#box51").hide();
			});
			//$("#vp>li").html("请先认证手机号码");
		}else{
			targetObj.style.display = "block";
			if (openTip && shutTip) {
				sourceObj.innerHTML = openTip;
			}
		}
		
	}
}

function setTab(name, cursel, n) {
	for (i = 1; i <= n; i++) {
		var menu = document.getElementById(name + i);
		var con = document.getElementById("con_" + name + "_" + i);
		menu.className = i == cursel ? "hover" : "";
		con.style.display = i == cursel ? "block" : "none";
	}
}

function initBandEmail(){
	$("div#box3 #mt1").show();
	$("div#box3 #e1").hide();
	$("div#box3 #e2").hide();
	$("div#box3 #e3").hide();
	$("div#box3 #ep1").hide();
	$("div#box3 #ep2").hide();
	$("div#box3 #ep3").hide();
	
}

function initBandPhone(){
	$("div#box4 #p1").hide();
	$("div#box4 #p2").hide();
	$("div#box4 #p3").hide();
	$("div#box4 #ip1").hide();
	$("div#box4 #ip2").hide();
	$("div#box4 #ip3").hide();
	$("div#box4 #mt2").show();

}

