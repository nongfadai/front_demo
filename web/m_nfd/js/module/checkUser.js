/**
 * 验证用户js wulong 2015-4-25
 */
$(function(){
	$("#accountName").focus(function(){
		var msg_wrapper = $("#accountName").parent().find("div");
		if(msg_wrapper.css("display") == 'block'){
			msg_wrapper.hide();
		}
	});
});

var ckUser = {
		/**
		 * 判断输入的值进行验证和请求后台
		 */
		judgmentValue:function(){
			var accountName = $("#accountName");
			var accountNameValue = accountName.val();
			if(accountNameValue){
				$.ajax({
					type:"post",
					dataType:"json",
					url:"/checkUser.htm",
					data: {"accountName":accountNameValue},
					success:function(data){
						var con = data[0];
						if(con.msg == "success"){
							  var phone = con.content;
							  var accountId = con.accountId;
							  window.location.href = basepath+"resetPassWord.htm?phone="+phone+"&accountId="+accountId;
						}else{
							accountName.focus();
							accountName.select();
							accountName.parent().find(".msg-wrapper").html('<p class="auth-msg auth-error">根据用户名/邮箱/手机号码,未查询到相关用户.</p>').show();
						}
					},error:function(){
						alert("异常");
					}
				});
			}else{
				accountName.focus();
				accountName.select();
				accountName.parent().find(".msg-wrapper").html('<p class="auth-msg auth-error">用户名不能为空.</p>').show();
			}
		}
}

