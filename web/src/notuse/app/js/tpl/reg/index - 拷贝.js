define(function() {
    return function(it, opt) {
        var out = '';
        var banner = it.bannerDTO;
        var isWait = (data.productStatus == 1) ? true : false;
        var isSale = (data.isFull == "00") ? true : false;
        var isFull = (data.isFull == "01") ? true : false;
        var pType = data.pType;
        var weixinClass = "";
        var newClass = "";
        var vipClass = "";
        if (data.makeArea) {
            if (data.makeArea == 1) {
                weixinClass = "wx_icon_weixin";
            }
            if (data.makeArea == 2) {
                newClass = "wx_icon_new";
            }
            if (data.makeArea == 3) {
                vipClass = "wx_icon_vip";
            }
        }
        var quota = "";
        if (data.makeQuota && data.makeQuota == 1) {
            quota = '<ins class="wx_icon wx_limited">限额</ins>';
        }
        var tenderTimer = [Math.abs(data.tenderTimer), opt.formatCountDown(Math.abs(data.tenderTimer))];
        var borrowAmount = opt.milliFormat(data.productAmount);
        var minAmount = opt.milliFormat(data.minAmount);
        var annualRate = "";
        var assClaim = "";
        var rebateScale = "";
        var NBA = "";
        var deadline = data.line;
        var url = "detail_sanbiao.html?id=" + data.id;
        var unit = "个月";
        if (pType == 3) {
            annualRate = data.minAnnualRate + " - " + data.maxAnnualRate;
        } else {
            if (data.isDay == 0) {
                unit = "天";
            }
            annualRate = data.minAnnualRate;
            if (data.assClaim == 1 && data.pType == 6) {
                annualRate = data.showAnnualRate;
                deadline = data.showDeadline;
                unit = "天";
                url = "detail_debt.html?id=" + data.id;
            }
            if (data.assClaim == 1) {
                assClaim = '<ins class="wx_icon wx_transfer">可转</ins>';
            }
            if (data.rebateScale != null && data.rebateScale != "" && data.rebateScale > 0) {
                rebateScale = '<ins class="wx_icon wx_reward"><ins>+' + data.rebateScale + '%</ins><i>奖</i></ins>';
                if (data.activityType == 1) {
                    rebateScale = "";
                    NBA = '<ins class="wx_icon wx_reward_nba2"><ins>+' + data.rebateScale + '%</ins></ins>';
                }
            }
        }
        out += '<!--临时下掉 放红包链接--><!--<div class="banner_box" id="banner" style="display:none"> <ul class="banner"> ';
        for (var b = 0, blen = banner.length; b < blen; b++) {
            out += ' <li> ';
            if (banner[b].url && banner[b].url !== "" && banner[b].url !== null) {
                out += ' <a href="' + (banner[b].url) + '"> <img src="' + (banner[b].imgPath) + '"> </a> ';
            } else {
                out += ' <img src="' + (banner[b].imgPath) + '"> ';
            }
            out += ' </li> ';
        }
        out += ' </ul> <div class="banner_bottom"> <ul class="banner_btn" id="banner_btn"> ';
        for (var b = 0, blen = banner.length; b < blen; b++) {
            out += ' <li ';
            if (b == 0) {
                out += 'class=\'on\' ';
            }
            out += '></li> ';
        }
        out += ' </ul> </div></div>--><div class="banner" id="banner"><!--临时上红包活动链接--> <a href="share.html" alt="发红包"> <div class="banner_box2>"> ';
        if (it.bonusCode == 2) {
            out += ' <!--如果用户已经登录 且有红包--> <img class="img" id="img" src="img/old/redbag/wx_redbag_index_2.jpg" width="100%"> <div class="banner_redbag_info_con1"> <table  class="banner_redbag_info_con2"> <tr> <td><div class="redbag_info">你有<i>' + (it.bonusAmount) + '元现金</i>可以分享给好友<br> Ta成功领取后,你就自动成为Ta的理财师<br/> 按平均投资额计算,理财师收益约为' + (it.bonusEarnings) + '元 </div></td> </tr> </table> </div> ';
        } else {
            out += ' <!--如果用户没有红包--> <img class="img" id="img" src="img/old/redbag/wx_redbag_index_1.jpg" width="100%"> ';
        }
        out += ' </div> </a></div><div id="scroller"> <div class="index_list"><!--首页展示的产品信息--> <a href="list.html" class="index_more"></a> <div class="index_item ' + (newClass) + ' ' + (vipClass) + ' ' + (weixinClass) + '"> <div class=\'index_item_content\'> <input type="hidden" id="borrowJd" value="' + (data.productSchedule) + '" /> <div class=\'index_item_title\'> <h2 class="wx_flex_btw"><span>' + (data.productTitle) + '</span><em class="wx_icon_box">' + (quota) + (assClaim) + (NBA) + (rebateScale) + '</em></h2> <div class=\'index_progress\'> <canvas id="canvas" width=\'90\' height=\'90\'></canvas> <div class=\'index_progress_text\'>' + (data.productSchedule) + '<span>%</span></div> </div> </div> <div class=\'index_item_detail\'> <ul> <li class=\'index_item_text\'>年化收益率</li> <li class=\'index_item_num1\'>' + (annualRate) + '%</li> <li class=\'index_item_amount\'>计划金额：' + (borrowAmount) + ' 元 </li> </ul> <ul> <li class=\'index_item_text\'>期限 </span> <li class=\'index_item_time\'> <span class=\'index_item_num2\' ';
        if (deadline >= 100) {
            out += 'style="padding:0 3px;"';
        }
        out += '>' + (deadline) + '</span><span class="index_time_unit">' + (unit) + '</span> </li> <li class=\'index_item_amount\'>起投金额：' + (minAmount) + '元</li> </ul> </div> <!--倒计时--> ';
        if (pType == 3) {
            out += ' <!--安心牛产品--> ';
            if (isWait) {
                out += ' <span class=\'index_item_tip index_count_down\' left_time_int="' + (tenderTimer[0]) + '"><ins>' + (tenderTimer[1]) + '</ins>后&nbsp;&nbsp;开始加入</span> <div style="display:none;"> <a class=\'wx_btn_org\' href="detail_axn.html?id=' + (data.id) + '">马上加入</a> <span class=\'index_item_join\'>已有' + (data.count || 0) + '人加入</span> </div> ';
            } else {
                out += ' <!--销售中--> ';
                if (isSale) {
                    out += ' <a class=\'wx_btn_org\' href="detail_axn.html?id=' + (data.id) + '">马上加入</a> ';
                }
                out += ' <!--已满额--> ';
                if (isFull) {
                    out += ' <span class=\'index_item_tip\'>您来晚啦，已满额！</span> ';
                }
                out += ' <span class=\'index_item_join\'>已有' + (data.count) + '人加入</span> ';
            }
            out += ' ';
        } else {
            out += ' ';
            isWait = (data.productStatus == 1) ? true : false;
            isSale = (data.productStatus == 2) ? true : false;
            var isIncome = (data.productStatus == 4) ? true : false;
            out += ' <!--散标或债权产品--> ';
            if (isWait) {
                out += ' <span class=\'index_item_tip index_count_down\' left_time_int="' + (tenderTimer[0]) + '"><ins>' + (tenderTimer[1]) + '</ins>后&nbsp;&nbsp;开始购买</span> <div style="display:none;"> <a class=\'wx_btn_org\' href="' + (url) + '">立即购买</a> <span class=\'index_item_join\'>已有' + (data.count || 0) + '人购买</span> </div> ';
            } else {
                out += ' <!--销售中--> ';
                if (isSale) {
                    out += ' <a class=\'wx_btn_org\' href="' + (url) + '">立即购买</a> ';
                }
                out += ' ';
                if (isIncome) {
                    out += ' <span class=\'index_item_tip\'>已售罄！</span> ';
                }
                out += ' <span class=\'index_item_join\'>已有' + (data.count) + '购买</span> ';
            }
            out += ' ';
        }
        out += ' </div> </div> </div></div>';
        return out;
    }
})