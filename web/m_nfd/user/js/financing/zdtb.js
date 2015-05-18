$(function(){
	$("#yjtb_close").click(function(){
		$("div.popup_bg").hide();
		$("#yjtb_dialog").hide();
	});
	
	$("#yjtb").click(function(){
		$("div.popup_bg").show();
		$("#yjtb_dialog").show();
	});
	
	$("#zztb_close").click(function(){
		$("div.popup_bg").hide();
		$("#zztb_dialog").hide();
	});
	
	$("#zztb").click(function(){
		$("div.popup_bg").show();
		$("#zztb_dialog").show();
	});
});


function vailJkqx(){
	var start = $("select[name='jkqxStart']").val();
	var end = $("select[name='jkqxEnd']").val();
	if(parseInt(start)>parseInt(end)){
		$("#errorjk").html("借款期限的起始月不能大于截止月");
		$("#errorjk").css("color","red");
		$("#errorjk").show();	
	}else{
		$("#errorjk").hide();	
	}
}

function onSubmit(){
	if($("#errorjk").css("display")=="block"){
		return false;
	}
}
