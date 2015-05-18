!
function() {
	KISSY.use("event, dom, io, uri, module/user, gallery/auth/1.6.1/, gallery/auth/1.6.1/plugin/msgs/, gallery/auth/1.6.1/plugin/msgs/style.css",
	function(a, b, c, d, e, f, g, h) {
		function n() {
			return 0 >= count ? (count = k, c.text("#captcha-code", "重新获取验证码"), void c.removeClass("#captcha-code", "wait")) : (c.text("#captcha-code", "请等待" + count + "秒..."), count--, i && clearTimeout(i), void(i = setTimeout(function() {
				n()
			},
			1e3)))
		}
		var i, j = 0,
		k = count = 60;
		b.on("#captcha-code", "click",
		function() {
			m.test("mobile").then(function() {
				var a = (new Date).getTime();
				1e3 * k > a - j || f.sendBindMobileCode({
					mobile: c.val("#mobile")
				}).then(function() {
					j = a,
					c.addClass("#captcha-code", "wait"),
					n()
				},
				function(a) {
					var b = a[2] && a[2].responseText;
					alert(b || "发送验证码失败，请联系客服！")
				})
			},
			function() {})
		});
		b.on("#mobile", "blur",
		function() {
			new d({
				type: "post",
				url: "#", // 发送请求验证手机是否已经注册
				data: {evencheck: "phone", mobile: document.getElementById('mobile').value}
			}).then(function(o) {
				if (o[0] == 'false') {
					c.removeClass('#reset-pwd-mobile-not-exit-msg', 'hide')
				} else {
					c.addClass('#reset-pwd-mobile-not-exit-msg', 'hide')
				}
			},
			function(a) {
				c.removeClass('#reset-pwd-mobile-not-exit-msg', 'hide')
			})
		}),
		b.on("#nfd-submit-btn", "click",
		function() {
			m.test().then(function() {
				var pwdNewFirst = document.getElementById('pwdNewFirst').value
				var pwdNewSecond = document.getElementById('pwdNewSecond').value
				document.getElementById('pwdNewFirst').value = hex_md5(pwdNewFirst)
				document.getElementById('pwdNewSecond').value = hex_md5(pwdNewSecond)
				m.get("target")[0].submit()
			}).fail(function() {
				console.info("failed")
			})
		});
		var m = new g("#nfd-reset-pwd-form", {
			submitTest: !1
		});
		m.plug(new h),
		m.register("cnmobile", f.validators.cnmobile),
		m.register("nfdpwd", f.validators.nfdpwd),
		m.render()
	})
} ();