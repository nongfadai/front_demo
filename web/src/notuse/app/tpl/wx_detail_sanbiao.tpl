<% var data = it.data; %>
<%
    var isWait	= (data.borrowStatus==1)? true : false;		/*倒时计*/
    var isSale 	= (data.borrowStatus==2)? true : false;		/*可以购买*/
    var isFull	= (data.borrowStatus==3)? true : false;		/*满额*/
    var isIncome  = (data.borrowStatus==4)? true : false;	/*收益*/
    var isComplete  = (data.borrowStatus==5)? true : false;	/*已还完*/
    var isFail	=  (data.borrowStatus==6)? true : false;		/*流标*/
    
    /*单位*/
    var unit = (data.isDayThe==1) ? "个月" : "天";
    
    /*倒计时时间*/
    var tenderTimer = [Math.abs(data.tenderTimer),$.formatCountDown(Math.abs(data.tenderTimer))];
    
    /*进度*/
    var dataBorrowAmount = parseFloat((""+data.borrowAmount).replace(/,/g,""));
    var dataHasInvestAmount = parseFloat((""+data.hasInvestAmount).replace(/,/g,""));
    var progress = $.formatProgress(dataBorrowAmount,dataHasInvestAmount);
    progress = progress < 0 ? 0 : (progress >100 ? 100 : progress);
    
    /*是否为新手*/
    var newClass= "";
    if(data.newProduct!="" && data.newProduct!=null && data.newProduct!=0){
    	newClass = "wx_icon_new";
    }
    
    /*vip*/
    var vipClass= "";
    var weixinClass = "";
    if(data.specialArea==3){
   		vipClass = "wx_icon_vip";
    } else if(data.specialArea==4) {
    	weixinClass = "wx_icon_weixin";
    }
    
    /*是否限额*/
    var quota = "";
    var quotaVal = data.quotaAmount;
    if(data.quotaType==1 && quotaVal!="" && quotaVal!=null && parseInt(quotaVal)>0){
    	quota = '<ins class="wx_icon wx_limited">限额</ins>';
    }
    
    /*是否可转让*/
    var assClaim = "";
    if(data.assClaim==1){
    	assClaim = '<ins class="wx_icon wx_transfer">可转</ins>';
    }
    
     /*是否有奖励*/
    var rebateScale = "";
    var NBA = "";
    if(data.rebateScale != null && data.rebateScale!="" && data.rebateScale>0){
    	rebateScale = '<ins class="wx_icon wx_reward"><ins>+'+data.rebateScale+'%</ins><i>奖</i></ins>';
        /*NBA标*/
        if(data.activityType==1){
            /*是NBA图标时，就一定有奖励，把奖励和NBA图标合并在一起*/
            rebateScale = "";
            NBA = '<ins class="wx_icon wx_reward_nba2"><ins>+'+data.rebateScale+'%</ins></ins>';
        }
    }
    
    /*还款方式*/
    var paymentMode = "";
    if(data.paymentMode==1){
    	paymentMode = "按月等额本息还款"
    } else if(data.paymentMode==2){
    	paymentMode = "先息后本"
    } else if(data.paymentMode==3){
    	paymentMode = "一次性还款";
    } else if(data.paymentMode==4){
    	paymentMode = "等额本息";
    }
    
    /*发布时间*/
    var publishTime = $.formatTime(data.tenderTime);
    
    /*到期时间*/
    var expireTime = $.formatTime(data.expireDt,"yyyy-MM-dd");
    
    /*起息日期*/
    var accrualTime = "";
    if(data.borrowWay != 8){
    	if(!data.interestTime || data.interestTime == null || data.interestTime==""){
   			accrualTime="T(成交日)+1";
        } else {
        	accrualTime = $.formatTime(data.interestTime,"yyyy-MM-dd");
        }
    }else {
    	accrualTime="购买当日";
    }
    
    /*格式化交易时间*/
    var tenderTime = "";
    if(!isWait && !isSale){
    	tenderTime = $.formatTime(data.fullTenderTime);
    }
    
    /*计划金额*/
    var borrowAmount = $.milliFormat(dataBorrowAmount);
    
    /*判断是否有登录*/
    var isLogined = true;
    if(data.logined == 0){
    	isLogined = false;
    }
    
    /*readOnly:剩余可投金额小于最小投资额时,散标及债权且非VIP产品时，小于200时不可修改*/
    var isMinTender = false;
    var leftMoney = parseFloat((""+data.investAmount).replace(/,/g,""));
    if(leftMoney<data.minTenderedSum || (vipClass=="" && leftMoney<200)){
    	isMinTender = true;
    };
    
    /*起投值和最大值*/
    var minTenderedSum = data.minTenderedSum;
    var maxTenderedSum = data.maxTenderedSum;
    var minAndMax = $.milliFormat(minTenderedSum)+"元起投";
    if(maxTenderedSum && maxTenderedSum!="" && maxTenderedSum!=null){
  		minAndMax = $.milliFormat(minTenderedSum)+"-"+$.milliFormat(maxTenderedSum);
    }
%>

<form id="form" action="#" target="_self" onsubmit="return false;">
  <ul class="wx_detail_info <%=newClass%> <%=vipClass%> <%=weixinClass%>">
    <li class="wx_detail_title"><strong><%=data.borrowTitle%></strong><%=quota%><%=assClaim%><%=NBA%><%=rebateScale%></li>
    <li>
      <p><span><em><%=data.annualRate%></i></em>%</span><span><%=data.deadline%><%=unit%></span><span><%=borrowAmount%>元</span><span><%=paymentMode%></span></p>
    </li>
    
    <!--起息日期|发布时间-->
    <%if(isWait || isSale){%>
    <li><span>起息日期：<i><%=accrualTime%></i></span></li>
    <li><span>发布时间：<i><%=publishTime%></i></span></li>
    <%}%>
    <!--end 起息日期|发布时间-->
    
    <%if(isFull || isIncome){%>
    <li class="wx_half"> <span>起息日期：<i><%=accrualTime%></i></span> <span>到期时间：<i><%=expireTime%></i></span> </li>
    <%}%>
    
    <!--进度-->
    <%if(isWait || isSale){%>
    <li class="wx_detail_progress" <%if(isWait){%> style="display:none"<%}%>>
      <div class="wx_progress"><span style="width:<%=progress%>%"></span></div>
    </li>
    <li class="wx_flex_btw wx_detail_progress" <%if(isWait){%> style="display:none"<%}%>><span>项目进度<strong><%=progress%><i>%</i></strong></span><span class="wx_detail_account">剩余金额<em><%=data.investAmount%></em>元</span></li>
    <%}%>
    <!--end 进度-->
    
    <%if((isWait || isSale) && quota!="" && quotaVal!="" && parseInt(quotaVal)>0){%>
    <li class="wx_detail_tip">
        <div class="wx_tip2">
            <p><em class="red">注意：</em>本项目每人累计购买的最大金额为<em class="red"><%=quotaVal%>元!</em></p>
        </div>
    </li>
    <%}%>
    
    <%if(isWait){%>
    <!--倒计时-->
    <li class="wx_detail_countdown"> <span left_time_int="<%=tenderTimer[0]%>"><ins><%=tenderTimer[1]%></ins>后&nbsp;&nbsp;开始购买</span> </li>
    <!--end 倒计时-->
    <%}%>
    <%if(isWait || isSale){%>
    <%if(isLogined){%>
    <!--已登录,立即加入-->
    <li class="wx_detail_invest" id="wxInvestBox" <%if(isWait){%> style="display:none"<%}%>>
      <div class="wx_detail_btn">
        <input type="tel" id="amount" <%if(isMinTender){%> style="color:#999;" readonly value="<%=leftMoney%>" <%}else{%> value="" <%}%>  class="input_text" placeholder="<%=minAndMax%>" />
        <label>元</label>
        <p><a href="javascript:void(0);" class="wx_btn_org" id="wx_BtnInvest">立即购买</a></p>
      </div>
      <div class="wx_tip" id="wx_tip" style="display:none;"></div>
    </li>
    <!--end 已登录,立即加入-->
    <%} else {%>
    <!--未登录-->
    <li class="wx_detail_invest" id="wxInvestLogin" <%if(isWait){%> style="display:none"<%}%>>
      <div class="wx_detail_btn">
        <div class="wx_detail_nologin">登录后才能进行投资</div>
        <p><a href="../../weixin_copy/tpl/login.html?url=<%=encodeURIComponent(location.href)%>" class="wx_btn_org">立即登录</a></p>
      </div>
    </li>
    <!--end 未登录-->
    <%}%>
    <%}%>
    <%if(isFull || isIncome){%>
    <!--已售罄-->
    <li class="wx_detail_complete"> 已售罄 <span><i>成功交易时间：</i><br/>
      <%=tenderTime%></span> </li>
    <!--end 已售罄-->
    <%}%>
  </ul>
</form>
<div class="wx_list_tab"> <a href="javascript:void(0);" class="select"><span>产品详情</span></a><a href="javascript:void(0);"><span>交易记录</span></a> </div>
<div class="wx_detail_content">
  <ul>
  	<%if(data.borrowInfo){%>
    <li>
      <h4>项目简介</h4>
      <div class="wx_detail_text">
        <p><%=data.borrowInfo%></p>
      </div>
    </li>
    <%}%>
    
    <%if(data.auditOpinion){%>
    <li>
      <h4>风控师意见</h4>
      <div class="wx_detail_text">
        <p><%=data.auditOpinion%></p>
      </div>
    </li>
    <%}%>
    
    <%if(data.attr){%>
    <li>
      <h4>资质认证</h4>
      <div class="wx_detail_text">
        <dl class="wx_detail_table">
          <dt><span>认证项目</span><span>认证结果</span></dt>
          <%for(var r=0,rlen=data.attr.length; r<rlen; r++){%>
          	<dd><span><%=data.attr[r]%></span><span class="wx_auth_ok">已认证通过</span></dd>
          <%}%>
        </dl>
      </div>
    </li>
    <%}%>
  </ul>
</div>
<div class="wx_detail_content wx_trade_record" style="display:none;">
  <ul id="wxDetailRecords">
  </ul>
  <a href="javascript:void(0);" class="wx_get_more" data-page="2" id="wxGetRecordsMore" style="display:none;">单击加载更多</a> </div>
