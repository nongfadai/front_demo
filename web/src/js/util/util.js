define([],function(){
	function _exports(){
		var util={};
		util.formatCountDown=formatCountDown;
		util.formatTime=formatTime;
		util.milliFormat=milliFormat;
		return util;
	}
	
	
	function formatCountDown(time){
		var days_second = 86400; // 一天的秒数
		var hours_second = days_second / 24;
		var minute_second = hours_second / 60;
		var str = "";
		if (time >= 0) {
			var days = parseInt(time / days_second);
			str += (days > 0) ? days + "天": "";
			var hours = parseInt((time - days * days_second) / hours_second);
			str += hours > 0 ? hours + "时" : (days>0 ? "0时" : "");
			var minutes = parseInt((time - days * days_second - hours_second * hours) / minute_second);
			str += minutes > 0 ? minutes + "分" : (days>0 || hours>0 ? "0分" : "");
			second = time - days * days_second - hours_second * hours - minutes * minute_second;
			str += second + "秒";					
		}
		return str;
	};
	/*
	 * 格式化当前时间
	 * 默认fmt为：yyyy-MM-dd HH:mm:ss 如2015-01-09 12:00:00
	 * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
     * 可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg:
     * (new Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
	 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04    
	 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04    
	 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
	 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
	*/ 
	function formatTime(time,fmt){
		if(/-/g.test(""+time)){
			time = (""+time).replace(/-/g, "/");
		}
		var dt=new Date(time);
		if(!fmt){
			fmt = "yyyy-MM-dd HH:mm:ss";	
		}
		var o = {         
			"M+" : dt.getMonth()<9?"0"+(dt.getMonth()+1):dt.getMonth()+1, //月份         
			"d+" : dt.getDate()<10?"0"+dt.getDate():dt.getDate(), //日         
			"h+" : dt.getHours()%12 === 0 ? 12 : dt.getHours()%12, //小时         
			"H+" : dt.getHours()<10?"0"+dt.getHours():dt.getHours(), //小时         
			"m+" : dt.getMinutes()<10?"0"+dt.getMinutes():dt.getMinutes(), //分         
			"s+" : dt.getSeconds()<10?"0"+dt.getSeconds():dt.getSeconds(), //秒         
			"q+" : Math.floor((dt.getMonth()+3)/3), //季度         
			"S" :dt.getMilliseconds()<10?"0"+dt.getMilliseconds():dt.getMilliseconds() //毫秒         
		};         
		var week = {         
			"0" : "/u65e5",         
			"1" : "/u4e00",         
			"2" : "/u4e8c",         
			"3" : "/u4e09",      
			"4" : "/u56db",         
			"5" : "/u4e94",         
			"6" : "/u516d" 
		};         
		if(/(y+)/.test(fmt)){       
			fmt=fmt.replace(RegExp.$1, (dt.getFullYear()+"").substr(4 - RegExp.$1.length));         
		}         
		if(/(E+)/.test(fmt)){         
			fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[dt.getDay()+""]);         
		} 
		for(var k in o){    
			if(new RegExp("("+ k +")").test(fmt)){         
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
			}         
		}   
		return fmt;
	};
	/*
	 * 进度处理方法,保持为整数
	*/
	function formatProgress(amount,hasInvestAmount){
		amount = parseFloat((""+amount).replace(/,/g,""));
		hasInvestAmount = parseFloat((""+hasInvestAmount).replace(/,/g,""));
		if(!amount || !hasInvestAmount){ return "0"; }
		var progress = (hasInvestAmount/amount)*100;
		if(progress>0 && progress<1){
			progress = 1;
		} else if(progress>99 && progress<100){
			progress = 99;
		} else {
			progress = Math.floor(progress);
		}
		return progress;
	};
	/*
	 * 添加千位符
	*/
	function milliFormat(s,dp){//添加千位符,dp不为false时，默认保留两位小数 
		if(/,/g.test(s)){
			 return s; 
		}
		s = ""+s;
		if(dp===false){
			//不做小数点处理
			var re = /(-?\d+)(\d{3})/;
			while (re.test(s)) {
				s = s.replace(re, "$1,$2");
			}
			return s;
		} else {
			//保留两位小数
			s=s.replace(/^(\d*)$/,"$1.");
			s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
			s=s.replace(".",",");
			var re=/(\d)(\d{3},)/;
			while(re.test(s))
			s=s.replace(re,"$1,$2");
			s=s.replace(/,(\d\d)$/,".$1");
			s=s.replace(/^\./,"0.");
			//后两位小数为00时,忽略保留为整数,除非dp===true
			if(dp===true){
				return s;	
			} else {
				var arr= s.split(".");
				s = arr[1]=="00" ? arr[0] : s;
			}
			return s;
		}
	};
	
	
	return _exports();
})