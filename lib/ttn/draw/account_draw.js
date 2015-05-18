module.exports = function() {
	var type = 3;
	var result={};
	if (type == 0) result= getData0();
	if (type == 1) result= getData1();
	if (type == 2) result= getData2();//多张卡
	if (type == 3) result= getData3();

	result.refundApplyPath="/weChat/mobileClientRefundApply.do"

	return result;
}

function getData0() {
	return {
		"count": 0
	}
}

function getData1() {
	return {
		"fee": 1,
		"count": 1,//

		"withdraw": {
			"bankCardNo": "4380880000000007",
			"bankTypeName": "招商银行",
			"bankType": "CMB",
			"userBalance": 3000.00,
			"realName": "邱君华",
			"status": 4,
			"needBranch": false
		}
	}
}

function getData2() {
	return {
		"fee": 1,
		"count": 2
	}
}

function getData3() {
	var result=getData1();
	result.withdraw.needBranch=true;
	return result;
}