KISSY.add("module/slide",
function(a, b) {
	function c(a) {
		function b() {
			return g ? void setTimeout(b, h) : (f.hasNext() ? f.toNext() : f.moveToPoint(0), void setTimeout(b, h))
		}
		var c = a.getElementsByClassName("ws-flipsnap")[0],
		e = a.getElementsByClassName("ws-nav")[0],
		f = Flipsnap(c, {
			distance: d(a).width(),
			transitionDuration: 350
		}),
		g = (f.maxPoint, !1),
		h = 3e3;
		f.element.addEventListener("fspointmove",
		function() {
			var a = f.currentPoint;
			d(e.children).removeClass("ws-selected"),
			d(e.children[a]).addClass("ws-selected")
		}),
		f.element.addEventListener("fstouchmove",
		function() {
			g = !0
		},
		!1),
		f.element.addEventListener("fstouchend",
		function() {
			setTimeout(function() {
				g = !1
			},
			h / 2)
		},
		!1),
		setTimeout(b, h)
	}
	var d = b.all;
	return c
},
{
	requires: ["node"]
});