$(function() {
	var $container = $("#container");
	//请求数据URL
	var requestData = {
		tpl: "tpl/wx_account_draw.tpl",
		data: "/weixin/account/withdraw",
		provicecode: "/weixin/account/withdraw/provicecode/", //GET省份编码查询城市信息
		citycode: "/weixin/account/withdraw/citycode/", //GET(citycode传入城市编码,banktype传入银行类型)
		nextEven: "/weixin/account/withdraw/updatebranchinfo"
	};
	//弹出层数据
	var popData = {
		province:{
			selector:null,
			scrollTop:0
		},
		city:{
			selector:null,
			scrollTop:0
		},
		branch:{
			selector:null,
			scrollTop:0
		}
	}
	var btnTimer = null;
	var drawSubTip = null;
	//初始化
	function init() {
		//请求模板和数据，并调用回调
		$.render({
			tpl: [requestData.tpl],
			data: requestData.data
		}, drawCallback);
	}
	init();

	//页面回调
	function drawCallback(data, html) {
		$container.html(html);
		bindEvents();
		drawSubTip = $("#drawSub");
	}

	var wording = {};
	wording.deal_pw_err = "请输入6位以上的交易密码";

	function check_deal_pw() { //校验交易密码,不允许小于6位数字
		var val = $("#wx_deal_pw").val();
		if (val.length < 6) {
			$("#wx_deal_pw_tip").addClass("err").html(wording.deal_pw_err).show();
			return false;
		} else {
			return true;
		}
	}
	//弹出框操作事件
	function popDialog(popTitle,popContent,cb) {
		var content = "";
		if(!popContent){
			content = '<div class="wx_loading" style="margin-bottom:20px;"></div>';	
		} else {
			content = popContent;
		}
		$.dialog(content, {
			type: "select",
			height:300,
			title: {
				name: popTitle,
				closeText: "完成"
			}
		}, function(mask,dialog) {
			if(popContent!==null){
				popDialogCb(mask,dialog);
			}
			if($.type(cb)==="function"){
				cb(mask,dialog);	
			};
		});
	}
	//弹出层回调
	function popDialogCb(mask,dialog,data){
		//编辑信息时，隐藏提示
		drawSubTip.hide();
		
		//列表选择事件
		$(dialog).on("click","li", function() {
			$(this).addClass("cur").siblings().removeClass("cur");
			var target = $(dialog).find("ul").data("target");
			var id = $(this).data("id");
			var name = $(this).data("name");
			$(document.getElementById(target)).data("id",id).val(name);
			
			//记录状态
			popData[target].selector = $(this).index();
			popData[target].scrollTop = $(dialog).find("#dialogContent").scrollTop();
			if(popData[target].selector!==null){
				//弹出省份时，允许选择城市
				if(target=="province"){
					$("#city").removeClass("input-select-disabled").data("id","").val("选择开户城市");
					$("#branch").addClass("input-select-disabled").data("id","").val("选择开户行");
					popData["city"].selector = null;
					popData["city"].scrollTop = 0;
					popData["branch"].selector = null;
					popData["branch"].scrollTop = 0;
				} else if(target=="city"){
					$("#branch").removeClass("input-select-disabled").data("id","").val("选择开户行");
					popData["branch"].selector = null;
					popData["branch"].scrollTop = 0;
				}
			}
		});
		
		
	}
	//获取市和开户行
	function getCityBank(type, url, mask,dialog) {
		$.ajax({
			type: "get",
			url: url+"?"+new Date().getTime(),
			dataType:"json",
			success: function(data) {
				//检测是否有登录
				$.checkLogin(data);
				//拼合数据
				var dataLen = data.data.length;
				var popContent = "<div class='dialog-nodata'>没有数据</div>";
				if(dataLen>0){
					var popContent = "<ul data-target='"+type+"'>";
					for (var i = 0; i < data.data.length; i++) {
						if (type == "city") {
							popContent += "<li data-id='"+data.data[i].cityCode+"' data-name='"+data.data[i].cityName+"'><span class='l'><em></em></span><span class='r'>"+data.data[i].cityName+"</span></li>";
						} else if(type=="branch") {
							var branchName = data.data[i].branchName.replace(/\中国银行股份有限公司|\中国人民银行|\中国银行/g,"");
							popContent += "<li data-id='"+data.data[i].branchName+"' data-name='"+branchName+"'><span class='l'><em></em></span><span class='r'>"+branchName+"</span></li>";
						}
					}
					popContent += "</ul>";
				}
				//写入dialog content,并调用回调
				$(dialog).find("#dialogContent").html(popContent);
				popDialogCb(mask,dialog);
				//初始化初始值
				var target = $(dialog).find("ul").data("target");
				if(popData[target].selector!==null){
					$(dialog).find("li").eq(popData[target].selector).addClass("cur");
					$(dialog).find("#dialogContent").scrollTop(popData[target].scrollTop);
					//弹出城市，允许选择分行
					if(type=="city"){
						$("#branch").removeClass("input-select-disabled");
					}
				}
				
			},
			error: function(jqXHR, textStatus, errorThrown) {
				$("#drawSub").css("display", "block").html("网络或系统繁忙，请稍后再试！");
			}
		});
	}
		//绑定事件
	function bindEvents() {
		//选择开户行省、市、行
		$container.on("click", "#province", function() {
			var $this = $(this);
			if($this.hasClass("input-select-disabled")){
				return;	
			}
			//省份及直辖市
			var province = [
				[1,"北京"],
				[2,"上海"],
				[3,"天津"],
				[4,"重庆"],
				[5,"河北"],
				[6,"山西"],
				[7,"内蒙古"],
				[8,"辽宁"],
				[9,"吉林"],
				[10,"黑龙江"],
				[11,"江苏"],
				[12,"浙江"],
				[13,"安徽"],
				[14,"福建"],
				[15,"江西"],
				[16,"山东"],
				[17,"河南"],
				[18,"湖北"],
				[19,"湖南"],
				[20,"广东"],
				[21,"广西"],
				[22,"海南"],
				[23,"四川"],
				[24,"贵州"],
				[25,"云南"],
				[26,"西藏"],
				[27,"陕西"],
				[28,"甘肃"],
				[29,"宁夏"],
				[30,"青海"],
				[31,"新疆区"]
			];
			var popContent = "<ul data-target='province'>";
			for(var i=0; i<province.length; i++){
				popContent += "<li data-id='"+province[i][0]+"' data-name='"+province[i][1]+"'><span class='l'><em></em></span><span class='r'>"+province[i][1]+"</span></li>";
			};
			popContent +="</ul>";
			popDialog("选择开户省份",popContent,function(mask,dialog){
				//初始化选择
				var target = $(dialog).find("ul").data("target");
				if(popData[target].selector!==null){
					$(dialog).find("li").eq(popData[target].selector).addClass("cur");
					$(dialog).find("#dialogContent").scrollTop(popData[target].scrollTop);
					//弹出省份时，允许选择城市
					$("#city").removeClass("input-select-disabled");
				}
			});
		});
		//选择开户城市
		$container.on("click","#city",function(){
			if($(this).hasClass("input-select-disabled")){
				return;
			}
			popDialog("选择开户城市",null,function(mask,dialog){
				var url = requestData.provicecode + $("#province").attr("data-id");
				getCityBank("city",url,mask,dialog);
			});			
		});
		//选择开户行
		$container.on("click","#branch",function(){
			if($(this).hasClass("input-select-disabled")){
				return;	
			}
			popDialog("选择开户支行",null,function(mask,dialog){
				var city = $("#city");
				var citycode = city.data("id");
				var banktype = city.data("type");
				var url = requestData.citycode + citycode + "/banktype/" + banktype;
				getCityBank("branch",url,mask,dialog);
			});
		});
		
		//开户行信息提交
		$(".wx_draw").delegate(".wx-draw-sub", "click", function() {
			var $this = $(this);
			var province = $("#province").attr("data-id");
			var cityCode = $("#city").attr("data-id");
			var branchCode = $("#branch").attr("data-id");
			var drawSubTip = $("#drawSub");
			
			if (province == "" || cityCode == "" || branchCode == "") {
				drawSubTip.css("display", "block").html("请完善开户行资料");
				return false;
			}
			//倒计时
			$this.html('正在保存(<ins left_time_int="30">30</ins>)').addClass("wx_btn_disabled");
			btnTimer = $this.find("ins").countdown("left_time_int", function(timer) {
				$this.removeClass("wx_btn_disabled").html("下一步");
				btnTimer = null;
			});
			$.ajax({
				type: "post",
				url: requestData.nextEven,
				data: {
					"provinceCode": province,
					"provinceName": $("#province").val(),
					"cityCode": cityCode,
					"cityName": $("#city").val(),
					"branchCode": branchCode,
					"branchName": branchCode
				},
				dataType:"json",
				beforeSend: function(){
					drawSubTip.hide();
				},
				success: function(data) {
					$.checkLogin(data);
					if (btnTimer) {
						clearInterval(btnTimer);
						$this.removeClass("wx_btn_disabled").html("下一步");
					}
					if (data.status == 1) {
						//成功
						window.location.reload();
					} else {
						drawSubTip.css("display", "block").html(data.errorDetails);
						return false;
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					drawSubTip.css("display", "block").html("网络或系统繁忙，请稍后再试！");
				}
			});
			return false;
		});
		
		//输入金额控制
		var amountReg = /^[1-9]\d*(?:\.\d{0,2})?$/;
		var poTo = function(tmp) {
			$(".ttn-draw-monry p.un i").addClass("err").html(tmp);
		}
		var monery = function(toval) {
			var un = $(".wx_account_table2_body p.toun i").attr("data-un");
			var shouUn = $(".wx_account_table2_body p.shouun i").attr("data-un");
			if (toval == "") {
				poTo("提现金额不能为空");
				return false;
			} else {
				if (!/^[1-9]\d*(?:\.\d{0,2})?$/.test(toval)) {
					poTo("请输入正确的提现金额，必须为大于0的数字 ");
					return false;
				} else {
					if (toval * 1 > (un * 1 - shouUn * 1)) {
						poTo("提现金额不能大于[可用余额 - 手续费]");
						return false;
					} else {
						$(".ttn-draw-monry p.un i").removeClass("err").html("提现金额不能大于[可用余额 - 手续费]");
					}
				}
			}
			if ($("input.password").val() == "") {
				$(".ttn-draw-monry p.pwd i").addClass("err").html("请输入提现密码!").show();
				return false;
			} else {
				$(".ttn-draw-monry p.pwd i").removeClass("err").html("").hide();
			}
			return true;
		}
		$("input.monery").on("keyup", function() {
			var $th = $(this);
			//小数点控制
			this.value = this.value.replace(/[^\.\d]/g, '');
			if (this.value == '') {
				this.value2 = '';
				return;
			}
			if (this.value == this.value2) {
				return;
			}
			if (!amountReg.test(this.value)) {
				//小数点不是最后一位
				if (this.value.indexOf('.') != this.value.length - 1) {
					this.value = (this.value2) ? this.value2 : '';
					return;
				} else {
					//小数点若是最后一位则让用户继续输入
				}
			}
			if (this.value.indexOf('0') == 0 && this.value.indexOf('.') != 1 && this.value != '0') {
				this.value = "";
				return;
			} else {
				this.value2 = this.value;
			}
		});
		//回到我的账户中心倒计时
		if ($("#drawIndex").length > 0) {
			var $th = $("#drawIndex");
			$th.html('返回账户总览(<ins left_time_int="5">5</ins>)');
			btnTimer = $th.find("ins").countdown("left_time_int", function(timer) {
				btnTimer = null;
				location.href = account.html";
			});

		}

		//确认提现
		var subPo = function(tmp) {
			$("#drawSub").css("display", "block").html(tmp);
		}
		
		function subPo_ajax(){
			$.render({//重新从后台拉取数据
				tpl: [requestData.tpl],
				data: requestData.data
			}, function(data,html){
				$("#nameId").attr("data-name",data["ooh.token.name"]);
				$("#nameId").attr("data-val",data["ooh.token.value"]);
			});
		}
		
		$(".wx_draw").delegate(".sub-ok", "click", function() {
			if($(this).hasClass("wx_btn_disabled")){
				return false;	
			}
			var dealSum = $(".wx_account_input_box input.monery").val();
			if (!monery(dealSum)) {
				return false;
			}
			var dealSum = $(".wx_account_input_box input.monery").val();
			if (!monery(dealSum)) {
				return false;
			}
			if (!check_deal_pw()) {
				return false;
			}
			
			var $th = $(this);
			$th.html('正在验证(<ins left_time_int="30">30</ins>)').addClass("wx_btn_disabled");
			btnTimer = $th.find("ins").countdown("left_time_int", function(timer) {
				$th.removeClass("wx_btn_disabled").html("确认提现");
				btnTimer = null;
			});

			var dealPassword = $("input.password").val(),
				usableSum = $(".wx_account_table2_body p.toun i").attr("data-un"),
				name = $("#nameId").attr("data-name"),
				namevl = $("#nameId").attr("data-val"),
				cardNo = $("#nameId").attr("data-cade");
				
			$.ajax({
				type: "post",
				url: $("#nameId").val(),
				data: {
					"dealPassword": RSAUtils.pwdEncode(dealPassword),
					"usableSum": usableSum,
					"dealMoneyTenpay2": dealSum,
					"ooh.token.name": name,
					"ooh.token.value": namevl,
					"cardNo": cardNo
				},
				success: function(data) {
					$("#drawSub").css("display", "none").html("");
					if ($.type(data) == "string") {
						data = JSON.parse(data);
					}
					if (btnTimer) {
						clearInterval(btnTimer);
						$th.removeClass("wx_btn_disabled").html("确认提现");
					}
					if(data.code!='0'){
						subPo_ajax();
					}
					switch (data.code) {
						case "0":
							$.dialog("提现成功", {
								type: "success",
								title: {
									name: false
								},
								btn: {
									ok: "确 认",
									okCall: function() {
										location.href = account.html";
										return false;
									}
								}
							});
							break;
						case "1":
							$.checkLogin(data);
							break;
						case "2":
							subPo("您的可用余额不足！");
							break;
							break;
						case "3":
							subPo("提现异常！");
							break;
							break;
						case "4":
							subPo("提现异常，请联系客服！");
							break;
						case "5":
							subPo("重复提交！");
							break;
						case "6":
							subPo("交易密码错误！");
							break;
						case "-1":
							subPo("系统异常，请重试！");
							break;
					}
				},
				error: function(jqXHR, textStatus, errorThrown) {
					subPo("网络或系统繁忙，请稍后再试！");
					if (btnTimer) {
						clearInterval(btnTimer);
						$th.removeClass("wx_btn_disabled").html("确认提现");
					}
				}
			});
			return false;
		});
	}

});