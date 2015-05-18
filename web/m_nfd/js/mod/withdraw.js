// JavaScript Document
require.config({
	baseUrl: "/js"
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
require(["mod/common"], function(common) {
	function old() {
		var wait = 60;
		var isSendCode = true;
		var min = g_withdraw_min;
		var max = g_withdraw_max;
		window.onload = function() {
				$("#nfd-withdraw-c input").focus(function() {
					var msg_wrapper = $(this).parent().find("div");
					if (msg_wrapper.css("display") == 'block') {
						msg_wrapper.hide();
					}
					if ($("#allErrMsg").css("display") == 'block') {
						$("#allErrMsg").hide();
					}
				});
			}
			/**
			 * 获取短信验证码
			 */
		function getSmsCode(object) {
				if (isSendCode) {
					var amount_val = $("#amount");
					var txpwd_val = $("#txpwd");
					if (!amount_val.val()) {
						amount_val.parent().find(".msg-wrapper").html("<p class=\"auth-msg auth-error\">提现金额不能为空.</p>").show();
						return false;
					}
					/*if(!txpwd_val.val()){
						txpwd_val.parent().find(".msg-wrapper").html("<p class=\"auth-msg auth-error\">交易密码不能为空.</p>").show();
						return false;
					} */
					var data3 = {
						"type": "h5tx",
						"emil": "",
						"phone": $("#phone").val()
					};
					$.ajax({
						type: "post",
						dataType: "html",
						url: "/regist/send.htm",
						data: data3,
						success: function(data) {
							isSendCode = false;
							var ct = eval('(' + data + ')');
							if (ct[0].num == 1) { //成功
								sendclick6();
							} else { //失败
								var objectMsg = $(object).parent().find(".msg-wrapper");
								objectMsg.html('<p class="auth-msg auth-error">' + ct[0].msg + '</p>');
								objectMsg.show();
							}
							showVoiceCode();
						},
						error:function(){
							showVoiceCode();
						}
					});
				}
			}
			/**
			 * 倒计时60秒
			 */

		function sendclick6() {
			var cap = $("#nfd-mobile-code");
			if (wait == 0) {
				isSendCode = true;
				cap.text("获取验证码");
				cap.removeClass("wait");
				wait = 60;
			} else {
				cap.addClass("wait");
				cap.text("已发送(" + wait + ")");
				wait--;
				setTimeout(function() {
					sendclick6();
				}, 1000);
			}
		}

		function tx() {
			if (validate()) {
				var jypwd = $("#nfd-withdraw-c #txpwd");
				var cardId = $("#nfd-withdraw-c #cardId");
				var amount = $("#nfd-withdraw-c #amount");
				var code = $("#nfd-withdraw-c #code");
				//$("#nfd-withdraw-form-s #withdrawPsd").val(hex_md5(jypwd.val()));
				$("#nfd-withdraw-form-s #cardId").val(cardId.val());
				$("#nfd-withdraw-form-s #amount").val(amount.val());
				$("#nfd-withdraw-form-s #code").val(code.val());
				$("#nfd-withdraw-form-s").submit();
			}
		}

		function validate() {
			var validate = true;
			$("#nfd-withdraw-c input")
				.each(
					function() {
						var formInput = $(this);
						var formInputValue = formInput.val();
						if (typeof(formInput.attr("placeholder")) != "undefined") {
							var msg_wrapper = formInput.parent().find(
								".msg-wrapper");
							var errMsg = "";
							var id = formInput.attr("id");
							if (!formInputValue) {
								errMsg = formInput.attr("required-msg");
							} else {
								if (id == "amount") {
									if (parseFloat(formInputValue) < parseFloat(min) || parseFloat(formInputValue) > parseFloat(max)) {
										errMsg = "提现金额不能低于" + min + "元，且不能高于" + max / 10000 + "万元";
									}
								} else if (id == "code" && formInputValue.length != 6) {
									errMsg = "验证码长度有误";
								}
							}
							if (errMsg) {
								msg_wrapper
									.html('<p class="auth-msg auth-error">' + errMsg + '.</p>');
								msg_wrapper.show();
								validate = false;
								return validate;
							}
						}
					});
			return validate;
		}

	}


	function init() {
		common.init();
		old();


	}


		
	/*语音验证码模块  开始*/
	function showVoiceCode(){/*展示 发送语音验证码提示*/
		$("#reg-mobile-voice-code-con").show();

	}
	
	function getVoiceCode(){
		/*发送一个ajax请求*/
		function succ(){
			var msg="请注意接听 <i class='voice_code_phone'>400 888 1234</i> 的来电，我们将在电话中告知动态验证码！";
			$("#reg-mobile-voice-code-msg").html(msg);
			$("#reg-mobile-voice-code-con1,#nfd-mobile-code~.msg-wrapper").hide();/*隐藏掉出错的提示信息*/

		}
		
		function fail(){
			var msg="服务器错误，请稍后重试！";
			$("#reg-mobile-voice-code-msg").html(msg);
			$("#reg-mobile-voice-code-con1,#nfd-mobile-code~.msg-wrapper").hide();/*隐藏掉出错的提示信息*/
		}
		
		
		var url="/";
		var data={};
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


	init(); /*首页模块初始化*/
});