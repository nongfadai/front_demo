$(function(){
	$("a[id^='yearRate_'],a[id^='progress_'],a[id^='status_'],a[id^='bidType_'],a[id^='creditTerm_'],a[id^='sort_']").click(function(){
		setPageStatus($(this));
	});
	
	$("a.page-link").click(function(){
		pageParam(this);
	});
	
	$("li.normalMenu").click(function(){
		setNormalMenu(this);
	});
});

function setNormalMenu(obj){
	if($(obj).hasClass("hover")){
		return;
	}
	var a = $("<a href=\"javascript:void(0);\"></a>");
	var hoverLi = $("li.hover");
	hoverLi.attr("class","normalMenu");
	a.text(hoverLi.text());
	hoverLi.html(a);
	$(obj).attr("class","hover");
	$(obj).html($(obj).find("a").text());
	$(hoverLi).unbind("click");
	$(hoverLi).click(function(){
		setNormalMenu(this);
	});
	initPage();
	setParamToAjax(1);
}

function initPage(){
	currentPage = 1;
	preOrderItem = "";
	orderItemId = "";
	var bidType = $("#bidType_1").addClass("cur");
	$(bidType).siblings("a").removeClass("cur");
	var yearRate = $("#yearRate_1").addClass("cur");
	$(yearRate).siblings("a").removeClass("cur");
	var creditTerm = $("#creditTerm_1").addClass("cur");
	$(creditTerm).siblings("a").removeClass("cur");
	var progress = $("#progress_1").addClass("cur");
	$(progress).siblings("a").removeClass("cur");
	var status = $("#status_1").addClass("cur");
	$(status).siblings("a").removeClass("cur");
	initTableTitle();
	var menuId = $("li.hover");
	if(menuId.val() == 1){
		$("#bidTypeDl").hide();
		$("#creditTermDl").hide();
		$("#processDl").show();
		$("#bidStatusDl").show();
	}else if(menuId.val() == 2){
		$("#bidTypeDl").show();
		$("#creditTermDl").show();
		$("#processDl").hide();
		$("#bidStatusDl").show();
	}else if(menuId.val() == 3){
		$("#bidTypeDl").show();
		$("#creditTermDl").show();
		$("#processDl").hide();
		$("#bidStatusDl").hide();
	}
}

function initTableTitle(){
	$("a[id^='sort_']").attr("class","arrow up");
	$("#sort_1").attr("name","42");
	$("#sort_2").attr("name","12");
	$("#sort_3").attr("name","52");
	$("#sort_4").attr("name","62");
	$("#sort_5").attr("name","72");
	$("#sort_6").attr("name","42");
	$("#sort_7").attr("name","12");
	$("#sort_8").attr("name","52");
	$("#sort_9").attr("name","62");
	$("#sort_10").attr("name","72");
}

function setPageStatus(obj){
	//判断当前标签 是否已经选中，如果选中了，直接返回
	if($(obj).hasClass("cur") && !$(obj).hasClass("arrow")){
		return false;
	}
	//将当前标签设为选中状态
	$(obj).addClass("cur");
	//将其它标签设为  非选中状态
	if($(obj).attr("id").indexOf("sort_") >= 0){
		$("a[id^='sort_']").each(function(){
			if($(obj).attr("id") != $(this).attr("id")){
				$(this).attr("class","arrow up");
			}			
		});
		if(orderItemId == ""){
			orderItemId = $(obj).attr("id");
		}else{
			if($(obj).attr("id") != orderItemId && $("#"+orderItemId).attr("name").substring(1,2) == "1"){
				$("#" + orderItemId).attr("name",getOrderKey($("#" + orderItemId).attr("name")));
				orderItemId = $(obj).attr("id");
			}
		}
	}else{
		$(obj).siblings("a").removeClass("cur");
		$("a[id^='sort_']").attr("class","arrow up");
	}
	//获取查询条件参数，调用ajax查询
	setParamToAjax(1,obj);
}

//设置标信息查询条件，并调用ajax查询结果
function setParamToAjax(currentPageP,obj){
	var pageId = $("li.hover").val();
	var bidType = $("a[id^='bidType_'][class='cur']").attr("name");
    var yearRate = $("a[id^='yearRate_'][class='cur']").attr("name");
    var creditTerm = $("a[id^='creditTerm_'][class='cur']").attr("name");
    var progress = $("a[id^='progress_'][class='cur']").attr("name");
    var status = $("a[id^='status_'][class='cur']").attr("name");
    var orderItem = $("a[id^='sort_'].cur").attr("name");
    if($(obj).hasClass("arrow")){
    	preOrderItem = orderItem;
    }
    if($(obj).hasClass("page-link")){
    	orderItem = preOrderItem;
    }
    var ajaxUrl;
    var data;
    if(pageId == 1){
    	data = {"currentPage" : currentPageP,
			    "pageSize" : pageSize,
			    "yearRate" : yearRate,
			    "progress" : progress,
			    "status" : status,
			    "orderItem" : orderItem
			   };
    	ajaxUrl = $("#enterpriseUrl").val();
    }else if(pageId == 2){
    	data = {"currentPage" : currentPageP,
			    "pageSize" : pageSize,
			    "bidType"  : bidType,
			    "yearRate" : yearRate,
			    "creditTerm" : creditTerm,
			    "status" : status,
			    "orderItem" : orderItem
			   };
    	ajaxUrl = $("#personalUrl").val();
    }else if(pageId == 3){
    	data = {"currentPage" : currentPageP,
			    "pageSize" : pageSize,
			    "bidType"  : bidType,
			    "yearRate" : yearRate,
			    "creditTerm" : creditTerm,
			    "orderItem" : orderItem
			   };
    	ajaxUrl = $("#zqzrUrl").val();
    }
	postService(ajaxUrl,data,obj);
};

//调用ajax查询标信息
function postService(url,data,obj){
	$.ajax({
		type:"post",
		url:url,
		data:data,
		async: false ,
	    dataType:"json",
	    success: function(returnData){
	    	setCountInfo(returnData.total);
	    	pageCount = returnData.pageCount;
	    	var table = createTableHeader();
	    	if(returnData.bidList == null){
	    		setOrderItem(table,obj);
	    		$("#pageContent").html(returnData.pageStr);
	    		return;
	    	}
	    	var bidList = eval(returnData.bidList);
	    	for(var i = 0; i < bidList.length; i++){
	    		createTableBody(table,bidList[i]);
	    	}
	    	setOrderItem(table,obj);
	    	$("#pageContent").html(returnData.pageStr);
	    	$("a.page-link").click(function(){
	    		pageParam(this);
	    	});
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			alert(textStatus);
		}
	});
}

function setOrderItem(table,obj){
	var orderItemId = $(obj).attr("id");
	var orderItemName = $(obj).attr("name");
	$("#bidInfo").html(table);
	if(typeof(orderItemId) != "undefined" && orderItemId.indexOf("sort_") >= 0){
    	var orderItem = $("#" + orderItemId);
    	orderItem.attr("name",getOrderKey(orderItemName));
    	if(orderItem.hasClass("up")){
    		orderItem.attr("class","arrow cur");
    	}else{
    		orderItem.attr("class","arrow up cur");
    	}
	}
	$("a[id^='sort_']").click(function(){
		setPageStatus($(this));
	});
}

function setCountInfo(countInfo){
	var pageId = $("li.hover").val();
	if(pageId == 3){
		$("#transCountAmountSpan").html("累计成交总金额<br/>" + formatCountMoney(countInfo.totleMoney));
		$("#zqzrbsEm").text(countInfo.totleCount);
		$("#zqzrbsLi").show();
		$("#ljcjbsLi").hide();
		$("#yhzqLi").hide();
	}else{
		$("#transCountAmountSpan").html("累计成交总金额<br/>" + formatCountMoney(countInfo.totleMoney));
		$("#transCountEm").text(countInfo.totleCount);
		$("#earnCountSpan").html("为用户累计赚取<br/>" + formatCountMoney(countInfo.userEarnMoney));
		$("#zqzrbsLi").hide();
		$("#ljcjbsLi").show();
		$("#yhzqLi").show();
	}
}

function formatCountMoney(amount){
	var s = "<em class=\"f24\">";
	if(amount == 0){
		return s + amount + ".00</em>元";
	}
	if(amount > 100000000){
		amount = amount / 100000000;
		if(amount.toString().indexOf(".") < 0){
			s = s + amount + ".00</em>亿元";
		}else{
			s = s + amount + "</em>亿元";
		}
	}else if(amount >= 10000 && amount < 100000000){
		amount = amount / 10000;
		if(amount.toString().indexOf(".") < 0){
			s = s + amount + ".00</em>万元";
		}else{
			s = s + amount + "</em>万元";
		}
	}else{
		s = s + formatMoney(amount,2) + "</em>元";
	}
	return s;
}

function pageParam(obj){
	if($(obj).hasClass("on")){
		return false;
	}
	$(obj).addClass("on");
	$(obj).siblings("a").removeClass("on");
	if($(obj).hasClass("startPage")){
		currentPage = 1;
	}else if($(obj).hasClass("pre")){
		currentPage = currentPage - 1;
	}else if($(obj).hasClass("next")){
		currentPage = currentPage + 1;
	}else if($(obj).hasClass("endPage")){
		currentPage = pageCount;
	}else{
		currentPage = $(obj).html();
	}
	setParamToAjax(currentPage,obj);
}

function createTableHeader(){
	var table;
	var pageId = $("li.hover").val();
	var num = 0;
	var tr;
	var tableId;
	if(pageId == 3){
		table = $("<table width=\"100%\" cellspacing=\"0\" id=\"zqzrTableShow\"></table>");
		if(typeof($("#zqzrTableShow").attr("id")) == "undefined"){
			tableId = "#zqzrTable tr";
		}else{
			tableId = "#zqzrTableShow tr";
		}
	}else{
		table = $("<table width=\"100%\" cellspacing=\"0\" id=\"bidTable\"></table>");
		if(typeof($("#bidTable").attr("id")) == "undefined"){
			tableId = "#bidTableHdn tr";
		}else{
			tableId = "#bidTable tr";
		}
	}
	$(tableId).each(function (){
		if(num != 0){
			return;
		}
		tr = $(this).clone();
		num++;
	});
	table.append(tr);
	return table;
}

function createTableBody(table,bidInfo){
	var pageId = $("li.hover").val();
	if(pageId == 3){
		createZqzrTable(table,bidInfo);
	}else{
		createBidTable(table,bidInfo);
	}
}

function createBidTable(table,bidInfo){
	var tr = $("<tr class=\"all_bj\"></tr>");
	var branch = "";
	if(bidInfo.F16 == "S"){
		branch = "保";
	}else if(bidInfo.F17 == "S"){
		branch = "抵";
	}else if(bidInfo.F18 == "S"){
		branch = "实";
	}else{
		branch = "信";
	}
	var td = $("<td></td>");
	var div = $("<div class=\"w250\"></div>");
	var span = $("<span class=\"xin ml30 mr10\">" + branch + "</span>");
	var a = $("<a></a>")
	// 借款标题
	span.appendTo(div);
	span = $("<span class=\"w200\"></span>");
	a.attr("href",$("#bdxqUrl").val() + bidInfo.F02 + ".html");
	a.attr("title",bidInfo.F04);
	a.html(subStringLength(bidInfo.F04,7));
	a.appendTo(span);
	span.appendTo(div);
	div.appendTo(td);
	td.appendTo(tr);
	// 借款金额
	td = $("<td></td>");
	if(bidInfo.F11 == "HKZ" || bidInfo.F11 == "YJQ" || bidInfo.F11 == "YDF"){
		bidInfo.F06 = bidInfo.F06 - bidInfo.F08;
		bidInfo.proess = 1;
		bidInfo.F08 = 0;
	}
	var amount = formatMoney(bidInfo.F06,1);
	if(bidInfo.F06 > 10000){
		span = $("<span class=\"f16\">" + amount + "&nbsp;</span>")
		span.appendTo(td);
		span = $("<span class=\"f12\">万元</span>")
		span.appendTo(td);
	}else{
		span = $("<span class=\"f16\">" + amount + "</span>")
		span.appendTo(td);
		span = $("<span class=\"f12\">元</span>")
		span.appendTo(td);
	}
	td.appendTo(tr);
	
	// 年利率
	td = $("<td></td>");
	span = $("<span class=\"f16\">" + formatYearRate(bidInfo.F07) + "</span>")
	span.appendTo(td);
	span = $("<span class=\"f12\">%</span>")
	span.appendTo(td);
	td.appendTo(tr);
	
	// 贷款期限
	td = $("<td></td>");
	if(bidInfo.F19 == "S"){
		span = $("<span class=\"f16\">" + bidInfo.F20 + "</span>")
		span.appendTo(td);
		span = $("<span class=\"f12\">天 </span>")
		span.appendTo(td);
	}else{
		span = $("<span class=\"f16\">" + bidInfo.F10 + "</span>")
		span.appendTo(td);
		span = $("<span class=\"f12\">个月 </span>");
		span.appendTo(td);
	}
	td.appendTo(tr);
	
	// 还需金额
	td = $("<td></td>");
	var remainAmount = formatMoney(bidInfo.F08,1);
	if(bidInfo.F08 > 10000){
		span = $("<span class=\"f16\">" + remainAmount + "&nbsp;</span>")
		span.appendTo(td);
		span = $("<span class=\"f12\">万元</span>")
		span.appendTo(td);
	}else{
		span = $("<span class=\"f16\">" + remainAmount + "</span>")
		span.appendTo(td);
		span = $("<span class=\"f12\">元</span>")
		span.appendTo(td);
	}
	td.appendTo(tr);
	
	// 进度
	td = $("<td></td>");
	if(bidInfo.F11 != "YFB"){
		div = $("<div class=\"pl30\"><div>");
		span = $("<span class=\"ui-list-field w110\"></span>");
		var strong = $("<strong class=\"ui-progressbar-mid ui-progressbar-mid-" + parseInt(bidInfo.proess * 100) + "\"></strong>");
		var em = $("<em>" + parseInt(bidInfo.proess * 100) + "%</em>");
		em.appendTo(strong);
		strong.appendTo(span);
		span.appendTo(div);
		div.appendTo(td);
	}else{
		var dateTime = new Date();
		dateTime.setTime(bidInfo.F13);
		span = $("<span class=\"ln24\">" + dateTime.Format("yyyy-MM-dd hh:mm") + "即将开启</span>");
		span.appendTo(td);
	}
	td.appendTo(tr);
	
	// 借款状态
	td = $("<td></td>");
	span = $("<span></span>");
	a = $("<a></a>");
	if(bidInfo.F11 == "TBZ"){
		if(sessionFlg){
			if(hmdFlg){
				span.attr("class","btn btn02 ml15");
				span.text("立即投标");
			}else{
				a.attr("class","btn btn01 ml15");
				a.attr("href",$("#bdxqUrl").val() + bidInfo.F02 + ".html");
				a.text("立即投标");
				a.appendTo(span);
			}
		}else{
			a.attr("class","btn btn01 ml15");
			a.attr("href",$("#bdxqUrl").val() + bidInfo.F02 + ".html");
			a.text("立即投标");
			a.appendTo(span);
		}
	}else{
		span.attr("class","btn btn02 ml15");
		span.text(getBidChineseName(bidInfo.F11));
	}
	span.appendTo(td);
	td.appendTo(tr);
	tr.appendTo(table);
}

function createZqzrTable(table,bidInfo){
	var tr = $("<tr class=\"all_bj\"></tr>");
	var branch = "";
	if(bidInfo.F19 == "S"){
		branch = "保";
	}else if(bidInfo.F20 == "S"){
		branch = "抵";
	}else if(bidInfo.F21 == "S"){
		branch = "实";
	}else{
		branch = "信";
	}
	var td = $("<td></td>");
	var div = $("<div class=\"w250\"></div>");
	var span = $("<span class=\"xin ml30 mr10\">" + branch + "</span>");
	var a = $("<a></a>")
	// 债权转让标题
	span.appendTo(div);
	span = $("<span class=\"w200\"></span>");
	a.attr("href",$("#bdxqUrl").val() + bidInfo.F24 + ".html");
	a.attr("title",bidInfo.F12);
	a.html(subStringLength(bidInfo.F12,7));
	a.appendTo(span);
	span.appendTo(div);
	div.appendTo(td);
	td.appendTo(tr);
	
	// 年利率
	td = $("<td></td>");
	span = $("<span class=\"f16\">" + formatYearRate(bidInfo.F14) + "</span>")
	span.appendTo(td);
	span = $("<span class=\"f12\">%</span>")
	span.appendTo(td);
	td.appendTo(tr);
	
	// 剩余期限
	td = $("<td></td>");
	span = $("<span class=\"f16\">" + bidInfo.F23 + "/" + bidInfo.F22 + "</span>")
	span.appendTo(td);
	td.appendTo(tr);
	
	// 债权价值
	td = $("<td></td>");
	span = $("<span class=\"f16\">" + formatMoney(bidInfo.F11,2) + "</span>")
	span.appendTo(td);
	span = $("<span class=\"f12\">元</span>");
	span.appendTo(td);
	td.appendTo(tr);
	
	// 待收本息
	td = $("<td></td>");
	span = $("<span class=\"f16\">" + formatMoney(bidInfo.dsbx,2) + "</span>")
	span.appendTo(td);
	span = $("<span class=\"f12\">元</span>");
	span.appendTo(td);
	td.appendTo(tr);
	
	// 转让价格
	td = $("<td></td>");
	span = $("<span class=\"f16\">" + formatMoney(bidInfo.F02,2) + "</span>")
	span.appendTo(td);
	span = $("<span class=\"f12\">元</span>");
	span.appendTo(td);
	td.appendTo(tr);
	
	// 购买
	td = $("<td></td>");
	span = $("<span></span>");
	a = $("<a></a>");
	if(sessionFlg){
		if(hmdFlg || !zrrFlg){
			span.attr("class","btn btn02 ml15");
			span.text("购买");
		}else{
			a.attr("class","btn btn01 ml15");
			$(a).click(function(){
				buy(bidInfo.F02,bidInfo.F11,bidInfo.F25);
			});
			a.text("购买");
			a.appendTo(span);
		}
	}else{
		a.attr("class","btn btn01 ml15");
		a.attr("href",$("#loginUrl").val());
		a.text("购买");
		a.appendTo(span);
	}
	span.appendTo(td);
	td.appendTo(tr);
	tr.appendTo(table);
}

function subStringLength(str,maxLength,replace){
	if(isEmpty(str)){
		return;
	}
	if(typeof(replace) == "undefined" || isEmpty(replace)){
		replace = "...";
	}
	var rtnStr = "";
	var index = 0;
	var end = Math.min(str.length,maxLength);
	for(; index < end; ++index){
		rtnStr = rtnStr + str.charAt(index);
	}
	if(str.length > maxLength){
		rtnStr = rtnStr + replace;
	}
	return rtnStr;
}

function isEmpty(str){
	if(str == null || str == ""){
		return true;
	}else{
		return false;
	}
}

function formatMoney(s,flg) {
	if(flg == 1){
		if(s > 10000){
			s = s / 10000;
			if(s.toString().indexOf(".") < 0){
				return s.toString() + ".0";
			}
			return s;
		}
	}
    if (/[^0-9\.]/.test(s)){
    	return "0.00";
    }
    if (s == null || s == ""){
    	return "0.00";
    }
    s = s.toString().replace(/^(\d*)$/, "$1.");
    s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
    s = s.replace(".", ",");
    var re = /(\d)(\d{3},)/;  
    while (re.test(s)){
    	s = s.replace(re, "$1,$2");
    }
    s = s.replace(/,(\d\d)$/, ".$1");
    return s;  
}

function formatYearRate(yearRate){
	if(isEmpty(yearRate)){
		return;
	}
	return parseFloat(yearRate * 100).toFixed(2);
}

function getBidChineseName(status){
	var rtnChineseName;
	switch(status){
	   case "HKZ": 
		   	 rtnChineseName = "还款中";
		     break;
	   case "YFB":
		     rtnChineseName = "预发布";
		     break;
	   case "DFK":
		     rtnChineseName = "待放款";
		     break;
	   case "YJQ": 
		     rtnChineseName = "已结清";
		     break;
	   case "YDF": 
		     rtnChineseName = "已垫付";
		     break;
	   default:
		   	 rtnChineseName = "";
		     break;
	   }
	return rtnChineseName;
}

function getOrderKey(key){
	var orderKey;
	switch(key){
	   case "42": 
		     orderKey = "41";
		     break;
	   case "41": 
		     orderKey = "42";
		     break;
	   case "12":
		     orderKey = "11";
		     break;
	   case "11":
		     orderKey = "12";
		     break;
	   case "51":
		     orderKey = "52";
		     break;
	   case "52":
		     orderKey = "51";
		     break;
	   case "62":
		     orderKey = "61";
		     break;
	   case "61":
		     orderKey = "62";
		     break;
	   case "72":
		     orderKey = "71";
		     break;
	   case "71":
		     orderKey = "72";
		     break;
	   default:
		   	 orderKey = "";
		     break;
	   }
	return orderKey;
}

Date.prototype.Format = function(fmt)
{
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}