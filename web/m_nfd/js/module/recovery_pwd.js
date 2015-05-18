!
function() {
	KISSY.use("event, dom, module/user, gallery/auth/1.6.1/, gallery/auth/1.6.1/plugin/msgs/, gallery/auth/1.6.1/plugin/msgs/style.css",
	function(a, b, c, d, e, f, g) {
		b.on("#nfd-submit-btn", "click",
		function() {
			h.test().then(function() {}).fail(function() {
				console.info("failed to login")
			})
		});
		var h = new e("#nfd-recovery-pwd-form");
		h.plug(new f),
		h.register("nfdverify", d.validators.nfdverify),
		h.render()
	})
} ();