!
function() {
	KISSY.use("event, dom, uri, module/user, gallery/auth/1.6.1/,gallery/auth/1.6.1/plugin/msgs/,gallery/auth/1.6.1/plugin/msgs/style.css",
	function(a, b, c, d, e, f, g) {
		function h() {
			return 0 >= count ? (count = k, c.text("#captcha-code", "重新获取验证码"), void c.removeClass("#captcha-code", "wait")) : (c.text("#captcha-code", "请等待" + count + "秒..."), count--, i && clearTimeout(i), void(i = setTimeout(function() {
				h()
			},
			1e3)))
		}
		var i, j = 0,
		k = count = 60;
		b.on("#captcha-code", "click",
		function() {
			l.test("mobile").then(function() {
				var a = (new Date).getTime();
				1e3 * k > a - j || e.sendBindMobileCode({
					mobile: c.val("#mobile")
				}).then(function() {
					j = a,
					c.addClass("#captcha-code", "wait"),
					h()
				},
				function(a) {
					var b = a[2] && a[2].responseText;
					alert(b || "发送验证码失败，请联系客服！")
				})
			},
			function() {})
		}),
		b.on("#nfd-submit-btn", "click",
		function() {
			l.test().then(function() {
				l.get("target")[0].submit()
			}).fail(function() {
				console.info("failed")
			})
		});
		var l = new f("#nfd-user-reg-form", {
			submitTest: !1
		});
		l.plug(new g),
		l.register("cnmobile", e.validators.cnmobile),
		l.render()
	})
} ();