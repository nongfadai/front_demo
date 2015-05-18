/**
 * 个人中心修改密码
 */
var staticData = {"pwdOriginal":"原始密码不可为空","pwdNewFirst":"密码不能为空，区分大小写，6~20个字符","pwdNewSecond":"密码不能为空，区分大小写，6~20个字符"}
$(function(){
	$("#nfd-edit-personal-form input").focus(function(){
		var msgWrapper = $(this).parent().find(".msg-wrapper");
		msgWrapper.html("");
		msgWrapper.hide();
	});
});
var editLp={
		/**
		 * 异步修改密码
		 */
		updatePassword:function(){
			if(editLp.validate()){
				var oldPsw = $("#pwdOriginal");
				var newPsw = $("#pwdNewFirst");
				var confPsw = $("#pwdNewSecond");
				var data={"old":hex_md5(oldPsw.val()),"new":hex_md5(newPsw.val()),"news":hex_md5(confPsw.val())};
				$.ajax({
					type:"post",
					dataType:"html",
					url:basepath+"user/account/updatePassword.htm",
					data:data,
					success:function(data){
						if(data){
							var ct = eval('('+data+')');
							if(ct.length>0 && ct[0].num == 3){
								editLp.showError(newPsw,ct[0].msg);
								return false;
							}
							if(ct.length>0 && ct[0].num == 2){
								editLp.showError(oldPsw,ct[0].msg);
								return false;
							}
							if(ct.length>0 && ct[0].num == 4){
								editLp.showError(confPsw,ct[0].msg);
								return false;
							}
							if(ct.length>0 && ct[0].num == 1){
								window.location.href = basepath+"user/account/update_login_pwd_success.html";
							}
						}
					}
				});
			}
		},
		/**
		 * 验证
		 */
		validate:function(){
			var isValidate = true;
			var nfdFormInput = $("#nfd-edit-personal-form input");
			nfdFormInput.each(function(){
				var input = $(this);
				var id = input.attr("id");
				var value = input.val();
				var msgWrapper = input.parent().find(".msg-wrapper");
				if(!value){
					msgWrapper.html('<p class="auth-msg auth-error">'+staticData[id]+'.</p>');
					msgWrapper.show();
					isValidate = false;
					return false;
				}else{
					if(id == "pwdNewFirst" || id == "pwdNewSecond"){
						var passWordLen = value.length;
						if(!(passWordLen>5 && passWordLen <21)){
							msgWrapper.html('<p class="auth-msg auth-error">密码长度为6~20个字符.</p>');
							msgWrapper.show();
							isValidate = false;
							return false;
						}else if(id == "pwdNewSecond"){
							if(($("#pwdNewFirst").val()!=value)){
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
			return isValidate;
		},
		/**
		 * 显示错误信息
		 */
		showError:function(target,msg){
			var msgWra = target.parent().find(".msg-wrapper");
			msgWra.html('<p class="auth-msg auth-error">'+msg+'.</p>');
			msgWra.show();
		}
}