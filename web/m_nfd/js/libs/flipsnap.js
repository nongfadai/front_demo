/**
 * flipsnap.js
 *
 * @version  0.6.2
 * @url http://pxgrid.github.com/js-flipsnap/
 *
 * Copyright 2011 PixelGrid, Inc.
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */
(function(e, t, n) {
	function h(e, t) {
		return this instanceof h ? this.init(e, t) : new h(e, t)
	}
	function p(e, t) {
		return e.changedTouches ? e.changedTouches[0][t] : e[t]
	}
	function d(e) {
		return y(e,
		function(e) {
			return r.style[e] !== n
		})
	}
	function v(e, t, r) {
		var o = s[t];
		o ? e[o] = r: e[t] !== n ? (s[t] = t, e[t] = r) : y(i,
		function(i) {
			var o = g(i) + g(t);
			if (e[o] !== n) return s[t] = o,
			e[o] = r,
			!0
		})
	}
	function m(e) {
		if (r.style[e] !== n) return e;
		var t;
		return y(i,
		function(i) {
			var s = g(i) + g(e);
			if (r.style[s] !== n) return t = "-" + i + "-" + e,
			!0
		}),
		t
	}
	function g(e) {
		return e.charAt(0).toUpperCase() + e.substr(1)
	}
	function y(e, t) {
		for (var n = 0,
		r = e.length; n < r; n++) if (t(e[n], n)) return ! 0;
		return ! 1
	}
	function b(e, t, n, r) {
		var i = Math.abs(e - n),
		s = Math.abs(t - r),
		o = Math.sqrt(Math.pow(i, 2) + Math.pow(s, 2));
		return {
			x: i,
			y: s,
			z: o
		}
	}
	function w(e) {
		var t = e.y / e.z,
		n = Math.acos(t);
		return 180 / (Math.PI / n)
	}
	var r = t.createElement("div"),
	i = ["webkit", "moz", "o", "ms"],
	s = {},
	o = h.support = {},
	u = !1,
	a = 5,
	f = 55;
	o.transform3d = d(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]),
	o.transform = d(["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"]),
	o.transition = d(["transitionProperty", "WebkitTransitionProperty", "MozTransitionProperty", "OTransitionProperty", "msTransitionProperty"]),
	o.addEventListener = "addEventListener" in e,
	o.mspointer = e.navigator.msPointerEnabled,
	o.cssAnimation = (o.transform3d || o.transform) && o.transition;
	var l = ["touch", "mouse"],
	c = {
		start: {
			touch: "touchstart",
			mouse: "mousedown"
		},
		move: {
			touch: "touchmove",
			mouse: "mousemove"
		},
		end: {
			touch: "touchend",
			mouse: "mouseup"
		}
	};
	o.addEventListener && (t.addEventListener("gesturestart",
	function() {
		u = !0
	}), t.addEventListener("gestureend",
	function() {
		u = !1
	})),
	h.prototype.init = function(e, r) {
		var i = this;
		i.element = e,
		typeof e == "string" && (i.element = t.querySelector(e));
		if (!i.element) throw new Error("element not found");
		return o.mspointer && (i.element.style.msTouchAction = "pan-y"),
		r = r || {},
		i.distance = r.distance,
		i.maxPoint = r.maxPoint,
		i.disableTouch = r.disableTouch === n ? !1 : r.disableTouch,
		i.disable3d = r.disable3d === n ? !1 : r.disable3d,
		i.transitionDuration = r.transitionDuration === n ? "350ms": r.transitionDuration + "ms",
		i.currentPoint = 0,
		i.currentX = 0,
		i.animation = !1,
		i.use3d = o.transform3d,
		i.disable3d === !0 && (i.use3d = !1),
		o.cssAnimation ? i._setStyle({
			transitionProperty: m("transform"),
			transitionTimingFunction: "cubic-bezier(0,0,0.25,1)",
			transitionDuration: "0ms",
			transform: i._getTranslate(0)
		}) : i._setStyle({
			position: "relative",
			left: "0px"
		}),
		i.refresh(),
		l.forEach(function(e) {
			i.element.addEventListener(c.start[e], i, !1)
		}),
		i
	},
	h.prototype.handleEvent = function(e) {
		var t = this;
		switch (e.type) {
		case c.start.touch:
			t._touchStart(e, "touch");
			break;
		case c.start.mouse:
			t._touchStart(e, "mouse");
			break;
		case c.move.touch:
			t._touchMove(e, "touch");
			break;
		case c.move.mouse:
			t._touchMove(e, "mouse");
			break;
		case c.end.touch:
			t._touchEnd(e, "touch");
			break;
		case c.end.mouse:
			t._touchEnd(e, "mouse");
			break;
		case "click":
			t._click(e)
		}
	},
	h.prototype.refresh = function() {
		var e = this;
		e._maxPoint = e.maxPoint === n ?
		function() {
			var t = e.element.childNodes,
			n = -1,
			r = 0,
			i = t.length,
			s;
			for (; r < i; r++) s = t[r],
			s.nodeType === 1 && n++;
			return n
		} () : e.maxPoint,
		e.distance === n ? e._maxPoint < 0 ? e._distance = 0 : e._distance = e.element.scrollWidth / (e._maxPoint + 1) : e._distance = e.distance,
		e._maxX = -e._distance * e._maxPoint,
		e.moveToPoint()
	},
	h.prototype.hasNext = function() {
		var e = this;
		return e.currentPoint < e._maxPoint
	},
	h.prototype.hasPrev = function() {
		var e = this;
		return e.currentPoint > 0
	},
	h.prototype.toNext = function(e) {
		var t = this;
		if (!t.hasNext()) return;
		t.moveToPoint(t.currentPoint + 1, e)
	},
	h.prototype.toPrev = function(e) {
		var t = this;
		if (!t.hasPrev()) return;
		t.moveToPoint(t.currentPoint - 1, e)
	},
	h.prototype.moveToPoint = function(e, t) {
		var r = this;
		t = t === n ? r.transitionDuration: t + "ms";
		var i = r.currentPoint;
		e === n && (e = r.currentPoint),
		e < 0 ? r.currentPoint = 0 : e > r._maxPoint ? r.currentPoint = r._maxPoint: r.currentPoint = parseInt(e, 10),
		o.cssAnimation ? r._setStyle({
			transitionDuration: t
		}) : r.animation = !0,
		r._setX( - r.currentPoint * r._distance, t),
		i !== r.currentPoint && (r._triggerEvent("fsmoveend", !0, !1), r._triggerEvent("fspointmove", !0, !1))
	},
	h.prototype._setX = function(e, t) {
		var n = this;
		n.currentX = e,
		o.cssAnimation ? n.element.style[s.transform] = n._getTranslate(e) : n.animation ? n._animate(e, t || n.transitionDuration) : n.element.style.left = e + "px"
	},
	h.prototype._touchStart = function(e, n) {
		var r = this;
		if (r.disableTouch || r.scrolling || u) return;
		r.element.addEventListener(c.move[n], r, !1),
		t.addEventListener(c.end[n], r, !1);
		var i = e.target.tagName;
		n === "mouse" && i !== "SELECT" && i !== "INPUT" && i !== "TEXTAREA" && i !== "BUTTON" && e.preventDefault(),
		o.cssAnimation ? r._setStyle({
			transitionDuration: "0ms"
		}) : r.animation = !1,
		r.scrolling = !0,
		r.moveReady = !1,
		r.startPageX = p(e, "pageX"),
		r.startPageY = p(e, "pageY"),
		r.basePageX = r.startPageX,
		r.directionX = 0,
		r.startTime = e.timeStamp,
		r._triggerEvent("fstouchstart", !0, !1)
	},
	h.prototype._touchMove = function(e, t) {
		var n = this;
		if (!n.scrolling || u) return;
		var r = p(e, "pageX"),
		i = p(e, "pageY"),
		s,
		o;
		if (n.moveReady) {
			e.preventDefault(),
			s = r - n.basePageX,
			o = n.currentX + s;
			if (o >= 0 || o < n._maxX) o = Math.round(n.currentX + s / 3);
			n.directionX = s === 0 ? n.directionX: s > 0 ? -1 : 1;
			var l = !n._triggerEvent("fstouchmove", !0, !0, {
				delta: s,
				direction: n.directionX
			});
			l ? n._touchAfter({
				moved: !1,
				originalPoint: n.currentPoint,
				newPoint: n.currentPoint,
				cancelled: !0
			}) : n._setX(o)
		} else {
			var c = b(n.startPageX, n.startPageY, r, i);
			c.z > a && (w(c) > f ? (e.preventDefault(), n.moveReady = !0, n.element.addEventListener("click", n, !0)) : n.scrolling = !1)
		}
		n.basePageX = r
	},
	h.prototype._touchEnd = function(e, n) {
		var r = this;
		r.element.removeEventListener(c.move[n], r, !1),
		t.removeEventListener(c.end[n], r, !1);
		if (!r.scrolling) return;
		var i = -r.currentX / r._distance;
		i = r.directionX > 0 ? Math.ceil(i) : r.directionX < 0 ? Math.floor(i) : Math.round(i),
		i < 0 ? i = 0 : i > r._maxPoint && (i = r._maxPoint),
		r._touchAfter({
			moved: i !== r.currentPoint,
			originalPoint: r.currentPoint,
			newPoint: i,
			cancelled: !1
		}),
		r.moveToPoint(i)
	},
	h.prototype._click = function(e) {
		var t = this;
		e.stopPropagation(),
		e.preventDefault()
	},
	h.prototype._touchAfter = function(e) {
		var t = this;
		t.scrolling = !1,
		t.moveReady = !1,
		setTimeout(function() {
			t.element.removeEventListener("click", t, !0)
		},
		200),
		t._triggerEvent("fstouchend", !0, !1, e)
	},
	h.prototype._setStyle = function(e) {
		var t = this,
		n = t.element.style;
		for (var r in e) v(n, r, e[r])
	},
	h.prototype._animate = function(e, t) {
		var n = this,
		r = n.element,
		i = +(new Date),
		s = parseInt(r.style.left, 10),
		o = e,
		u = parseInt(t, 10),
		a = function(e, t) {
			return - (e /= t) * (e - 2)
		},
		f = setInterval(function() {
			var e = new Date - i,
			t, n;
			e > u ? (clearInterval(f), n = o) : (t = a(e, u), n = t * (o - s) + s),
			r.style.left = n + "px"
		},
		10)
	},
	h.prototype.destroy = function() {
		var e = this;
		l.forEach(function(t) {
			e.element.removeEventListener(c.start[t], e, !1)
		})
	},
	h.prototype._getTranslate = function(e) {
		var t = this;
		return t.use3d ? "translate3d(" + e + "px, 0, 0)": "translate(" + e + "px, 0)"
	},
	h.prototype._triggerEvent = function(e, n, r, i) {
		var s = this,
		o = t.createEvent("Event");
		o.initEvent(e, n, r);
		if (i) for (var u in i) i.hasOwnProperty(u) && (o[u] = i[u]);
		return s.element.dispatchEvent(o)
	},
	typeof exports == "object" ? module.exports = h: typeof define == "function" && define.amd ? define(function() {
		return h
	}) : e.Flipsnap = h
})(window, window.document);