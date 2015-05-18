module.exports=function(req,res){	
	/*
	 * 状态 - 信息
	 * 1 - 验证码发送成功	 
	 * 4 - 手机号重复
	 * 5 - 手机格式不正确
	 * 12 - 手机号为空
	 * 16 - 获取短信验证码失败,请刷新页面后重试!
	 * 17 - 发送验证码失败
	 * other - 手机验证码发送失败
	 */

	var status = "1";
	var msgMap={
		"1":"验证码发送成功",
		"4":"手机号重复",
		"5":"手机格式不正确",
		"12":"手机号为空",
		"16":"获取短信验证码失败,请刷新页面后重试！",
		"17":"发送验证码失败"
	}
	var result={
			"status" : status,
			"msg" : msgMap[status]
		};
	return result;
}