// Analytics
(function () {
    var href = window.location.href.toLowerCase(),
        enabled = href.indexOf("nongfadai.com") != -1 &&
            href.indexOf("gray2") == -1 &&
            href.indexOf("test") == -1 &&
            href.indexOf("forapp=") == -1;

    if (enabled) {

        // 积木统计类,兼容各家统计的JS统计API,目前仅支持百度
        window.nfdAnalytics = {
            trackEvent: function(category, action, label, value) {
                // http://tongji.baidu.com/open/api/more?p=guide_trackEvent
                _hmt.push(['_trackEvent', category || '', action || '', label || '', value || '']);
            }
        }

        // Baidu Analytics
        var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
        document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F3dd9747b06b07704cef279b2ed74350f' type='text/javascript'%3E%3C/script%3E"));

        var build_analysis = function () {
            var default_options = {
                type: 'text/javascript',
                async: 'true',
                protocol: ('https:' == document.location.protocol ? ' https://' : ' http://')
            }
            return {
                init: function(url, options) {
                    var options = options || {};
                    var ele = document.createElement('script');
                    ele.type = options.type || default_options.type;
                    (options.async === false ? ele.async = false : ele.async = true);
                    ele.src = options.protocol || default_options.protocol + url;
                    document.body.appendChild(ele);
                }
            }
        }
        var async_analysis = function() {
            var any = build_analysis();
            any.init('stats.g.doubleclick.net/dc.js');
            any.init('t.agrantsem.com/js/ag.js');
            ('https:' == document.location.protocol ? any.init('static-ssl.mediav.com/mvl.js') : any.init('static.mediav.com/mvl.js'));
        }

        if (window.addEventListener) {
            window.addEventListener('load', async_analysis, false);
        } else if (window.attachEvent) {
            window.attachEvent('onload', async_analysis);
        } else {
            window.onload = async_analysis;
        }
    } else {
        window.nfdAnalytics = {
            trackEvent: function() {
                // do nothing in case error occur on console
            }
        }
    }
})();