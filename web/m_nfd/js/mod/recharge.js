require.config({
	baseUrl:"/js"
//	paths:{
//		//"db":"db/db_core"
//		"zepto":"../lib/zepto/zepto",
//		"iscroll":"../lib/iscroll/iscroll",
//	},
//	shim:{
//		"zepto":{
//           "exports": "Zepto"
//		},
//		"iscroll":{
//           "exports": "IScroll"
//		},
//	}
});
require(["mod/common"],function(common){
	var submiting=false;	
	var sendingSMSCode=false;
	var flag_gettingVoiceCode=false;//是否已经发送语音验证码  避免用户重复点击

	
	function init(){
		common.init();
		bindEvent();
	}
	
	function next(){
		var radio = $('input[name="radio"]:checked');
		var errormsg = $('#errorMsg');
		var radio_value = radio.val();
		if(typeof(radio_value)=="undefined"){
			errormsg.show();
			return;
		}
		if(radio_value=='0'){//选择使用其他银行卡
			var code = $("#code").val();
			if(!code){
				$("#reg-mobile-voice-code-con1 p").html("验证码为空.");
				$("#reg-mobile-voice-code-con1").show(); 
				return;
			}else{
				var url="/regist/checkChoiceCode.htm";
				var data = {"phone": $("#phone").val(),"code":code};
				$.ajax(/*向后台发起一个请求  致电用户手机  通知语音验证码*/
					{
						url:url,
						type:"post",
						data:data,
						async: false,
						success: function(result){
							if(typeof(result)=="string"){
								try{
									result=JSON.parse(result);
								}catch(e){
									//console.log("解析结果出错",result,e);
									var obj={};
									var num=/'num'\:(\d*)/g.exec(result);
									var msg=/'msg'\:'([^\']*)?'/g.exec(result);
									if(num){
										obj.num=num[1];
									}
									if(msg){
										obj.msg=msg[1];
									}
									result=obj;
								}
							}
							if(result.num=="01"){
								if(radio_value!=0){
									var label = radio.parent();
									var bankcode = label.attr("code");//银行代码
									var banknum = label.attr("banknum");//银行卡号
									$("#bankcode").val(bankcode);
									$("#banknum").val(banknum);
								}else{
									$("#bankcode").val('');
									$("#banknum").val('');
								}
								$("#bind_form").submit();
							}else{
								$("#reg-mobile-voice-code-con1 p").html(result.msg);
								$("#reg-mobile-voice-code-con1").show(); 
								return;
							}
						},
						error:function(){
							$("#reg-mobile-voice-code-con1 p").html("服务器错误，请稍后重试.").show();
							return;
						}
					}
				);
			}
		}else{
			$("#bind_form").submit();
		}
	}

	
	function bindEvent(){
		$("#captcha-code").on("click",verifyCodeClick);
		
		$("#rechargeBtn").click(next);
		$('input[name="radio"]').click(function(){
			$(".msg-wrapper").hide();
		});
		$("#code").click(function(){
			$("#reg-mobile-voice-code-con1").hide();
		});
		
		$("#get_voice_code").on("click",getVoiceCode);
		
	}
	
	
	
	/*语音验证码模块  开始*/
	function showVoiceCode(){/*展示 发送语音验证码提示*/
		$("#reg-mobile-voice-code-con").show();

	}
	
	function getVoiceCode(){
		/*发送一个ajax请求 申请电话验证码*/
		if(flag_gettingVoiceCode){
			return;
		}
		flag_gettingVoiceCode=true;

		function succ(){
			var msg="请注意接听 <i class='voice_code_phone'>400 888 1234</i> 的来电，我们将在电话中告知动态验证码！";
			$("#reg-mobile-voice-code-msg").html(msg);
			$("#reg-mobile-voice-code-con1").hide();/*隐藏掉出错的提示信息*/
			flag_gettingVoiceCode=false;

		}
		
		function succ(){
			var msg="请注意接听 <i class='voice_code_phone'>400 888 1234</i> 的来电，我们将在电话中告知动态验证码！";
			$("#reg-mobile-voice-code-msg").html(msg);
			$("#reg-mobile-voice-code-con1").hide();/*隐藏掉出错的提示信息*/
			flag_gettingVoiceCode=false;

		}
		
		function fail(){
			var msg="服务器错误，请稍后重试！";
			$("#reg-mobile-voice-code-msg").html(msg);
			$("#reg-mobile-voice-code-con1").hide();/*隐藏掉出错的提示信息*/

		}
		
		
		var url="/regist/voiceSend.htm";
		var data = {"phone": $("#phone").val(),"type":"h5cc"};
		$.ajax(/*向后台发起一个请求  致电用户手机  通知语音验证码*/
			{
				url:url,
				type:"post",
				data:data,
				success: succ,
				error:fail
			}
		);
		
		//succ();
		//fail();

	}
	/*语音验证码模块 结束*/
	
	
	function tip(dom,flag,errorMsg){
		errorMsg=errorMsg||"服务器错误，请稍后重试"
		//console.log("show tip",dom,flag,errorMsg);
		var errorCon=dom.parent().next();
		var errorDom=errorCon.children("p");
		//console.log("errorDom",errorDom);
		if(flag){
			//console.log("hide");
			errorCon.hide();/*隐藏错误提示信息*/
		}
		else{
			////console.log("show",errorDom[0]);
			//errorDom[0].innerHTML=errorMsg;
			$(errorDom).html(errorMsg);/*展示错误提示信息*/
			////console.log("show end");
			errorCon.show();/**/
		}
		//console.log("where is the error");

	}
	
	function sendSMSCode(cb){
		sendingSMSCode=true;
		//console.log("sendSMSCode");
		var errorMsg="";
		var send_result=false;
		$.ajax({
			type: "post",
			url: "/regist/send.htm", // 发送手机验证码请求
			data: {"phone": $("#phone").val(),"type":"h5cc"},
			success: function(result){/*发送验证码成功*/
				if(typeof(result)=="string"){
					try{
						result=JSON.parse(result);
					}catch(e){
						//console.log("解析结果出错",result,e);
						var obj={};
						var num=/'num'\:(\d*)/g.exec(result);
						var msg=/'msg'\:'([^\']*)?'/g.exec(result);
						//console.log("num:",num[1]);
						//console.log("msg:",msg[1]);
						if(num){
							obj.num=num[1];
						}
						if(msg){
							obj.msg=msg[1];
						}
						result=obj;
					}
				}
				if(result.num=="01"){
					send_result=true;
					//console.log("发送短信验证码结果 ",result.msg);
				}
				if(typeof(cb)=="function"){
					cb(send_result,result.msg);
				}
				showVoiceCode();
			},
			error:function(){/*发送验证码失败*/
				//console.log("发送短信验证码失败");
				errorMsg="发送验证码失败，请稍后再试";
				cb(send_result,errorMsg);
				showVoiceCode();
			}
		});
		//count=1000;
		//countDown();
	}
	
	var count=60;
	function countDown(){
		if(count>0){
			setTimeout(function(){
				count--;
				$("#captcha-code").addClass("wait").html("请等待" + count + "秒...");
				countDown();
			},1000)
			return;
		}
		else{
			/*循环结束*/
			//countdown();
			$("#captcha-code").removeClass("wait").html("获取验证码");
			sendingSMSCode=false;/*可以重发验证码了*/
		}
	}
	
	function sendSMSCodeBack(result,errorMsg){
		//console.log("sendSMSBack",result,errorMsg);
		if(result){
			count=60;
			countDown();
		}else{
			tip($("#code"),result,errorMsg);
		}
	}
	
	function verifyCodeClick(){/*验证码点击事件处理*/
		/*首先要校验手机号是否为有效的手机号*/
		/*然后要校验该手机号是否已经注册*/
		if(sendingSMSCode){/*如果已经在发送SMScode了*/
			return;
		}
		else{
			sendSMSCode(sendSMSCodeBack);/*发送短信验证码*/	
		}
	}
	
	init();/*首页模块初始化*/
});


