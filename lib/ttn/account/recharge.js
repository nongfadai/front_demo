module.exports=function(req,res){
	/*充值前获取用户状态信息  判断用户能力*/
	/*
		绑卡状态		绑卡是否具备鉴权能力	鉴权状态		交易密码		状态	
		  0				-						-					-	 		1	//未绑卡
		  1				0						-					-			2	//已经绑卡  不具备鉴权能力
		  1             1						0					-			3	//已经绑卡   能鉴权    未完成鉴权
		  1				1						1					0			4	//已经绑卡   能鉴权    已完成鉴权  未设置交易密码
		  1				1						1					1			5	//已经绑卡   能鉴权	已完成鉴权  已设置交易密码
		  
		特殊场景
			绑定了多张卡														6	//绑定了多张卡【提示用户PC操作】
	*/
	
	
	var state="";
	
	var result=getData0();
	result.responseType=state;
	
	
	result={
		"responseType":"",
		"userId": 12722,
		"bankType": "BOS",
		"bankTypeName": "上海银行",
		"bankCardNo": "6553***********4125",
		"status":0,
		"balance":"546,3423.00"
	};
	
	return result;
	
	
	
}
function data(num){
	 var fun=eval("getData"+num);
	 return fun();
}
function getData0(){
	var result={
		//"responseType": "-2",
		
		//flag 都是前端希望得到的数据  
		"flag_login":false,//是否已经登录
		
		
		"flag1_bank_bind":false,//是否已经绑卡
		"flag2_bank_can_auth":false,//是否银行卡类型能够进行绑卡操作
		"flag3_auth_pass":false,//是否已经开通鉴权
		"flag4_deal_pw_set":false,//是否已经设置交易密码
		"flag5_many_card":false,//是否有多张卡片
		
		"responseType":1,
		"userId": null,//用户id
		"bankType": null,//用户银行卡类型
		"bankTypeName": null,//用户银行卡名称
		"bankCardNo": null,//用户银行卡卡号
		"status": 0,//状态
		"balance": null,//用户资金余额
		"errorCode": null,//出错信息,如果出错信息不为null 不为0 不为undefined 则出错了
		"errorDetails": null,
		"__last":null//最后一个属性参数
	}
	return result;
}
function getData1(){
	var result=getData0();
	return result;
}

function getData2(){
	var result=getData1();
	result.flag1_bank_bind=true;//已经绑卡
	return result;
}
function getData3(){
	var result=getData2();
	result.flag2_bank_can_auth=true;//已经绑卡
	return result;
}
function getData4(){
	var result=getData3();
	result.flag3_auth_pass=true;//已经绑卡
	return result;
}
function getData5(){
	var result=getData4();
	result.flag4_deal_pw_set=true;//已经绑卡
	return result;
}
function getData6(){
	var result=getData0();
	result.flag5_many_card=true;//已经绑卡
	return result;
}