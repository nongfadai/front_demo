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
	var passCheckName=false;
	var passCheckPhone = false;
	var submiting=false;	
	var sendingSMSCode=false;
	var flag_gettingVoiceCode=false;//是否已经发送语音验证码  避免用户重复点击
		
	function init(){
		common.init();
		initBanner();
		bindEvent();
		

	}
	
	function initBanner(){
		//banner
		var bullets,bannerLength;	
		bullets = document.getElementById('banner_btn').getElementsByTagName('span');
		bannerLength=bullets.length>2?true:false;
		
		window.mySwipe = Swipe(document.getElementById("nfd-slide"),{
			auto:3000,
			continuous:true,
			stopPropagation:false,
			callback:function(pos){
				 var on=document.getElementsByClassName("ws-selected");
				 if(on.length){
					 on[0].className="";
				 }
				 pos=bannerLength?pos:pos%2;
				 bullets[pos].className = 'ws-selected';
			}
		});
		//$("#nfd-slide").find("img").show();
	}
	
	function bindEvent(){
		//console.log("bindEvent");
		$("input").on("focus",function(){//任何输入框激活都隐藏掉验证码错误提示
				$("#verifyCode_error").hide();
				tip($(this),true);/*把错误信息隐藏掉*/
				resetBtn();//恢复注册按钮
			});
			
		$("#nfd-contract-btn").click(showProtocol);
		$("#back_register").click(hideProtocol);
		//$("#nfd-submit-btn").click(doSubmit);
		$(document).on("click","#nfd-submit-btn",doSubmit);
		
		$("#accountName").on("blur",validateUser);
		$("#password").on("blur",validatePw);
		$("#mobile").on("blur",validateMobile);
		$("#captcha-code").on("click",verifyCodeClick);
		
		
		var l = !1;
		$("#reg-pwd-toggle").on("click",
			function() {
				if (!l) {
					document.getElementById('password').setAttribute('type', 'text');
					$("#reg-pwd-toggle").removeClass('input-pwd-toggle').addClass('input-pwd-toggle-show');
				} else {
					document.getElementById('password').setAttribute('type', 'password');
					$("#reg-pwd-toggle").removeClass('input-pwd-toggle-show').addClass('input-pwd-toggle');
				}
				l = !l
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
			var msg="请注意接听 <i class='voice_code_phone'>0755-21671435</i> 的来电，我们将在电话中告知动态验证码！";
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
		var data = {"phone": $("#mobile").val(),"type":"band"};
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
			setTimeout(function(){
				errorCon.show();/*错误提示框的显示 要异步 否则会影响提交按钮的位置，造成未能触发点击事件*/
			},200);
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
			data: {"phone": $("#mobile").val(),"type":"band"},
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
			validateMobile(null,function(flag,msg){
				if(flag){
					sendSMSCode(sendSMSCodeBack);/*发送短信验证码*/
					
				}
				else{/*如果手机号码验证失败*/
					tip($("#mobile"),flag,msg);
				}
			})
		}
	}
	
	
	function validate(){/*执行所有校验*/
		
	}
	
	function validateUser(e,cb){/*校验用户*/
		//console.log("validateUser");
		var validate_result=false;
		passCheckName=false;
		
		var errorMsg="";
		var dom=$("#accountName");
		var value=$("#accountName").val();
		//console.log("accountName",value);
		if(!value){/*如果账户名为空*/
			errorMsg="请输入用户名";
			tip(dom,validate_result,errorMsg);
			cb&&cb(validate_result,errorMsg);

		}
		else{
			if(!/^[a-zA-Z]([\w]{5,17})$/i.test(value)){
				/*如果6-18位的校验规则通不过*/
				errorMsg="6-18个字符，可使用字母、数字、下划线，需以字母开头";
				tip(dom,validate_result,errorMsg);
				cb&&cb(validate_result,errorMsg);
			}
			else{
				$.ajax({type: "post",
					url: "/checkNameExists.htm", // 发送请求验证用户名是否存在
					data: {accountName:value},
					success:function(result){
						if(typeof(result)=="string"){
							result=JSON.parse(result);
						}
						//console.log("check result:",result.data);
						if(result.data=="true"){/*返回结果为true 代表用户名已存在*/
							errorMsg="用户名已存在，请输入其他用户名";
						}
						else{
							passCheckName=true;/*名字校验通过*/
							validate_result=true;
						}
						tip(dom,validate_result,errorMsg);
						cb&&cb(validate_result,errorMsg);
	
					},
					error:function(){
						errorMsg="服务器异常，检查用户名出错";
						tip(dom,validate_result,errorMsg);
						cb&&cb(validate_result,errorMsg);
					}
				});
			}
		}
	}
	
	
	function validateMobile(e,cb){/*校验手机号*///验证手机号码
		//console.log("校验手机号码");
		var dom=$("#mobile");
		var value=dom.val();
		var validate_result=false;
		var errorMsg="";
		passCheckPhone=false;

		var phoneReg = /(^[1][3][0-9]{9}$)|(^[1][4][0-9]{9}$)|(^[1][5][0-9]{9}$)|(^[1][8][0-9]{9}|17[0-9]{9}$)/;
		if(value==""){
			errorMsg="请输入11位手机号码";
			tip(dom,validate_result,errorMsg);
			//tip(phoneDom,result,"请输入13、14、15、18或17开头的11位手机号码);
			if(typeof(cb)=="function"){
				cb(validate_result,errorMsg);
			}
			return;
		}
		
		if(!phoneReg.test(value)){
			errorMsg="请输入有效的11位手机号码";
			tip(dom,validate_result,errorMsg);
			//tip(phoneDom,result,"请输入13、14、15、18或17开头的11位手机号码);
			if(typeof(cb)=="function"){
				cb(validate_result,errorMsg);
			}
			return;
		}
		else{
			$.ajax({
				type: "post",
				url: "/regist/check.htm", // 发送请求验证手机是否已经注册
				data: {evencheck: 'phone', value: value},
				success : function(result){
					//验证手机号码的ajax未返回结果时，不允许提交
					//console.log("check mobile result",result);
					if(typeof(result)=="string"){
						result=JSON.parse(result);
					}
					if(result.data=="true"){/*该手机号码已经注册*/
						errorMsg="手机号码已经存在";
					}
					else{
						validate_result=true;
						passCheckPhone=true;/*手机号码校验通过*/
					}
					tip(dom,validate_result,errorMsg);
					
					//console.log("validate_result",validate_result);
					if(typeof(cb)=="function"){
						cb(validate_result,errorMsg);
					}
				},
				error : function(){
					errorMsg="服务器异常，检查手机号出错";
					tip(dom,validate_result,errorMsg);
				}
			});
		}
	}
	
	function validatePw(){/*校验密码*/
		//console.log("validatePassword");
		var result=false;
		var dom=$("#password");
		var errorMsg="";
		var value=dom.val();
		
		//console.log("password",value);
		if(!value){/*如果账户名为空*/
			errorMsg="请输入密码";
		}
		else if(value.length<6||value.length>20){
			errorMsg="6~20个字符，区分大小写";
		}
		else{
			result=true;/*校验通过*/
		}
		tip(dom,result,errorMsg);
		return result;
	}
	function validateVerifyCode(){
		//console.log("validate verify code");
		var result=false;
		var dom=$("#code");
		var errorMsg="";
		var value=dom.val();
		
		//console.log("password",value);
		if(!value){/*如果账户名为空*/
			errorMsg="请输入验证码";
		}
		else{
			result=true;/*校验通过*/
		}
		tip(dom,result,errorMsg);
		return result;
	}
	
	function validateProtocol(){
		var result=false;
		var dom=$("#nfd-contract-agree");
		var errorMsg="";
		var value=dom.prop("checked");
		
		//alert("checked:"+value);
		//console.log("protocol",value);
		if(!value){/*如果账户名为空*/
			errorMsg="请同意用户协议";
		}
		else{
			result=true;/*校验通过*/
		}
		tip(dom,result,errorMsg);
		return result;
	}
	
	function resetBtn(){
		$("#nfd-submit-btn").removeClass("disable").html("注册");
	}
	
	function submitError(){
		$("#nfd-submit-btn").addClass("disable").html("注册信息填写有误");
	}
	
	function doSubmit(){/*执行表单提交事件*/
		if(submiting){
			return;
		}
		var errorMsg="";

		if($("#mobile").val()==""){
			errorMsg="请输入11位手机号";
			tip($("#mobile"),false,errorMsg);
			
			submitError();
			return;
		}
		if(!validatePw()){
			submitError();
			return;
		}
		if(!validateVerifyCode()){
			submitError();
			return;
		}
		if(!validateProtocol()){
			submitError();
			return;
		}
		
		validateMobile(null,function(checkMobileResult){
			if(checkMobileResult){
				submitForm();
			}
			else{
				submitError();
			}
		})
		
		//}
		////console.log("doSubmit");
	}
	
	function submitForm(){
		if(submiting){
			return;
		}
		else{
			submiting=true;
			//console.log("submitForm");
			var password = document.getElementById('password').value;
			document.getElementById('password').value = hex_md5(password);
			//if(passCheckName && passCheckPhone){
			$("#nfd-submit-btn").html("注册中...");
			document.getElementById("nfd-user-reg-form").submit();	
		}
	}


	function showProtocol(){
		$("#nfd-user-reg-form-c").hide();
		$("#Contract").show();
		$("#back_register").show();
		$("#nfd-footer").hide();
	}
	
	function hideProtocol(){
		$("#nfd-user-reg-form-c").show();
		$("#Contract").hide();
		$("#back_register").hide();
		$("#nfd-footer").show();
	}
	
	init();/*首页模块初始化*/
});