$(function(){
	var $container = $("#container");
	var blurTimer = null;	//输入框blur时，延时200ms，以避免与按钮的click事件冲突
	var mobile="#mobile",
		mobileTip,
		code = "#code",
		codeTip,
		codeBtn = "#codeBtn",
		submitTip,
		realname = "#realname",
		realnameTip,
		idNo = "#idNo",
		idNoTip,
		bankType = "#bankType",
		bankTypeTip,
		bankNo = "#bankCardNo",
		bankNoTip;
	//是否提交开通
	var isSubmit = false;
	//是否发送验证码
	var isSendCode = false;
	//获取验证倒计时timer
	var codeTimer;
	//立即开通按钮倒计timer
	var btnTimer;
	//判断是否已经绑卡
	var isBindCard = false;
	//判断银行卡号是否已通过ajax验证
	var isBankCardChecked = false;
	//判断身份证号是否通过ajax验证
	var isIdCardChecked = false;
	
	//弹出层(银行卡列表)数据
	var popBank = {
		selector:0,
		scrollTop:0,
		content:""
	}
	
	//数据路径
	var request = {
		tpl:"tpl/wx_account_bank_auth.tpl",
		data: "/weixin/account/applyquickpaybindcard",
		send: "/weixin/account/applyquickpay",
		sendBankCode:"/weixin/account/sendapplycode",
		success: "/weixin/account/applyquickpay/success",
		bankCardCheck:"/weixin/account/applyquickpaybindcard/verifycardno",
		idCardCheck:"/weixin/account/applyquickpaybindcard/verifyidno"
	};
	init();
	//初始化
	function init(){
		//请求模板和数据，并调用回调
		$.render({tpl:[request.tpl],data:request.data},function(data,html){
			if(data.card){
				isBindCard = true;
				isBankCardChecked = true;
			} else {
				/*如果卡不存在 ，改变银行卡验证码发送地址 */
				request.sendBankCode = "/weixin/account/applyquickpaybindcard/sendcode";
				request.send = "/weixin/account/applyquickpaybindcard";
				isBindCard = false;
				isBankCardChecked = false;
			}
			//未登录，则返回登录页面;
			if(html===""){
				$.checkLogin(html);
				return;	
			}
			bindEvents(data);
			//判断是否需要判断身份证号,身份证号存在，则不验证
			if(data.idNO){
				isIdCardChecked = true;
			}
			$container.html(html);
			mobileTip = $("#mobileTip");
			codeTip = $("#codeTip");
			submitTip = $("#submitTip");
			realnameTip = $("#realnameTip");
			idNoTip = $("#idNoTip");
			bankTypeTip = $("#bankTip");
			bankNoTip = $("#bankCardNoTip");
		});
	}
	//绑定事件
	function bindEvents(data){
		//选择银行点击打开选择银行
		$container.on("click","#bankName",openSelectBank);

		//input  focus时，隐藏提交返回的错误信息
		$container.on("focus","input",function(){
			if($(this).hasClass("input-readonly")){
				return;
			}
			submitTip.hide();
		});
		//验证开户名
		if(!data.realName){
			$container.on("blur",realname,function(){
				checkRealname($(this));	
			}).on("focus",realname,function(){
				realnameTip.hide();
			});
		}
		//检测身份证号
		if(!data.idNO){
			$container.on("blur",idNo,function(){
				checkIdNo($(this),true);
			}).on("focus",idNo,function(){
				idNoTip.hide();
			}).on("keyup",idNo,function(){
				inputChecking($(this),"remove");
				isIdCardChecked = false;
				//身份证号变化时,重新置按钮为不可点
				resetBtns();
			});
		}
		//验证银行卡号
		if(!data.bankCardNo){
			$container.on("blur",bankNo,function(){
				checkBank($(this),true,true);
			}).on("focus",bankNo,function(){
				bankNoTip.hide();
			}).on("keyup",bankNo,function(){
				inputChecking($(this),"remove");
				isBankCardChecked = false;
				//验证银行卡号变化时,重新置按钮为不可点
				resetBtns();
			})
		}
		
		//验证手机号码
		$container.on("blur",mobile,function(){
			checkMobile($(this));
		}).on("focus",mobile,function(){
			mobileTip.hide();
		});
		//验证短信验证码
		$container.on("blur",code,function(){
			if($(this).hasClass("input-readonly")){
				return;	
			}
			var $this = $(this);
			blurTimer = setTimeout(function(){
				checkCode($this);
			},200);
		}).on("focus",code,function(){
			if($(this).hasClass("input-readonly")){
				return;	
			}
			codeTip.hide();
		});
		//获取短信验证码
		$container.on("click",codeBtn,function(){
			if($(this).hasClass("input-disabled")){ return false; }
			var checked = true;
			
			//检测开户名
			if(!data.realName){
				if(!checkRealname($(realname))){
					checked = false;
				}
			}
			//未绑卡时检测是否选择银行卡号
			if(!isBindCard){
				if(!checkBank($(bankType))){
					checked = false;
				}
			}
			//如果要修改手机号,进行验证
			if(!checkMobile($(mobile))){
				checked = false;
			}
			if(!checked){
				return false;	
			}
			
			//如果手机号码通过，则输入框可写
			$(code).removeClass("input-readonly").removeAttr("readonly");
			//ajax
			var param = {}
			param["phone"] = $.trim($(mobile).val());
			if(!isBindCard){
				param["bankType"]  = $("#bankType").val();
				param["bankCardNO"]  = $("#bankCardNo").val();
				param["bankName"] = $("#bankName").val();
				/*
				bankType 银行;
				bankCardNO 银行卡号;
				idCardNO 身份证号;
				realName 真实姓名;
				phone 手机号;
				*/
			}
			if(!data.realName){
				param["realName"]  = $("#realname").val();
			}
			if(!data.idNO){
				param["idCardNO"]  = $("#idNo").val();
			}
			$.ajax({
				type:"POST",
				url:request.sendBankCode+"?"+new Date().getTime(),
				data:param,
				dataType: "json",
				beforeSend:function(){
					isSendCode = true;
					codeTip.hide();
					$(codeBtn).addClass("input-disabled");
					codeTimer = countdown('获取验证码(<ins left_time_int="120">120</ins>)');
				},
				success:function(data){
					$.checkLogin(data);
					if(data.status==1){
						//成功
					} else if(data.status==0){
						//清除验证
						clearCodeTimer();
						tip(codeTip,data.errorDetails);
					}
				},
				error:function(){
					clearCodeTimer();
					tip(codeTip,"网络异常，请稍候再试!");	
				}
			});
			
			return false;
		});
		
		//立即开通
		$container.on("click","#wxBankAuthSubmit",function(){
			var $this = $(this);
			if($this.hasClass("wx_btn_disabled")){
				return false;
			}
			if(blurTimer){ 
				clearTimeout(blurTimer); 
			}
			submitTip.hide();
			var checked = true;
			
			//检测开户名
			if(!data.realName){
				if(!checkRealname($(realname))){
					checked = false;
				}
			}
			//检测身份证号
			if(!data.idNO){
				if(!isIdCardChecked){
					if(!checkIdNo($(idNo))){
						checked = false;
					}
				}
			}
			
			//检测银行卡
			if(!data.card){
				if(!checkBank($(bankType))){
					checked = false;
				}
				
				if(!checkBank($(bankNo),true)){
					checked = false;
				}
			}
			//检测手机号码
			if(!checkMobile($(mobile))){
				checked = false;
			}
			//验证手机短信验证码
			if(!checkCode($(code))){
				checked = false;
			}
			if(!checked){
				return false;
			}
			//是否同意协议
			if(!$("#agree").prop("checked")){
				$.dialog("请勾选我已阅读并同意《快钱支付服务协议》");
				return false;
			}
			//检测身份证号ajax验证是否通过
			if(!data.idNO){
				if(!isIdCardChecked){
					tip(submitTip,"正在验证身份证号是否有效,请稍候提交...");
					return false;	
				}
			}
			//检测银行卡ajax验证是否通过
			if(!isBindCard){
				if(!isBankCardChecked){
					tip(submitTip,"正在验证银行卡号是有效,请稍候提交...");
					return false;
				}
			}
			
			var confirmTip = $this.data("confirm");
			$.dialog(confirmTip,{
				type:"confirm",
				width:"80%",
				btn:{
					cancel:"取消",
					ok:"确定",
					okCall:function(mask,dialog){
						send($this,data);
					}
				},
				title:{
					closeBtn: false	
				}
			});
			return false;
		});
		//是否同意协议绑定单击事件
		$container.on("click",".input-check-img",function(){
			var $agree = $("#agree");
			var isAgree = $agree.prop("checked");
			var checkedClass = "input-checked-img";
			if(isAgree){
				$(this).removeClass(checkedClass);
				$agree.prop("checked",false);
			} else {
				$(this).addClass(checkedClass);	
				$agree.prop("checked",true);
			}
		});
	}
	//弹出银行卡列表
	function openSelectBank(){
		var banksList = $("#wxBanksList");
		popBank.content = popBank.content || banksList.html();
		$.dialog(popBank.content, {
			type: "select",
			title: {
				name: "请选择您常用的银行卡",
				closeText:"完成"
			},
			bodyWrap:$("#bodyWrap")
		},function(mask,dialog){
			//隐藏提示
			bankTypeTip.hide();
			var $dialogContent = $(dialog).find("#dialogContent");
			if(popBank.scrollTop>0){
				$dialogContent.scrollTop(popBank.scrollTop);
			}
			$(dialog).on("click","li",function(){
				var bankType = $(this).data("type");
				var bankName = $(this).data("name");
				$("#bankType").val(bankType);
				$("#bankName").val(bankName);
				$(this).addClass("cur").siblings().removeClass("cur");
				//更新内容
				popBank.content = $dialogContent.html();
				//记录当前选择位置
				popBank.scrollTop = $dialogContent.scrollTop();
			});
		});
	};
	//确认提交
	function send($this,data){
			//验证中(10)
			$this.html('正在验证(<ins left_time_int="30">30</ins>)').addClass("wx_btn_disabled");
			btnTimer = $this.find("ins").countdown("left_time_int",function(timer){
				$this.removeClass("wx_btn_disabled").html("立即开通");
				btnTimer = null;
				$(code).val("").removeAttr("readonly").removeClass("input-readonly");
				tip(submitTip,"网络或系统繁忙，请稍后再试！");
			});
			//立即开通提交
			var param = {}
			param["code"] = $(code).val();
			if(!isBindCard){
				param["bankType"]  = $("#bankType").val();
				param["bankCardNO"]  = $("#bankCardNo").val();
				param["bankName"] = $("#bankName").val();
			}
			if(!data.realName){
				param["realName"]  = $("#realname").val();
			}
			if(!data.idNO){
				param["idCardNO"]  = $("#idNo").val();
			}
			$.ajax({
				type:"POST",
				url:request.send+"?"+new Date().getTime(),
				data:param,
				dataType: "json",
				beforeSend: function(){
					$(code).addClass("input-readonly").attr("readonly","readonly");
				},
				success:function(data){
					$.checkLogin(data);
					//停止按钮倒计时，恢复状态
					if(btnTimer){
						clearInterval(btnTimer);
						$this.removeClass("wx_btn_disabled").html("立即开通");
					}
					if(data.status==1){
						//成功
						success();
						return;
					}
					//开通失败，清空验证码输入框
					//$(code).val("").removeAttr("readonly").removeClass("input-readonly");
					//清除难证码倒计时
					clearCodeTimer();
					if(data.status==0){
						tip(submitTip,data.errorDetails);
					} else if(data.status==-1){
						tip(submitTip,"开通失败！绑卡校验中"); //-1
					}
				},
				error:function(jqXHR,textStatus,errorThrown){
					if(btnTimer){
						clearInterval(btnTimer);	
					};
					clearCodeTimer();
					tip(submitTip,"网络或系统繁忙，请稍后再试！");
				}
			});
			
	}
	
	//成功开通
	function success(){
		$.dialog("恭喜你成功开通认证支付！",{
			type:"success",
			width:200,
			title:{
				name:false
			},
			btn:{
				ok:"确定",
				okCall:function(){
					location.href = request.success+"?"+new Date().getTime();
					return false;	
				}
			}
		});
	}
	//检测用户名
	function checkRealname($this){
		var name = $.trim($this.val());
		var chinese_regex=/^[\u4e00-\u9fa5]+$/,idno_regex=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(name==''){
			tip(realnameTip,"请填写您的真实姓名");
			return false;
		}else if((!chinese_regex.test(name))||name.length<2||name.length>20){
			tip(realnameTip,"您填写的真实姓名格式不正确");
			return false;
		}
		return true;
	}
	//检测身份证号
	function checkIdNo($this,ajax){
		var id = $.trim($this.val());
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		if(id==""){
			tip(idNoTip,"请填写您的正确身份证号码");
			return false;
		} else if(!reg.test(id)){
			tip(idNoTip,"您填写的身份证号格式不正确");
			return false;
		} else if(!$.validate.idCard(id)){
			tip(idNoTip,"您填写的身份证号无效，请重新填写");
			return false;	
		}
		if(ajax && !isIdCardChecked){
			//ajax验证是否是信用卡或已经绑卡
			var param = {}
			param["idCardNO"] = id;
			$.ajax({
				type : "POST",
				url : request.idCardCheck,// 校验银行卡是不是信用卡
				data : param,
				beforeSend: function(){
					isIdCardChecked = false;
					inputChecking($this,"loading");
				},
				success : function(data) {
					/*
					7 身份证号为空
					8 身份证号已被登记
					0 执行成功
					*/
					$.checkLogin(data);
					if (data == 0) {
						inputChecking($this,"ok");
						isIdCardChecked = true;
						resetBtns();
						return;
					}
					if(data==7){
						tip(idNoTip,"您填写的身份证号");
					} else if(data==8){
						tip(idNoTip,"您填写的身份证号已被登记，请重新填写");
					}
					inputChecking($this,"fail");
				},
				error : function() {
					tip(idNoTip,"服务器暂时无法处理您的请求,请稍后再试");
				}
			});
		}
		return true;
	}
	//检测是否有选择开户行,card为true时，检测卡号
	function checkBank($this,card,ajax){
		var bank = $.trim($this.val());
		if(!card){
			//检测是否有选择开户银行
			if(bank==""){
				tip(bankTypeTip,"请选择开户银行");	
				return false;
			}
		} else {
			var reg = /^\d{13,19}$/;
			if (bank == "") {
				tip(bankNoTip,"请输入银行卡号");
				return false;
			} else if (!reg.test(bank)) {
				tip(bankNoTip,"银行卡号须为13-19位数字");
				return false;
			}
			if(ajax && !isBankCardChecked){
				//ajax验证是否是信用卡或已经绑卡
				var param = {}
				param["cardNO"] = bank;
				$.ajax({
					type : "POST",
					url : request.bankCardCheck,// 校验银行卡是不是信用卡
					data : param,
					dataType:"json",
					beforeSend: function(){
						isBankCardChecked = false;
						inputChecking($this,"loading");
					},
					success : function(data) {
						$.checkLogin(data);
						if (data.status == 1) {
							inputChecking($this,"ok");
							isBankCardChecked = true;
							resetBtns();
						} else {
							tip(bankNoTip,data.errorDetails);
							inputChecking($this,"fail");
						}
					},
					error : function() {
						tip(bankNoTip,"服务器暂时无法处理您的请求,请稍后再试");
					}
				});
			}
		}
		return true;
	}
	//验证手机号码
	function checkMobile($this){
		if(blurTimer){
			clearTimeout(blurTimer);
		}
		var phone = $.trim($this.val());
		var phoneReg = /(^[1][3][0-9]{9}$)|(^[1][4][0-9]{9}$)|(^[1][5][0-9]{9}$)|(^[1][8][0-9]{9}|17[0-9]{9}$)/;
		if(phone===""){
			tip(mobileTip,"请输入您的银行预留手机号码");
			return false;
		} else if(!phoneReg.test(phone)){
			tip(mobileTip,"请输入13、14、15、18或17开头的11位手机号码");
			return false;	
		}
		return true;
	}
	//检测短信验证码
	function checkCode($this){
		var captcha = $.trim($this.val());
		if(!isSendCode){
			tip(codeTip,"请先获取短信验证码");
			return false;	
		} 
		if(captcha===""){
			tip(codeTip,"请输入短信验证码");
			return false;
		}
		return true;
	}
	//倒计时
	function countdown(text){
		//按钮倒计时
		$(codeBtn).html(text);
		var btn = $(codeBtn).find("ins");
		var timer = btn.countdown("left_time_int",function(timer){
			resetCodeBtn();
		});
		return timer;
	}
	//恢复发送短信按钮
	function resetCodeBtn(){
		$(codeBtn).removeClass("input-disabled").html("获取验证码");
	}
	//提示信息
	function tip(obj,text,cla){
		if($.type(obj)==="undefined"){ return; }
		if(text){
			obj.html(text).show();
			if(cla){
				obj.addClass(cla);
			}
		}
		return obj;
	}
	//清除验证码获取框倒计时
	function clearCodeTimer(){
		//倒计时清除时，需要重新发送验证码
		isSendCode = false;
		if(codeTimer){
			clearInterval(codeTimer);
			$(codeBtn).html("获取验证码").removeClass("input-disabled");
			$(code).val("").addClass("input-readonly").attr("readonly","readonly");
		}
	}
	//表单input的ajax验证提示
	function inputChecking(input,status,css){
		if(!input || !status){ return; }
		var tip = input.next(".input-tip");
		if(tip.length===0){
			tip = input;
		}
		switch(status){
			//ajax验证loading
			case "loading":
				tip.addClass("input-checking").show();
				break;
			//ajax验证通过
			case "ok":
				tip.attr("class","input-tip input-checking-ok").show();
				break;
			//ajax验证失败
			case "fail":
				tip.attr("class","input-tip input-checking-fail").show();
				break;
			//ajax验证隐藏
			case "remove":
				tip.attr("class","input-tip").hide();
				break;
			default:
		}
		if(css){
			tip.css(css);	
		}
	}
	//恢复获取验证码和提交按钮
	function resetBtns(){
		if(isBankCardChecked && isIdCardChecked){
			$(codeBtn).removeClass("input-disabled");
			$("#wxBankAuthSubmit").removeClass("wx_btn_disabled");
		} else {
			$(codeBtn).addClass("input-disabled");
			$("#wxBankAuthSubmit").addClass("wx_btn_disabled");
		}
	}
});