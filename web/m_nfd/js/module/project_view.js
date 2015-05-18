!
function() {
	KISSY.use("event, uri, io, dom, overlay, gallery/simpleCountDown/1.0.1/index, gallery/auth/1.6.1/, gallery/auth/1.6.1/plugin/msgs/, gallery/auth/1.6.1/plugin/msgs/style.css",
	function(a, b, c, d, e, f, g, h, i) {
		function j(b) {
			var b = b || "detail";
			e.removeClass(a.get(".nfd-tab .hd .selected"), "selected"),
			e.addClass(".nfd-tab .hd ." + b, "selected"),
			e.removeClass(a.get(".nfd-tab .bd .selected"), "selected"),
			e.addClass(".nfd-tab .bd ." + b, "selected")
		}
		function k(a) {
			var b = a === !0 ? e.show: e.hide,
			c = a !== !0 ? e.show: e.hide;
			c(".invest-btn-c"),
			b(".invest"),
			b(".invest-mask"),
			b(".invest-spacing")
		}
		function l(a, b) {
			return this.msg("error") || this.msg("error", "需大于等于" + b),
			parseFloat(a) >= parseFloat(b) ? !0 : !1
		}
		function m(a, b) {
			return this.msg("error") || this.msg("error", "需小于等于" + b),
			parseFloat(a) <= parseFloat(b) ? !0 : !1
		}
		function r(a, b) {
			return this.msg("error") || this.msg("error", "您的投标金额大于标的剩余金额" + b),
			parseFloat(a) <= parseFloat(b) ? !0 : !1
		}
		function s(a, b) {
			var aa = document.getElementById('availableAmount').value;

			return this.msg("error") || this.msg("error", "剩余可投金额不能小于" + b),
			((parseFloat(a) < parseFloat(aa) && parseFloat(aa) - parseFloat(a) >= b) || parseFloat(a) == parseFloat(aa)) ? !0 : !1
		}
		function t(b) {
			return this.msg("error") || this.msg("error", "您有逾期未还的贷款，还完才能进行投标操作"),
			document.getElementById('overdueLoans').value == 'N' ? !0 : !1
		}
		b.on(".nfd-tab .hd a", "click",
		function() {
			j(e.attr(this, "data-tab"))
		}),
		b.on(".invest-btn", "click",
		function() {
			k(!0)
		}),
		b.on(".invest-mask", "click",
		function() {
			k(!1)
		}),
		b.on(".invest-all-btn", "click",
		function() {
			var a = parseFloat(e.attr(e.get(this), "data-max-bid"), 10);
			var b = parseFloat(document.getElementById('availableAmount').value, 10);
			var c = a >= b ? b : (b - a < 100 ? b - 100 : a);
			e.val(".invest input#amount", c.toFixed(2))
		});
		var p = new h("#nfd-invest-form");
		p.plug(new i),
		p.register("odl", t),
		p.register("ge", l),
		p.register("le", m),
		p.register("leaa", r),
		p.register("geia", s),
		p.render(),
		b.on("#nfd-invest-btn", "click",
		function() {
			p.test().then(function() {}).fail(function() {})
		}),
		a.get(".invest-btn-c") && e.hide("#nfd-footer");
		var q = new f.Dialog({
			id: "nfd-bind-card-dailog",
			headerContent: "",
			bodyContent: "",
			mask: !0,
			align: {
				points: ["cc", "cc"]
			}
		});
		q.render(),
		b.on("#openpnr", "click",
		function() {
			q.set("content", ['<div class="nfd-dialog-c">', '<a class="done button" href="project/', e.val("#projectId"), '" >已开通</a><a class="failed button" target="_blank" href="#">遇到问题</a>', "</div>"].join("")),
			q.show()
		})
	})
} ();