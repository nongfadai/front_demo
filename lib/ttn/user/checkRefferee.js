module.exports=function(req,res){	
	/*
	 * 状态 - 信息
	 * 9 - 推荐人为空	
	 * 10 - 推荐人存在，成功
	 * 11 - 推荐人不存在
	 */

	var status = "10";
	var msgMap={		
		"9":"推荐人为空",		
		"10":"推荐人存在，成功",
		"11":"推荐人不存在"
	}
	var result={
			"status" : status,
			"msg" : msgMap[status]
		};
	return result;
}