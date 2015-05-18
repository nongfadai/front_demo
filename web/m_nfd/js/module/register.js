!
function() {
	var passCheckName=false;
	var passCheckPhone = false;
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
					"phone": c.val("#mobile"),"type":"band"
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
		var l = !1;
		b.on("#reg-pwd-toggle", "click",
		function() {
			if (!l) {
				document.getElementById('password').setAttribute('type', 'text');
				c.removeClass("#reg-pwd-toggle", 'input-pwd-toggle')
				c.addClass("#reg-pwd-toggle", 'input-pwd-toggle-show')
			} else {
				document.getElementById('password').setAttribute('type', 'password');
				c.removeClass("#reg-pwd-toggle", 'input-pwd-toggle-show')
				c.addClass("#reg-pwd-toggle", 'input-pwd-toggle')
			}
			l = !l
		}),
		b.on("#accountName", "blur",
		function() {
			new d({
				type: "post",
				url: "/checkNameExists.htm", // 发送请求验证用户名是否存在
				data: {accountName: document.getElementById('accountName').value}
			}).then(function(o) {
				var jsonData = JSON.parse(o[0])
				if (jsonData.data == 'true') {
					c.removeClass('#reg-name-exit-msg', 'hide')
					document.getElementById('accountName').focus()
					document.getElementById('accountName').select();
					passCheckName = false
				} else {
					c.addClass('#reg-name-exit-msg', 'hide')
					passCheckName = true
				}
			},
			function(a) {
				c.removeClass('#reg-name-exit-msg', 'hide')
			})
		}),
		b.on("#mobile", "blur",
		function() {
			new d({
				type: "post",
				url: "/regist/check.htm", // 发送请求验证手机是否已经注册
                data: {evencheck: 'phone', value: document.getElementById('mobile').value}
			}).then(function(o) {
				var jsonData = JSON.parse(o[0])
				if (jsonData.data == 'true') {
					document.getElementById('mobile').focus()
					document.getElementById('mobile').select();
					c.removeClass('#reg-mobile-exit-msg', 'hide')
					passCheckPhone=false;
				} else {
					c.addClass('#reg-mobile-exit-msg', 'hide')
					passCheckPhone=true;
				}
			},
			function(a) {
				c.removeClass('#reg-mobile-exit-msg', 'hide')
			})
		}),
		b.on("#nfd-submit-btn", "click",
		function() {
			m.test().then(function() {
				var password = document.getElementById('password').value
				document.getElementById('password').value = hex_md5(password)
				if(passCheckName && passCheckPhone){
					m.get("target")[0].submit()	
				}
				
			}).fail(function() {
				console.info("failed")
			})
		});
		var m = new g("#nfd-user-reg-form", {
			submitTest: !1
		});
		m.plug(new h),
		m.register("nfduser", f.validators.nfduser),
		m.register("nfdpwd", f.validators.nfdpwd),
		m.register("cnmobile", f.validators.cnmobile),
		m.register("nfdcode", f.validators.nfdcode),
		m.render()
	})
} ();