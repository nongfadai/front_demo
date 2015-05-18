<% 	var data = it; %>
<%
    if(data.errorCode=="user_not_login"){
    	location.href = account.html";
    	return;
    }
    var count=data.count;
    /*
    三种场景
    小于1.没有卡，不允许提现；
    等于1. 可提现；
    大于1.多张卡，不允许提现；
    */
%>
<% if(count<1){%>
	<!--未绑卡-->
    <div class="wx_recharge wx_recharge3"  id="recharge">
      <div class="wx_account_table2 ttn-lcr">
        <p class="ttn-po">您还未绑定银行卡！<br>请绑定银行卡后再进行操作！</p>
        <a href="account.html" class="wx_btn_org wx-black-index" id="drawIndex">返回账户总览（<ins left_time_int="5">5</ins>）</a>
      </div>
    </div>
<% }else if(count==1){
	var withdraw = data.withdraw;
    /*手续费*/
    var feeun = data.fee;
    var fee = $.milliFormat(data.fee);
    /*真实姓名*/
    var realName = withdraw.realName.substr(0,1)+"**";
    /*可用余额*/
    var userBalanceN = withdraw.userBalance;
    var userBalance = $.milliFormat(withdraw.userBalance);
    /*银行名称*/
    var bankTypeName = withdraw.bankTypeName;
    /*卡号*/
    var card=withdraw.bankCardNo;
    var leng=card.substr(0,card.length-8).replace(/\d/g,"*");;
    var bankCardNo =card.substr(0,4)+leng+card.substr(card.length-4,4);
    /*银行卡状态（0：已绑定状态 4：已开通快捷支付状态）*/
    var dueInterest = withdraw.status;
    /*是否需要填写支行信息（true:需要 false:不需要*/
    var needBranch = withdraw.needBranch;
    
    /*银行卡类型*/
    var banktype= withdraw.bankType;
    
    /*银行卡类型*/
    var name= data["ooh.token.name"];
    
    /*银行卡类型*/
    var nameVal= data["ooh.token.value"];
    /*提现地址*/
    var url=data.refundApplyPath;
%>
    <!--已绑卡，可提现-->
    <div class="wx_draw">
      <div class="wx_account_table2 wx_draw_info">
        <h4>提现银行卡</h4>
        <p><span>开户姓名</span><i><%=realName%></i></p>
        <p><span>开户银行</span><i><%=bankTypeName%></i></p>
        <p><span>卡&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span><i><%=bankCardNo%></i></p>
      </div>
      <% if(needBranch){%>
      <div class="wx-line-tb">
        <dl class="ttn-cl-po">
          <dt>提示</dt>
          <dd>在提现前，您的银行卡还需补充开户行资料，请填写完善。</dd>
        </dl>
      </div>
      <div class="wx_deal_pw_form wx-line">
        <div class="input-box wx_deal_box">
          <label class="label label-fl">开户省份</label>
          <div class="wx_bank_auth_box"><input class="input-text-2 input-no-icon input-select sel sel-cur" type="text" value="选择开户省份" id="province" name="province" readonly data-id="" onfocus="this.blur();return false;" /></div>
        </div>
        <div class="input-box wx_deal_box">
          <label class="label label-fl">开户城市</label>
           <div class="wx_bank_auth_box"><input class="input-text-2 input-no-icon input-select input-select-disabled sel sel-cur" type="text" value="选择开户城市" id="city" name="city" readonly data-id="" data-type="<%=banktype%>" onfocus="this.blur();return false;" /></div>
          <!--<div class="ttn-sel city"> <span class="sel" data-id="" data-type="<%=banktype%>" id="city">选择开户城市</span> </div>-->
        </div>
        <div class="input-box wx_deal_box">
          <label class="label label-fl">开户支行</label>
          <div class="wx_bank_auth_box"><input class="input-text-2 input-no-icon input-select input-select-disabled sel sel-cur" type="text" value="选择开户支行" id="branch" name="branch" readonly data-id="" onfocus="this.blur();return false;" /></div>
          <!--<div class="ttn-sel branch"> <span class="sel" data-id="" id="branch">选择开户支行</span> </div>-->
        </div>
      </div>
      <div class="wx_tip" id="drawSub"></div>
      <div class="wx_account_btn_box"> <a href="javascript:;" class="wx_btn_org wx-draw-sub">下一步</a> </div>
      <% }else{%>
      <div class="wx_account_table2 wx_draw_info ttn-draw-monry">
        <div class="wx_account_table2_body">
          <p class="toun"><span>可用余额</span><i data-un="<%=userBalanceN%>"><%=userBalance%>元</i></p>
          <p class="wx_account_table2_input un"><span>提现金额</span><ins class="wx_account_input_box">
            <input type="tel" class="wx_account_input monery" maxlength="15" style="line-height:normal;"/>
            <em class="wx_account_input_unit">元</em></ins> <i class="po">提现金额不能大于[可用余额 - 手续费]</i> </p>
          <p class="shouun"><span style="letter-spacing:7px;">手续费</span><i data-un="<%=feeun%>"><%=fee%>元</i><i class="po">注：手续费将从您的小牛账户余额中扣除</i></p>
          <p class="wx_account_table2_input pwd" style="padding-bottom:15px;"><span>交易密码</span><ins class="wx_account_input_box">
            <input type="password" class="wx_account_input password" maxlength="20" placeholder="请输入交易密码(非银行密码)"  style="line-height:normal;" id="wx_deal_pw"/>
            </ins><i class="po pding-l" id="wx_deal_pw_tip" style="display:none;"></i>
          </p>
        </div>
      </div>
      <div class="wx_tip" id="drawSub"></div>
      <div class="wx_account_btn_box">
        <input data-name="<%=name%>" data-val="<%=nameVal%>" id="nameId" value="<%=url%>" data-cade="<%=card%>" type="hidden" />
        <a href="#" class="wx_btn_org sub-ok" id="submitPost">确认提现</a> </div>
      <div class="wx_draw_tip">
        <div class="wx_tip2">
          <p><strong>到账时间说明</strong></p>
          <p>1. 每日（包括节假日）8:00-17:00提交的提现申请，系统将于1小时后自动审核；当日17:00以后提交的提现申请，系统将于次日9:00自动审核；审核后预计3小时内到账；</p>
          <p>2. 大额提现（当日累计提现金额大于100,000元）以及可能存在风险的账户，需工作日人工审核。</p>
        </div>
      </div>
      <% }%>
    </div>
<% }else if(count>1){%>
    <!--绑定多张卡，不允许提现-->
    <div class="ttn-more-blank">
      <div class="pging">
        <h3>尊敬的用户</h3>
        <p>看到此页面说明目前<span>您绑定了多张银行卡</span></p>
        <p>为了更多保障您的账户资金安全，小牛在线平台<span>仅限绑定一张银行卡。</span></p>
        <p>请用电脑打开小牛在线官网</p>
        <p><span>www.xiaoniu88.com</span></p>
        <p>保留一张银行卡后再操作提现。</p>
      </div>
      <a href="account.html" class="wx_btn_org wx-black-index" id="drawIndex">返回账户总览（<ins left_time_int="500">5500</ins>）</a>
    </div>
<%}%>
