!
function() {
	KISSY.use("event, dom, overlay, uri, io, module/user, module/validate, gallery/auth/1.6.1/, gallery/auth/1.6.1/plugin/msgs/, gallery/auth/1.6.1/plugin/msgs/style.css",
	function(a, b, c, d, e, f, g, h, i, j) {
		b.on("#bankName", "click",
		function() {
			if(window.refreshScroll){
				window.refreshScroll();
			}
			return c.toggle("#banks"),
			!1
		}),
		b.on("#banks .rechargebank", "click",
		function() {
			var a = c.attr(this, "data-bank-id"),
			b = c.attr(this, "data-bank-name");
			return c.val("#bankCode", a),
			c.val("#bankName", b),
			c.toggle("#banks"),
			c.addClass('#select-bank-name .msg-wrapper', 'hide'),
			!1
		});
		var l = !1;
		b.on("#transaction-pwd-toggle", "click",
		function() {
			if (!l) {
				document.getElementById('transactionPwd').setAttribute('type', 'text');
				c.removeClass("#transaction-pwd-toggle", 'input-pwd-toggle')
				c.addClass("#transaction-pwd-toggle", 'input-pwd-toggle-show')
			} else {
				document.getElementById('transactionPwd').setAttribute('type', 'password');
				c.removeClass("#transaction-pwd-toggle", 'input-pwd-toggle-show')
				c.addClass("#transaction-pwd-toggle", 'input-pwd-toggle')
			}
			l = !l
		}),
		b.on("#nfd-mobile-code", "click",
		function() {
			var b, d = 60,
			e = 0,
			f = function() {
				if (0 == e) a.IO.get("#"), // 手机验证码
				c.attr("#nfd-mobile-code", "disabled", !0),
				c.addClass("#nfd-mobile-code", "wait"),
				e++,
				f();
				else {
					if (e == d) return c.text("#nfd-mobile-code", "重新发送"),
					c.attr("#nfd-mobile-code", "disabled", !1),
					c.removeClass("#nfd-mobile-code", "wait"),
					clearTimeout(b),
					void(e = 0);
					c.text("#nfd-mobile-code", "已发送(" + (d - e) + ")"),
					b = setTimeout(function() {
						f()
					},
					1e3),
					e++
				}
			};
			f()
		}), 
		b.on("#add-bank", "click",
		function() {
			k.test().then(function() {
				var transactionPwd = document.getElementById('transactionPwd').value
				document.getElementById('transactionPwd').value = hex_md5(transactionPwd)
				k.get("target")[0].submit()
			}).fail(function() {
				console.info("failed")
			})
		});
		var k = new i("#nfd-channel-form-bank", {
			submitTest: !1
		});
		k.plug(new j),
		k.register("nfdrealname", g.validators.nfdrealname),
		k.register("cnidcard", g.validators.cnidcard),
		k.register("nfdpwd", g.validators.nfdpwd),
		k.register("money", h.validators.money),
		k.register("ge", h.validators.ge),
		k.register("le", h.validators.le),
		k.register("number",
		function(a, b) {
			return b ? /\d+/.test(a) : !0
		}),
		k.render()
	})
} ();