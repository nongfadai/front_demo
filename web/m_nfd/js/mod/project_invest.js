require.config({
	baseUrl:"/js"
//	paths:{
//		//"db":"db/db_core"
//		"zepto":"../lib/zepto/zepto",
//		"iscroll":"../lib/iscroll/iscroll",
//	},
//	shim:{
//		"zepto":{
//           "exports": "Zepto"
//		},
//		"iscroll":{
//           "exports": "IScroll"
//		},
//	}
});
require(["mod/common"],function(common){
	
	function bindEvent(){
		$("#amount").on("input",investChange);
		$("#amount").on("blur",validateInvest);
		$("#amount").on("focus",hideErrorMsg);
		$("#confirm_invest").on("click",doSubmit);
	}
	
	
	function investChange(){
		var val=$("#amount").val();
		if(val){
			var chinesNum=chineseNumber(val-0);
			console.log("val=",val,"chineseNum=",chinesNum);
			$("#invest_chinese_num").html(chinesNum);/*投资金额中文*/
		}else{
			$("#invest_chinese_num").html('');/*投资金额中文*/
		}
		$("#invest_profit").html(getProfit(val));
		$("#invest_bonus").html(getBonusBack(val));
	}
	
	function getProfit(val){
		var result="";
		
		if(val>0){
			var nsy = $("#nsy").val();
			var qx = $("#qx").val();
			var hkfs = $("#hkfs").val();
			console.log("amount:"+val+",nsy:"+nsy+",qx:"+qx+",hkfs:"+hkfs);
			result="预期收益:<i>"+beginJs(val,nsy,qx,hkfs)+"</i>元";
		}
		else{
		}
		
		return result;
	}
	function getBonusBack(val){
		var result="";
		var fx_mount=$("#fx_mount");
		fx_mount.val('');
		var hongbao = $("#hongbao").val();
		if(hongbao){
			if(val>0){
				var hbao = hongbao.substring(0,hongbao.lastIndexOf(",")).split(",");
				var hqhongbaotj = $("#hqhongbaotj").val();
				var fd = hqhongbaotj.split("#");
				var g_myBonus=[];
				var index = 0;
				for(var j=0;j<fd.length;j++){
					var fdv = fd[j].split("-");
					if(hbao.indexOf(fdv[1])!=-1){
						g_myBonus[index] = {invest:fdv[0],bonus:fdv[1]};
						index++;
					}
				}
				var obj;
				for(var i=0;i<g_myBonus.length;i++){
					obj=g_myBonus[i];
					if(parseFloat(val)>=parseFloat(obj.invest)){
						bonus=obj.bonus;
						break;
					}
				}
				if(i<g_myBonus.length&&obj){/*匹配上了红包*/
					result="投资返现:<i>"+obj.bonus+"元</i>";
					fx_mount.val(obj.bonus);
				}
			}
			else{
			}
		}
		return result;
	}
	
	
	function validateInvest(){
		var val=$("#amount").val()-0;/*进行校验*/
		var minVal=$("#min_amount").val()-0;
		var maxVal=$("#availableAmount").val()-0;
		var myVal=$("#my_amount").val()-0;
		
		var validata_result=true;
		var errorMsg="";
		if(val<minVal){
			validata_result=false;
			errorMsg="投资金额不能小于"+minVal+"元";
		}
		
		if(val>myVal){
			validata_result=false;
			errorMsg="您的余额不足,请充值后再投资";
		}
		
		if(val>maxVal){
			validata_result=false;
			errorMsg="投资金额不能大于"+maxVal+"元";
		}
		
		tip($("#invest_error_con"),validata_result,errorMsg);
		return validata_result;
	}
	
	function tip(dom,flag,errorMsg){
		errorMsg=errorMsg||"服务器错误，请稍后重试"
		console.log("show tip",dom,flag,errorMsg);
		var errorCon=dom;
		var errorDom=errorCon.children("p");
		console.log("errorDom",errorDom);
		if(flag){
			console.log("hide");
			errorCon.hide();/*隐藏错误提示信息*/
		}
		else{
			//console.log("show",errorDom[0]);
			//errorDom[0].innerHTML=errorMsg;
			$(errorDom).html(errorMsg);/*展示错误提示信息*/
			//console.log("show end");
			errorCon.show();/**/
		}
		console.log("where is the error");

	}
	
	function hideErrorMsg(){/*隐藏出错信息*/
		$("#invest_error_con").hide();
	}
	

	
	function doSubmit(){
		if(validateInvest()){
			submitForm();
		}
	}
	
	function submitForm(){
		$("#nfd-invest-form2").submit();	
	}
	
	function chineseNumber(num) {/*中文转换*/
		if (isNaN(num) || num > Math.pow(10, 12))
			return ""
		var cn = "零壹贰叁肆伍陆柒捌玖"
		var unit = new Array("拾百千", "分角")
		var unit1 = new Array("万亿", "")
		var numArray = num.toString().split(".")
		var start = new Array(numArray[0].length - 1, 2)
	
		function toChinese(num, index) {
			var num = num.replace(/\d/g, function($1) {
				return cn.charAt($1) + unit[index].charAt(start-- % 4 ? start % 4 : -1)
			})
			return num
		}
	
		for (var i = 0; i < numArray.length; i++) {
			var tmp = ""
			for (var j = 0; j * 4 < numArray[i].length; j++) {
				var strIndex = numArray[i].length - (j + 1) * 4
				var str = numArray[i].substring(strIndex, strIndex + 4)
				var start = i ? 2 : str.length - 1
				var tmp1 = toChinese(str, i)
				tmp1 = tmp1.replace(/(零.)+/g, "零").replace(/零+$/, "")
				tmp1 = tmp1.replace(/^壹拾/, "拾")
				tmp = (tmp1 + unit1[i].charAt(j - 1)) + tmp
			}
			numArray[i] = tmp
		}
	
		numArray[1] = numArray[1] ? numArray[1] : ""
		numArray[0] = numArray[0] ? numArray[0] + "元" : numArray[0], numArray[1] = numArray[1].replace(/^零+/, "")
		numArray[1] = numArray[1].match(/分/) ? numArray[1] : numArray[1] + "整"
		return numArray[0] + numArray[1]
	}
	
	
	function init(){
		common.init();
		bindEvent();
	}
	init();/*首页模块初始化*/
});


