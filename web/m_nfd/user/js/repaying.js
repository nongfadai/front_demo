$(function(){
	$("div.dialog_close").click(function(){
		$(this).parent().hide();
	});
});
function open(id){
	$("div.dialog").hide();
	$("#"+id).show();
}

function onOver(id){
	$("#wdzqyz_"+id).show();
}
function onOut(id){
	$("#wdzqyz_"+id).hide();
}