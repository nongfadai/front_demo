$(function() {
	$("input[name='amount']").focusout(function() {
		var amount = $(this).val() * 1;
		amount = amount.toFixed(2) * 1;
		$(this).val(amount);
		if (!checkAmount(amount)) {
			return;
		}
		amount = amount * 1;
/*		if (!checkRange(amount)) {
			return;
		}*/
		$("span.error_tip").text("");
		var p = poundage(amount);
		$("#poundage").text(p);
		if(txsxfkcfs == true){
			$("#paySum").text(amount * 1);
		}else{
			$("#paySum").text(amount * 1 + p * 1);
		}
		//overFlow(amount + p);
	});
	$("div.dialog_close").click(function() {
		$("#dialog").hide();
	});
	$("a.tx_an1").mouseover(function(){
		$(this).parent().parent().find("div.pop-con").show();
	});
	$("a.tx_an1").mouseout(function(){
		$(this).parent().parent().find("div.pop-con").hide();
	});
	var a = $("input[name='amount']").val();
	if(a != null && "" != a && a.length != 0){
		var aa = a*1;
		var pp = poundage(aa);
		$("#poundage").text(pp);
		$("#paySum").text(aa + pp);
	}
});
function poundage(amount){
	if(punWay == 'BL') {
		punProportion *= 1;
		return acculatePoundage((amount * punProportion), 2);
	} else {
		if (1 <= amount && amount < 50000) {
			return p1;
		} else if(amount >= 50000 ){
			return p2;
		} else {
			return 0;
		}
	}
}
function checkCard(obj, id) {
	$("li.cards a").removeClass();
	$(obj).addClass("curr");
	$("input[name='cardId']").val(id);
}
function checkAmount(amount) {
	if (isNaN(amount)) {
		$("input[name='amount']").val("");
		$("#con_error").html("对不起，您输入的金额不为数字");
		$("#dialog").show();
		return false;
	}
	return true;
}
function checkRange(amount) {
	if (amount >= min && amount <= max) {
		return true;
	}
	$("#con_error").html(
			"提现金额不能低于<span class='red'>" + min
					+ "</span>元，且不能高于<span class='red'>" + max / 10000
					+ "</span>万元");
	$("#dialog").show();
	return false;
}
function checkPoundage(amount,poundage) {
	if (amount >= poundage) {
		return true;
	}else{
		$("#con_error").html("提现金额不能低于提现手续费");
		$("#dialog").show();
		return false;
	}
}
function onSubmit() {
	$("#passwordId").val(hex_md5($("#passwordId").val()));
	var a = $("input[name='amount']").val();
	if(a == '' || a == null || a.length == 0){
		$("#con_error").html("请输入提现金额");
		$("#dialog").show();
		return false;
	}
	var a = $("input[name='amount']").val();
	if(!getCard() || !checkAmount(a)){
		return false;
	}
	var amount = $("input[name='amount']").val() * 1;
	var p = poundage(amount);
	if(!checkRange(amount) || !withdrawPsd()){
		return false;
	}
	if(!checkPoundage(amount,p)){
		return false;
	}
	return true;
}
function withdrawPsd() {
	var psd = $("input[name='withdrawPsd']").val();
	if (psd == null || "" == psd || psd.length == 0) {
		$("#con_error").html("交易密码不能为空");
		$("#dialog").show();
		return false;
	}
	return true;
}
function getCard(){
	if(parseInt(len) - parseInt(delappCount) == 0 && delappCount > 0 ){
		$("#con_error").html("您的提现银行卡删除待审核中，请等待后台审核！");
		$("#dialog").show();
		return false;
	}
	
	if($("input[name='cardId']").val() == ''){
		$("#con_error").html("您还没有选择提现银行卡，请先选择提现银行卡");
		$("#dialog").show();
		return false;
	}
	if(len <= 0){
		$("#con_error").html("您还没有银行卡，请先添加银行卡");
		$("#dialog").show();
		return false;
	}
	return true;
}


function acculatePoundage(amount, len) {
	var add = 0;
	var s1 = amount + "";
	var start = s1.indexOf(".");
	if(start == -1) {
		return amount;
	}
	if(s1.substr(start + len + 1, 1) >= 5) {
		add = 1;
	}
	var t = Math.pow(10, len);
	var s = Math.floor(amount * t) + add;
	return s/t;
}