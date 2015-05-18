!
function() {
	KISSY.use("event, dom, io",
	function(a, b, c, d) {
		var e = 10, //skip， 从第10条开始取
		f = 10; //take， 每次取10条
		b.on("#nfd-projects .more", "click",
		function() {
			var a = c.text(this),
			b = this;
			c.text(this, "加载中..."),
			new d({
				type: "get",
				url: "#", //加载更多项目列表
				data: {
					skip: e,
					take: f
				}
			}).then(function(d) {
				d[0] ? (c.append(c.create(d[0]).getElementById('nfd-projects-bd'), "#nfd-projects .bd"), e += f, c.text(b, a)) : c.hide(b)
			},
			function() {
				alert("加载项目列表异常，请重试！"),
				c.text(b, "加载中...")
			})
		})
	})
} ();