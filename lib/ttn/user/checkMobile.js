module.exports=function(req,res){	
	/*
	 * 状态 - 信息
	 * 1 - 成功	
	 * 4 - 手机号重复
	 * 5 - 手机格式不正确
	 * 12 - 手机号为空
	 * other - 手机号验证失败
	 */

	var status = "1";
	var msgMap={		
		"1":"成功",		
		"4":"手机号重复",
		"5":"手机格式不正确",
		"12":"手机号为空",
		"other":"手机号验证失败"
	}
	var result={
			"status" : status,
			"msg" : msgMap[status]
		};
	return result;
}