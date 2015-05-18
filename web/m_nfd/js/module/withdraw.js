!
function() {
	KISSY.use("event, dom, overlay, gallery/auth/1.6.1/, gallery/auth/1.6.1/plugin/msgs/, module/validate, module/formatter, gallery/auth/1.6.1/plugin/msgs/style.css",
	function(a, b, c, d, e, f, g, h) {
		function j() {
			var a = c.val("#amount"),
			d = c.val("#code");
			// k.set("content", ['<div class="nfd-dialog-c">', '<div class="prompt">', "<table><tbody>", '<tr><td class="rightAlign"><label>提现金额</label></td><td><strong class="money">', h.formatmoney(a), "</strong>", "<span>元</span></td></tr>", '<tr><td class="rightAlign"><label>提现费用</label></td><td><strong>1.00</strong><span>元</span></td></tr>', '<tr><td class="rightAlign"><label>实际扣除金额</label></td><td><strong>', h.formatmoney( + a + 1), "</strong><span>元</span></td></tr>", '<tr><td class="rightAlign"><label>预计到账日期</label></td><td><span>T+1个工作日(T日21:00之前申请)</span></td></tr>', '<tr><td class="tip" colspan="2">提示：提现费用将从您账户余额扣除</td></tr>', "</tbody></table></div>", '<div class="bottons">', '<a id="ok" class="done button" href="##?amount=', a, "&mobileCode=", d, '" >确定</a>&nbsp&nbsp&nbsp&nbsp<a id="cancel" class="failed button" href="javascript:void(0);">取消</a>', "</div>", "</div>"].join("")),
			k.set("content", [
				'<div class="nfd-dialog-c">', 
					'<div class="prompt">', 
						"<table><tbody>", 
						'<tr><td class="rightAlign"><label>提现金额：</label></td><td><span class="money red">', h.formatmoney(a), '</span>', '<span class="secondary font-12">元</span></td></tr>', 
						'<tr><td class="rightAlign"><label>手续费：</label></td><td><span class="money">1.00</span><span class="secondary font-12">元</span></td></tr>', 
						'<tr><td class="rightAlign"><label>实际到账金额：</label></td><td><span class="money">', h.formatmoney(+a + 1), '</span><span class="secondary font-12">元</span></td></tr>', 
						'<tr><td class="rightAlign"><label>累计到账日期：</label></td><td><span class="money">T+1个工作日<span class="secondary font-12">(T日17:00前申请)</span></span></td></tr>', 
						'</tbody></table>', 
					'</div>', 
					'<div class="btn">', 
						'<a id="ok" class="done btn-primary margin-right" href="##?amount=', a, '&mobileCode=', d, '">确定</a>', 
						'<a id="cancel" class="failed btn-primary" href="javascript:void(0);">取消</a>', 
					'</div>', 
				'</div>'
			].join("")),
			b.on("#cancel", "click",
			function() {
				k.hide()
			}),
			l.test().then(function() {
				k.show()
			}).fail(function() {})
		}
		b.on("#nfd-withdraw-form .withdraw-btn", "click", j), 
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
		});
		var k = new d.Dialog({
			id: "nfd-bind-card-dailog",
			headerContent: "",
			bodyContent: "",
			mask: !0,
			align: {
				points: ["cc", "cc"]
			}
		});
		k.render();
		var l = new e("#nfd-withdraw-form", {
			submitTest: !1
		});
		l.plug(new f),
		l.register("money", g.validators.money),
		l.register("le", g.validators.le),
		l.register("ge", g.validators.ge),
		l.render()
	})
} ();