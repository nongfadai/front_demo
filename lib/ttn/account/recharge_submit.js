module.exports=function(req,res){
	/*充值操作有哪些可能的错误*/
	/*
		状态	
		  0 //交易成功

		  1	//交易密码错误

		  2	//快钱充值失败 手机号变更

		  3	//快钱充值失败 余额不足
		  4	//快钱充值失败 其他原因

		  5	//快钱超时
		  6 //其他错误
		  
	*/
	
	
	var state=2;
	var msgMap={
		"0":"",
		"1":"交易密码错误",
		"2":"快钱充值失败 手机号变更"
	}
	var result={
			errorCode:state,
			errorMsg:msgMap[state]
		};


	// setTimeout(function(){
	// 		res.send(JSON.stringify(result));
	// 	},15000);


	// return null;
	return result;
}