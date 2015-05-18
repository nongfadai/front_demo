$(function(){
	$("#checkAll").click(function(){
		if($(this).attr("checked")){
			$("input:checkbox[name='letterId']").attr("checked",true);
		}else{
			$("input:checkbox[name='letterId']").attr("checked",false);
		}
	});
	$("input:checkbox[name='letterId']").click(function(){
		if("checked"!=$(this).attr("checked")){
			$("#checkAll").attr("checked",false);
		}else{
			var c1 = $("input:checkbox[name='letterId']:checked").length;
			var c2 = $("input:checkbox[name='letterId']").length;
			if(c1==c2){
				$("#checkAll").attr("checked",true);
			}
		}
	});
	$("select[name='status']").change(function(){
		window.location.href = url_self+"?status="+$(this).find("option:selected").val();
	});
	$("div.dialog_close").click(function(){
		$("div.dialog").hide();
	});
	$("#cancel").click(function(){
		$("div.dialog").hide();
	});
	$("#ok").click(function(){
		var form = document.forms[0];
		form.action = url_del;
		form.submit();
	});
});
function openLetter(obj, status, id){
	show('_'+id);
	if("WD"==status){
		$.post(url_update,{id:id},function(result){
			result = parseInt(result);
			if(1==result){
				$(obj).attr("onclick","openLetter(this,'YD', '"+id+"')");
				$(obj).find("div.til span").attr("class","zn_ico3");
				var unread = parseInt($("#unread").text());
				if(unread>=1){
					$("#unread").text(unread-1);
				}
				$("a.message span.red").text('('+(unread-1)+')');
			}
		},'json');
	}
}

function delAll(){
	if($("input:checkbox[name='letterId']:checked").length<=0){
		$("#inf0Div").html("<p class='f20 gray33'>请选择要删除的数据！</p>");	
		$("div.dialog").show();
		return ;
	}
	$("#inf0Div").html("<p class='f20 gray33'>确定要删除选择的站内信吗？</p>");
	$("div.dialog").show();
}