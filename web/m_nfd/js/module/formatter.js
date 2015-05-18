KISSY.add("module/formatter",
function() {
	var a = function() {};
	return a.formatmoney = function(a) {
		for (s = a + "", dh = /,/; dh.test(s);) s = s.replace(dh, "");
		if (isNaN(s)) return ! 1;
		s = s.replace(/^(\d*)$/, "$1."),
		s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1"),
		s = s.replace(".", ",");
		for (var b = /(\d)(\d{3},)/; b.test(s);) s = s.replace(b, "$1,$2");
		return s = s.replace(/,(\d\d)$/, ".$1"),
		s.replace(/^\./, "0.")
	},
	a
});