!
function() {
	KISSY.use("event, gallery/auth/1.6.1/, gallery/auth/1.6.1/plugin/msgs/, module/validate, gallery/auth/1.6.1/plugin/msgs/style.css",
	function(a, b, c, d, e) {
		var f = new c("#nfd-channel-form-bank");
		f.plug(new d),
		f.register("money", e.validators.money),
		f.register("ge", e.validators.ge),
		f.register("le", e.validators.le),
		f.render()
	})
} ();