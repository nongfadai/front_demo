var wait = 60;
var banbCode = $("#bank_code").val();
var min = $("#min").val();
$(function() {
    $("#nfd-channel-form-bank input").focus(function() {
        var msg_wrapper = $(this).parent().find(".msg-wrapper");
        if (msg_wrapper.css("display") == 'block') {
            msg_wrapper.hide();
        }
    });
    if (!$("#bank_code").prop("readonly")) {
        $("#select-bank-name").click(function() {
            $("#bank_list").toggle();
            if (window.refreshScroll) {
                window.refreshScroll();
            }
            var msg_wrapper = $(this).parent().find(".msg-wrapper");
            if (msg_wrapper.css("display") == 'block') {
                msg_wrapper.hide();
            }
        });
    }

    $("#bank_list").click(function(evt) {
        var target = evt.target;
        if (target && target.getAttribute("data-bankcode")) {
            $("#bankName").val(target.getAttribute("data-bankname"));
            $("#bank_code").val(target.getAttribute("data-bankcode"));
            $("#bank_code").attr("max", target.getAttribute("data-bankValue"));
            $("#bank_code").attr("maxday", target.getAttribute("data-maxday"));
            var bk_value = parseFloat(target.getAttribute("data-bankValue"));
            var dr_value = parseFloat(target.getAttribute("data-maxday"));
            var money_dw = "元";
            if (bk_value > 10000) {
                bk_value = bk_value / 10000;
                money_dw = "万元";
            }
            $("#singleRecharge").html(getWording("bind_card_01", bk_value, money_dw, dr_value / 1000));
            //$("#singleRecharge").html("&nbsp;&nbsp;单笔限额"+bk_value+money_dw+",当日限额"+(dr_value/10000)+"万元，<br>&nbsp;&nbsp;通过电脑或线下充值方式无上限。");
            $("#bank_list").toggle();
        }
    });

    $("#money_order").keyup(function() {
        var bankValue = $("#bank_code").attr("max");
        var amount = $(this).val();
        if (bankValue && (parseFloat(amount) > parseFloat(bankValue))) {
            $(this).val(bankValue);
        }
        if (amount.length > 10) {
            $(this).val(1000000000);
        }
        var atoc = Arabia_to_Chinese($(this).val());
        $("#b_v").html("&nbsp;&nbsp;" + atoc);
        console.log(atoc);
    });

    $("#nfd-channel-form-bank input").blur(function() {
        return vali($(this));
    });

    $.ajax({ /*获取所有支持银行*/
        type: "GET",
        url: "/pay/lianlian/queryBankLimitServlet.htm",
        dataType: "json",
        async: false,
        success: function(data) {
            if (data) {
                var bankHtml = new Array();
                var len = data.length,
                    datai;
                var bank_list = $("#bank_list");
                for (var i = 0; i < len; i++) {
                    datai = data[i];
                    bankHtml.push("<div data-bankcode='" + datai['F02'] + "' data-bankValue='" + datai['F06'] + "' data-bankname='" + datai['F03'] + "' data-maxday='" + datai['F07'] + "' class='rechargebank rechargebank-" + datai['F02'] + "'>" + "</div>");
                    if (banbCode && banbCode == datai['F02']) {
                        $("#bankName").val(datai['F03']);
                        var bk_value = parseFloat(datai['F06']);
                        var dr_value = parseFloat(datai['F07']);
                        $("#bank_code").attr("max", datai['F06']);
                        $("#bank_code").attr("maxday", datai['F07']);
                        var money_dw = "元";
                        if (bk_value > 10000) {
                            bk_value = bk_value / 10000;
                            money_dw = "万元";
                        }
                        $("#singleRecharge").html(getWording("bind_card_01", bk_value, money_dw, dr_value / 1000));
                        //$("#singleRecharge").html("&nbsp;&nbsp;单笔限额"+bk_value+money_dw+",当日限额"+(dr_value/10000)+"万元，<br>&nbsp;&nbsp;通过电脑或线下充值方式无上限。");
                    }
                }
                $("#bank_list").html(bankHtml.join(''));
                bankHtml = null;
            }
        }
    });
});

function cz() {
    if (validate()) {
        $("#nfd-channel-form-bank").submit();
    }
}

function vali(object) {
    var formInput = $(object);
    var formInputValue = formInput.val();
    var validate = true;
    if (typeof(formInput.attr("placeholder")) != "undefined" && formInput.attr("readonly") == null) {
        var msg_wrapper = formInput.parent().find(".msg-wrapper");
        var errMsg = "";
        var id = formInput.attr("id");
        if (!formInputValue) {
            errMsg = formInput.attr("required-msg");
        } else {
            if (id == "id_no") {
                errMsg = isIdCardNo(formInputValue);
            } else if (id == "card_no") {
                if (formInputValue.length < 16 || formInputValue.length > 19) {
                    errMsg = getWording("bind_card_02");
                    //errMsg = "银行卡号长度必须在16到19之间";
                }
                var num = /^\d*$/; //全数字
                if (!num.exec(formInputValue)) {
                    errMsg = getWording("bind_card_03");
                    //errMsg = "银行卡号必须全为数字";
                }
            } else if (id == "money_order") {
                var bank_code = $("#bank_code").attr("max");
                var max = parseFloat(bank_code);
                if (parseFloat(formInputValue) < parseFloat(min)) {
                    errMsg = getWording("bind_card_04", min);
                    //errMsg = "充值金额不能低于"+min+"元";
                } else if (parseFloat(formInputValue) > max) {
                    errMsg = getWording("bind_card_05", max / 10000);
                    //errMsg = "充值金额不能高于" + max / 10000+ "万元";
                }
            }
        }
        if (errMsg) {
            if (msg_wrapper.css("display") == "none") { /*如果是隐藏的，则显示*/
                msg_wrapper.html('<p class="auth-msg auth-error">' + errMsg + '.</p>');
                msg_wrapper.show();
            }
            validate = false;
            return validate;
        }
    }
    return validate;
}

function validate() {
    var validate = true;
    $("#nfd-channel-form-bank input").each(function() {
        validate = vali($(this));
        if (!validate) {
            return validate;
        }
    });
    return validate;
}

function isIdCardNo(num) {
    var wsp = $("#id_no").parent().find(".msg-wrapper");
    num = num.toUpperCase(); //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。        
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
        return getWording("bind_card_06");
        //return "输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X.";
    } //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
    //下面分别分析出生日期和校验位 
    var len, re;
    len = num.length;
    if (len == 15) {
        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
        var arrSplit = num.match(re); //检查生日日期是否正确
        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return getWording("bind_card_07");
            //return "输入的身份证号里出生日期不对";
        } else { //将15位身份证转成18位 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。        
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            num += arrCh[nTemp % 11];
            return "";
        }
    }
    if (len == 18) {
        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
        var arrSplit = num.match(re); //检查生日日期是否正确 
        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
        var bGoodDay;
        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
        if (!bGoodDay) {
            return getWording("bind_card_07");
            //return "输入的身份证号里出生日期不对.";
        } else { //检验18位身份证的校验码是否正确。 //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。 
            var valnum;
            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
            var nTemp = 0,
                i;
            for (i = 0; i < 17; i++) {
                nTemp += num.substr(i, 1) * arrInt[i];
            }
            valnum = arrCh[nTemp % 11];
            if (valnum != num.substr(17, 1)) {
                return getWording("bind_card_08");
                //return "18位身份证的校验码不正确.";
            }
            return "";
        }
    }
    return "";
}


(function() { /*直接执行的一段脚本*/

    $("#nfd-contract-btn").click(showProtocol);
    $("#back_register").click(hideProtocol);

    function showProtocol() {
        $("#nfd-channel-banks").hide();
        $("#Contract").show();
        $("#back_register").show();
        $("#nfd-footer").hide();
    }

    function hideProtocol() {
        $("#nfd-channel-banks").show();
        $("#Contract").hide();
        $("#back_register").hide();
        $("#nfd-footer").show();
    }
})();