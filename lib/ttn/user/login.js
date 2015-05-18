module.exports=function(req,res){
	/*
	 * 状态 - 信息
	 * 0 - 成功
	 * 1 - 验证码为空
	 * 2 - 验证码错误
	 * 3 - 用户名为空
	 * 4 - 密码为空
	 * 5 - 用户名或密码错误
	 * 6 - 用户名被禁用
	 * -1 - 系统忙,请稍候再试
	 */

	var status = "-1";
	var msgMap={
		"0":"成功",	
		"1":"验证码为空",
		"2":"验证码错误",
		"3":"用户名为空",
		"4":"密码为空",
		"5":"用户名或密码错误",
		"6":"用户名被禁用",
		"-1":"系统忙，请稍候再试"
	}
	var result={
			"status" : status,
			"msg" : msgMap[status]
		};
	return result;
}