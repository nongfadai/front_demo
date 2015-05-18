<% var data = it; %>
<%
	var errorCode = data.errorCode;
    if(errorCode=="user_not_login"){
    	return "";
    }
	/*银行卡信息*/
    var card = data.card;
    var bankType = "";
   	var bankCardNo = "";
    /*判断是否已经绑卡*/
    var isBindCard = false;
    if(card){
    	isBindCard = true;
        bankType = card.bankType;
        bankCardNo = card.bankCardNo;
    } else {
    	isBindCard = false;
    };
    /**/
    var liClass = isBindCard ? "" : "wx_bank_list_input";
    
    
    /*银行列表*/
    var banks = [
        ["ICBC","工商银行"],
        ["CCB","建设银行"],
        ["CMB","招商银行"],
        ["ABC","农业银行"],
        /*["BOC","中国银行"],*/
        ["PAB","平安银行"],
        ["CMBC","民生银行"],
        ["CEB","光大银行"],
        ["CIB","兴业银行"],
        ["SPDB","浦发银行"],
        ["CGB","广发银行"]
    ];
    
%>
<div style="display:none;" id="wxBanksList">
	<ul>
    	<%for(var i=0;i<banks.length;i++){%>
    	<li data-type='<%=banks[i][0]%>' data-name='<%=banks[i][1]%>'><span class='l'><em></em></span><span class='r'><%=banks[i][1]%></span></li>
        <%}%>
    </ul>
</div>
<ul class="wx_bank_list">
    <li class="<%if(!data.realName){%>wx_bank_list_input<%}%>"><span>开户姓名</span>
        <%if(data.realName){%>
        	<i><%=data.realName%></i>
        <%}else {%>
        	<div class="wx_bank_auth_box"><input class="input-text-2 input-no-icon" type="text" value="" maxlength="20" id="realname" name="realname" placeholder="请输入您的真实姓名" /></div>
        <div class="wx_tip" id="realnameTip" style="display:none"></div>	
        <%}%>
    </li>
    <li class="<%if(!data.idNO){%>wx_bank_list_input<%}%>"><span>身份证号码</span>
    	<%if(data.idNO){%>
        	<i><%=data.idNO%></i>
        <%}else {%>
        	<div class="wx_bank_auth_box"><input class="input-text-2 input-no-icon" type="text" value="" maxlength="18" id="idNo" name="idNo"  placeholder="请输入您的身份证号" />
            <div class="input-tip" style="right:30px;"></div>
            </div>
        	<div class="wx_tip" id="idNoTip" style="display:none"></div>	
        <%}%>
    </li>
    <li class="wx_bank_auth_tip <%=liClass%>"><span>开户银行</span>
    	<%if(isBindCard){%>
        	<i><%=card.bankTypeName%></i>
        <%}else {%>
        	<input class="input-text-2 input-no-icon input-select" type="hidden" value="" id="bankType" name="bankType" />
        	<div class="wx_bank_auth_box"><input class="input-text-2 input-no-icon input-select" type="text" value="请选择您常用的银行卡" id="bankName" name="bankName" readonly="readonly" style="padding-right:25px;" /></div>
        <div class="wx_tip" id="bankTip" style="display:none"></div>	
        <%}%>
    </li>
    <li class="<%=liClass%>"><span>银行卡号</span>
    	<%if(isBindCard){%>
        	<i><%=card.bankCardNo%></i>
        <%}else {%>
        	<div class="wx_bank_auth_box"><input class="input-text-2 input-no-icon" type="tel" value="" maxlength="19" id="bankCardNo" name="bankCardNo"  placeholder="请输入银行储蓄卡卡号" />
            <div class="input-tip" style="right:30px;"></div>
            </div>
        <div class="wx_tip" id="bankCardNoTip" style="display:none"></div>	
        <%}%>
    </li>
    <li class="wx_bank_list_input">
        <span>银行预留手机号码</span>
        <div class="wx_bank_auth_box" id="mobileInput"><input class="input-text-2 input-no-icon" type="tel" value="" maxlength="11" id="mobile" name="mobile" /></div>
        <div class="wx_tip" id="mobileTip" style="display:none"></div>
    </li>
    <li class="wx_bank_list_input">
        <span>验&nbsp;&nbsp;证&nbsp;&nbsp;码</span>
        <div class="input-code-box">
            <input class="input-text-2 input-no-icon input-readonly" type="tel" value="" maxlength="6" id="code" name="code" readonly="readonly" placeholder="请获取验证码" style="padding-left:8px;" />
            <a href="javascript:void(0);" class="input-code-btn <%if(!data.idNO || !card){%>input-disabled<%}%>" id="codeBtn">获取验证码</a>
        </div>
        <div class="wx_tip" id="codeTip" style="display:none"></div>
    </li>
</ul>
<div class="wx_bank_auth_agree">
    <input type="checkbox" id="agree" name="agree" checked="" style="display:none;">
    <span class="input-check-img input-checked-img"></span>我已阅读并同意<a href="/weixin/resources/weixin/account_bank_auth_terms.html">《快钱支付服务协议》</a>
   
</div>
<div class="wx_bank_auth_submit">
	<div class="wx_tip" id="submitTip" style="display:none"></div>
    <%
        var confirmTip = "为了验证银行卡，将从您的银行卡转出 <strong style='color:#ff864a;'>1 </strong>元并充值到您的投资账户中。";
    %>
    <a href="javascript:void(0);" class="wx_btn_org wx_bank_auth_btn2 <%if(!data.idNO || !card){%>wx_btn_disabled<%}%>" id="wxBankAuthSubmit" data-confirm="<%=confirmTip%>">立即开通</a>
</div>