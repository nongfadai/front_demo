$(function(){
	$("input").keypress(function(){
		if(event.keyCode==13) {return false;}
	  });
	
	$('#tips0').hover(function(){
        $("#tips0Msg").show();
       },function(){
    	$("#tips0Msg").hide();
    });
	
	$('#tips0Msg').hover(function(){
        $("#tips0Msg").show();
       },function(){
    	$("#tips0Msg").hide();
    });
	$('#tips1').hover(function(){
        $("#tips1Msg").show();
       },function(){
    	$("#tips1Msg").hide();
    });
	
	$('#tips1Msg').hover(function(){
        $("#tips1Msg").show();
       },function(){
    	$("#tips1Msg").hide();
    });
	
	$("#tbButton").click(function(){
		checkBid();
	});
	
	$("#ok").click(function(){
		var form = document.forms[0];
		form.submit();
	});
	
	
	//一个汉字相当于2个字符  
	function get_length(s){  
	    var char_length = 0;  
	    for (var i = 0; i < s.length; i++){  
	        var son_char = s.charAt(i);  
	        encodeURI(son_char).length > 2 ? char_length += 2 : char_length += 1;  
	    }  
	    return char_length;  
	}

	// 将文字标题缩短，多出字符用省略号代替
	function subTitlestr(s, len) {
		var char_length = 0;
		if(s && len >= 1 && get_length(s) > len) {
			for (var i = 0; i < s.length; i++){
	            var son_char = s.charAt(i);  
	            encodeURI(son_char).length > 2 ? char_length += 2 : char_length += 1;
	            if(char_length == len) {
	            	return s.substring(0, i + 1) + '...';
	            }
	            else if(char_length > len){
	            	return s.substring(0, i) + '...';
	            }
	        }
		}
		return s;
	}
	// 检查表格标题长度，超过长度截取（一个中文字符占两个长度）
	var formTitle = $("[class*='formTitle-']");
	for(var i = 0; i < formTitle.length; i++) {
		var msg = formTitle[i].className.split(" ");
		for (var j = 0; j < msg.length; j++) {
			var temp = $.trim(msg[j]);
			if(temp.length>0){
				if(temp.indexOf('formTitle') != -1) {
					var formTitleClass = temp.split("-");
					if(formTitleClass.length>=2){
						formTitle[i].setAttribute('title', formTitle[i].innerText);
						formTitle[i].innerText = subTitlestr(formTitle[i].innerText, formTitleClass[1]);
					}
				}
			}
		}
	}
});

function checkBid(){
	
	
	
	var amount=$("#amount").val();
	if(amount == 0 || amount.length==0){
		$("#info").html(showDialogInfo("请输入购买金额","perfect"));	
		$("div.popup_bg").show();
		return;
	}
	var syje= $("#syje").val();
	if(parseInt(syje) < parseInt(amount)){
		$("#info").html(showDialogInfo("您的投标金额大于标的剩余金额","perfect"));	
		$("div.popup_bg").show();
		return;
		
	}
	
	var minBid = $("#minBid").val();
	if(parseInt(amount) < parseInt(minBid)){
		$("#info").html(showDialogInfo("您的投标金额小于最低起投金额","perfect"));	
		$("div.popup_bg").show();
		return;
	}
	
	if(parseInt(syje) - parseInt(amount) <  parseInt(minBid) &&  parseInt(syje) - parseInt(amount) >  0){
		$("#info").html(showDialogInfo("剩余可投金额不能小于"+parseInt(minBid),"perfect"));	
		$("div.popup_bg").show();
		return;
	}

	var kyMoney=$("#kyMoney").val();
	if(parseInt(kyMoney) < parseInt(amount)){
		/*var url=$("#charge").val();
		$("#info").html(showForwardInfo('您的账户余额不足进行本次投标 ，请充值，点击"确定"，跳到充值页面，点击"取消"返回当前页面',"perfect",url));	
		$("div.popup_bg").show();
		return;*/
		var $cli = $("#tbButton").parent().parent();
		var err = $cli.children("p").eq(1);
		$error = err.nextAll("p[errortip]");
		$tip = err.nextAll("p[tip]");
//		$error.addClass("error_tip");
//		$error.html("可用金额不足！");
		$tip.hide();
//		$error.show();
		$("#info").html(showDialogInfo("可用金额不足！", 'perfect'));
		return false;
	}
	
	var isYuqi= $("#isYuqi").val();
	
	if(isYuqi == "Y"){
		$("#info").html(showDialogInfo("您有逾期未还的贷款，还完才能进行投标操作","perfect"));	
		$("div.popup_bg").show();
		return;
	}
	$("#zxMoney").text(amount);
	$("div.popup_bg").show();
	$("div.dialog").show();
}

function openImageDiv(id) {

	//显示灰色 jQuery 遮罩层 
	var bh = $("body").height();
	var bw = $("body").width();
	$("#fullbg"+id).css({
		height : bh,
		width : bw,
		display : "block"
	});
	$("#dialog"+id).show();
}
//关闭灰色 jQuery 遮罩 
function closeBg(id) {
	$("#fullbg"+id).hide();
	$("#dialog"+id).hide();
}

function AutoResizeImage(maxWidth,maxHeight,objImg,imgId){
	nivWidth = window.screen.width;
	nivHeight = window.screen.height;
	if(nivWidth == 1366 && nivHeight == 768){
		maxWidth = 750;
		maxHeight = 750;
	}else if(nivWidth == 1360 && nivHeight == 768){
		maxWidth = 745;
		maxHeight = 745;
	}else if(nivWidth == 1280 && nivHeight == 1024){
		$("#dialog"+imgId).css("left","30%");
		if($.browser.msie){
		maxWidth = 945;
		maxHeight = 945;
		$("#dialog"+imgId).css("top","25%");	
		}else{
			maxWidth = 950;
			maxHeight = 950;
		}
	}else if(nivWidth == 1280 && nivHeight == 960){
		$("#dialog"+imgId).css("left","30%");
		if($.browser.msie){
		maxWidth = 935;
		maxHeight = 935;
		$("#dialog"+imgId).css("top","20%");	
		}else{
			maxWidth = 950;
			maxHeight = 950;
			$("#dialog"+imgId).css("top","25%");
		}
	}else if(nivWidth == 1280 && nivHeight == 800){
		$("#dialog"+imgId).css("left","30%");
		if($.browser.msie){
		maxWidth = 935;
		maxHeight = 935;
		$("#dialog"+imgId).css("top","20%");	
		}else{
			maxWidth = 950;
			maxHeight = 950;
			$("#dialog"+imgId).css("top","25%");
		}
	}else if(nivWidth == 1024 && nivHeight == 768){
		$("#dialog"+imgId).css("left","33%");
		if($.browser.msie){
		maxWidth = 680;
		maxHeight = 680;
		$("#dialog"+imgId).css("top","27%");	
		}else{
			maxWidth = 750;
			maxHeight = 750;
			$("#dialog"+imgId).css("top","25%");
		}
	}
	
	var img = new Image();
	img.src = objImg.src;
	var hRatio;
	var wRatio;
	var Ratio = 1;
	var w = img.width;
	var h = img.height;
	wRatio = maxWidth / w;
	hRatio = maxHeight / h;
	if (maxWidth ==0 && maxHeight==0){
	Ratio = 1;
	}else if (maxWidth==0){//
	if (hRatio<1) Ratio = hRatio;
	}else if (maxHeight==0){
	if (wRatio<1) Ratio = wRatio;
	}else if (wRatio<1 || hRatio<1){
	Ratio = (wRatio<=hRatio?wRatio:hRatio);
	}
	if (Ratio<1){
	w = w * Ratio;
	h = h * Ratio;
	}
	objImg.height = h;
	objImg.width = w;
	}

