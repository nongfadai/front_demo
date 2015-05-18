	
	function g_log(msg){
		if(/dev.xiaoniu88.com/.test(document.location.href)){
			//msgDom.innerHTML+=msg+"<br/>";
			if(typeof(msg)=="object"){
				msg=JSON.stringify(msg);
			}
			var image=new Image();
			image.src="/error?msg="+msg;
		}
	}
	function getTicketBack(result){
		//console.log(data);
		var data={
				timestamp:"1423566009",
				nonceStr:"D2AE4FD7431A872114C05E67864B17D1",
				signature:"b89bcdd16f020aa6aa13b092a3c2e7ec667dd38f",
			};
		if(result&&result.data){
			data=result.data;
			g_log(JSON.stringify(data));
		}
		
		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId : 'wx3eb0718281190cf6', // 必填，公众号的唯一标识
			timestamp: ""+data.timestamp, // 必填，生成签名的时间戳
			nonceStr: data.nonceStr, // 必填，生成签名的随机串
			signature: data.signature,// 必填，签名，见附录1
			jsApiList: ["onMenuShareAppMessage","onMenuShareTimeline","hideMenuItems","showMenuItems","showOptionMenu","showAllNonBaseMenuItem"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		});
		
		wx.ready(function(){
			wx.checkJsApi({
				jsApiList: ['onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
				success: function(res) {
					//alert("判断是否有分享到朋友圈接口  res"+JSON.stringify(res));
					// 以键值对的形式返回，可用的api值true，不可用为false
					// 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
				}
			});
		
			bindWeixinEvent();
			
			if(/dev.xiaoniu88.com/.test(document.location.href)){
				alert("微信接口调用成功");
			}
		});
		wx.error(function(res){
			console.log("error",arguments);
			g_log("error"+res);
			if(/dev..xiaoniu88.com/.test(document.location.href)){
				alert("微信接口调用失败");
			}
		});
		
		function bindWeixinEvent(){
			g_log("bindWeixinEvent");
			var title="兄弟们，打劫了"+(window.g_amount||0)+"元，一起来分赃！";
			var des="打劫了土豪"+(window.g_amount||0)+"元，我喝汤你吃肉，一分钟提现到你的银行卡！";
			var imgUrl=document.location.protocol+"//"+document.location.host+ctx+"/weixin/img/redbag/redbag_icon.jpg";
			var imgUrl2="http://a2.qpic.cn/psb?/19a0e58d-2fd7-40d3-861d-bccfaf5c9ba2/pgzDSJ3aZ*W465WmiFiYUBqcCesr86pKwBca9KimHTA!/b/dMS9qnbAIgAA&bo=6QDpAAAAAAAFACM!&rf=viewer_4";
			wx.onMenuShareTimeline({
				title: title+des, // 分享标题
				link: document.location.href.split('#')[0], // 分享链接
				imgUrl: imgUrl2, // 分享图标
				success: function () { 
					// 用户确认分享后执行的回调函数
					//alert("分享成功");
				},
				cancel: function () { 
					// 用户取消分享后执行的回调函数
				}
			});
			
			wx.onMenuShareAppMessage({
				title: title, // 分享标题
				desc: des, // 分享描述
				link: document.location.href.split('#')[0], // 分享链接
				imgUrl: imgUrl, // 分享图标
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function () { 
					// 用户确认分享后执行的回调函数
					//alert("分享成功");
				},
				cancel: function () { 
					// 用户取消分享后执行的回调函数
				}
			});
		}
	}
	
	
	//if(/xiaoniu88.com/ig.test(document.location.host)){
		$.ajax({
			type:"POST",
			url:"/weixin/signature",
			data:{
				url:window.encodeURIComponent(document.location.href.split('#')[0]),
				force:1
			},
			dataType: "json",
			success:getTicketBack
		});
	//}

$(function(){
	var wx_mask = $("#wx_mask");
	var wx_mask_gz = $("#wx_mask_gz");
	var wx_mask_tip = $("#wx_mask_tip");
	/*分享弹出层*/

	$("#wx_btn_share").on("click",function(){
      if(navigator.appVersion.match(/MicroMessenger/i)){
        wx_mask.show();
      } else {
        wx_mask_tip.show();
      }
  });

  $("#wx_btn_iknow,#wx_btn_iknow2,#wx_btn_iknow3,.wx_share_close").on("click",function(){
      $(".wx_mask").hide();
  });

  $(".wx_rule").on("click",function(){
      wx_mask_gz.show();
  });
	//禁用弹出层touchmove
	function disabledTouchMove(obj){
		obj.addEventListener('touchmove', function(e) {
			e.stopPropagation();
			e.preventDefault();
		});				
	}
	//disabledTouchMove(wx_mask[0]);
	//disabledTouchMove(wx_mask_gz[0]);
	//disabledTouchMove(wx_mask_tip[0]);
  
});
