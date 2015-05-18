module.exports=function(req,res){
	return {
		"state":1,	/*状态    	
								1  	实名认证	绑卡状态	支持认证	认证状态		  状态
										0		-		-		-			1		正常（）	
										1		0		-		-			2		正常（实名部分不可更新）
										1		1		0		0			3		异常（提示到PC端操作）
										1		1		1		0			4		正常（实名和银行卡部分不可更新）
										1		1		1		1			5		异常（提示已经通过认证）
										
								异常场景  绑定多张卡							6		异常（提示）
					*/
		"phone": "18*******39",
		"idNO": "21**************13",
		"card": {
			"userId": 12722,
			"bankType": "BOS",
			"bankTypeName": "上海银行",
			"bankCardNo": "6553***********4125",
			"status": 0
		},
		"realName": "邱**"
	}
}