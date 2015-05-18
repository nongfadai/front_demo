!
function() {
	KISSY.use("event, dom, module/user, gallery/auth/1.6.1/, gallery/auth/1.6.1/plugin/msgs/, gallery/auth/1.6.1/plugin/msgs/style.css",
	function(a, b, c, d, e, f, g) {
		b.on("#nfd-submit-btn", "click",
		function() {
			h.test().then(function() {
				// 如果有原始密码
				if (document.getElementById('pwdOriginal')) {
					var pwdOriginal = document.getElementById('pwdOriginal').value
					document.getElementById('pwdOriginal').value = hex_md5(pwdOriginal)
				}
				// 新密码加密
				var pwdNewFirst = document.getElementById('pwdNewFirst').value
				document.getElementById('pwdNewFirst').value = hex_md5(pwdNewFirst)
				// 确认密码加密
				var pwdNewSecond = document.getElementById('pwdNewSecond').value
				document.getElementById('pwdNewSecond').value = hex_md5(pwdNewSecond)
				// 提交表单
				h.get("target")[0].submit()
			}).fail(function() {
				console.info("failed to login")
			})
		});
		var h = new e("#nfd-edit-personal-form", {
			submitTest: !1
		});
		h.register("nfdpwd", d.validators.nfdpwd),
		h.plug(new f),
		h.render();
	})
} ();