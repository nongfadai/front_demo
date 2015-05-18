/**
 * 重置密码js
 */
var staticData = {"code":"验证码不可为空","passwordFirst":"密码不能为空，区分大小写，6~20个字符","passwordSecond":"密码不能为空，区分大小写，6~20个字符"}
$(function(){
	$("#nfd-reset-pass-word-form input").focus(function(){
		var msgWrapper = $(this).parent().find(".msg-wrapper");
		msgWrapper.html("");
		msgWrapper.hide();
	});
});
var resetPw = {
		wait:60,
		rg:/(\d{3})\d{4}(\d{4})/,
		rpPhoneResult:"$1****$2",
		cbRpPhoneResult:function(){
			var mobile = document.getElementById("phone");
			var mobileValue = mobile.value;
			if(mobileValue){
				mobile.value = mobileValue.replace(resetPw.rg,resetPw.rpPhoneResult);
			}
		},
		/**
		 * 获取短信验证码
		 */
		getSmsCode:function(object){
			var phone = $("#phoneNumber");
			$("#otpSuccess").text("");
			var data3={"phone":phone.val()};
			$.ajax({
				type:"post",
				dataType:"html",
				url:"/password/sendCode.htm",
				data:data3,
				success:function(data){
					var ct = eval('('+data+')');
					if(ct[0].num==1){//成功
						resetPw.sendclick6();
					}else{//失败
						var objectMsg = $(object).parent().find(".msg-wrapper");
						objectMsg.html('<p class="auth-msg auth-error">'+ct[0].msg+'</p>');
						objectMsg.show();
					}
				}
			});
		},
		/**
		 * 倒计时60秒
		 */
		sendclick6:function(){
			var cap = $("#captcha-code");
			if (resetPw.wait == 0) {
				cap.text("获取验证码");
				cap.removeClass("wait");
				cap.attr("style","width:100px");
				cap.attr("onclick","resetPw.getSmsCode()");
				resetPw.wait = 60;
			} else {
				cap.attr("style","width:125px");
				cap.addClass("wait");
				cap.text(resetPw.wait+"秒后可重新获取");
				cap.attr("onclick","");
				resetPw.wait--;
				setTimeout(function() {
					resetPw.sendclick6();
				},
				1000);
			}
		},
		/**
		 * 提交
		 */
		submitPassWord:function(){
			if(resetPw.validate()){
				$("#nfd-reset-pass-word-form").submit();
			}
		},
		/**
		 * 验证
		 * @returns {Boolean}
		 */
		validate:function(){
			var formInput = $("#nfd-reset-pass-word-form input");
			var isValidate = true;
			formInput.each(function(){
				var id = $(this).attr("id");
				var value = $(this).val();
				var msgWrapper = $(this).parent().find(".msg-wrapper");
				if(!value && typeof(staticData[id])!="undefined"){
					msgWrapper.html('<p class="auth-msg auth-error">'+staticData[id]+'.</p>');
					msgWrapper.show();
					isValidate = false;
					return false;
				}else{
					if(id=="code"){
						if(value.length!=6){
							msgWrapper.html('<p class="auth-msg auth-error">验证码长度必须是6位.</p>');
							msgWrapper.show();
							isValidate = false;
							return false;
						}else{
							msgWrapper.hide();
						}
					}else if(id=="passwordFirst"||id=="passwordSecond"){
						var passWordLen = value.length;
						if(!(passWordLen>5 && passWordLen <21)){
							msgWrapper.html('<p class="auth-msg auth-error">密码长度为6~20个字符.</p>');
							msgWrapper.show();
							isValidate = false;
							return false;
						}else if(id=="passwordSecond"){
							if(($("#passwordFirst").val()!=value)){
								msgWrapper.html('<p class="auth-msg auth-error">您两次输入的密码不一致.</p>');
								msgWrapper.show();
								isValidate = false;
								return false;
							}else{
								msgWrapper.hide();
							}
						}else{
							msgWrapper.hide();
						}
					}
				}
			});
			$("#passwordSecondMd5").val(hex_md5($("#passwordFirst").val()));
			$("#passwordFirstMd5").val(hex_md5($("#passwordSecond").val()));
			return isValidate;
		}
}
resetPw.cbRpPhoneResult();