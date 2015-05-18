KISSY.add("module/validate",
function(a) {
	var b = function() {};
	return b.validators = {
		ge: function(a, b) {
			return this.msg("error") || this.msg("error", "需大于等于" + b),
			parseFloat(a) >= parseFloat(b) ? !0 : !1
		},
		gt: function(a, b) {
			return this.msg("error") || this.msg("error", "需大于" + b),
			parseFloat(a) > parseFloat(b) ? !0 : !1
		},
		le: function(a, b) {
			return this.msg("error") || this.msg("error", "需小于等于" + b),
			parseFloat(a) <= parseFloat(b) ? !0 : !1
		},
		lt: function(a, b) {
			return this.msg("error") || this.msg("error", "需小于等于" + b),
			parseFloat(a) < parseFloat(b) ? !0 : !1
		},
		eq: function(a, b) {
			return this.msg("error") || this.msg("error", "必须等于" + b),
			parseFloat(a) == parseFloat(b) ? !0 : !1
		},
		money: function(b) {
			return this.msg("error") || this.msg("error", "充值金额不能为零且为整数"),
			/^([1-9]\d*)$/.test(a.trim(b))
		},
		cnmobile: function(b) {
			return this.msg("error") || this.msg("error", "手机号格式错误"),
			/^[1]\d{10}$/.test(a.trim(b))
		}
	},
	b
},
{
	requires: ["io"]
});