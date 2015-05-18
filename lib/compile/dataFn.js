module.exports = function(type) {
	var result={};
	if(type=="index1"){
		result=getData1();
	}
	else if(type=="index2"){
		result=getData2();
	}
	else if(type=="send1"){
		result=getData3();
	}
	else if(type=="send2"){
		result=getData4();
	}
	else if(type=="send3"){
		result=getData5();
	}
	else if(type=="send4"){
		result=getData6();
	}
	//var result = getData1();
	//var result = getData2();

	//var result = getData3();
	//var result = getData4();
	//var result = getData5();
	//var result = getData6();

	//var result=getDataRegisterOk();

	result.styleLocation = "/weixin/resources";

	return result;
}

function getDataRegisterOk(){
	return {
		styleLocation: "/weixin/resources",
		cashBonusReceive: {
			amount: "22",
		},
		cashBonusSend1: {
			amount1: "121",
		},
	}
}

function getData1() { /*1  用户查看自己红包的领取情况  有红包可发*/
	return {
		flag: 1,
		userid: 123,
		totalAmt: 100,
		amount: 100,
		balance: 30,
		styleLocation: "/weixin/resources",
		receiptList: [{
			mobile: "150****1234",
			amount: "20",
			receiveTimeStr: "01-01 11:20"
		}]
	}
}


function getData2() { /*2  用户查看自己红包的领取情况  无红包可发*/
	return {
		flag: 0,
		userid: 123,
		totalAmt: 100,
		amount: 100,
		balance: 30,
		styleLocation: "/weixin/resources",
		receiptList: [{
			mobile: "150****1234",
			amount: "20",
			receiveTimeStr: "01-01 11:20"
		}]
	}
}


function getData3() { /*3  抢红包  正常*/
	return {
		flag: 1,
		userid: 123,
		totalAmt: 100,
		amount: 100,
		sendamount:20,
		balance: 30,
		styleLocation: "/weixin/resources",
		receiptList: [{
			mobile: "150****1234",
			amount: "20",
			receiveTimeStr: "01-01 11:20"
		}]
	}
}

function getData4() { /*4  抢红包  已经抢过了*/
	return {
		flag: 3,
		userid: 123,
		totalAmt: 100,
		amount: 100,
		balance: 30,
		username:"abcdef",
		receiveamount :"21",
		getmoneyurl:"http://www.baidu.com",
		styleLocation: "/weixin/resources",
		receiptList: [{
			mobile: "150****1234",
			amount: "20",
			receiveTimeStr: "01-01 11:20"
		}]
	}
}


function getData5() { /*5  抢红包  来晚了  红包已经抢完*/
	return {
		flag: 0,
		userid: 123,
		totalAmt: 100,
		amount: 100,
		balance: 30,
		styleLocation: "/weixin/resources",
		receiptList: [{
			mobile: "150****1234",
			amount: "20",
			receiveTimeStr: "01-01 11:20"
		}]
	}
}


function getData6() { /*6  抢红包  只能新用户参加*/
	return {
		flag: 2,
		userid: 123,
		totalAmt: 100,
		amount: 100,
		balance: 30,
		styleLocation: "/weixin/resources",
		receiptList: [{
			mobile: "150****1234",
			amount: "20",
			receiveTimeStr: "01-01 11:20"
		}]
	}
}