(function(global, $, undefined) {
    'use strict';

    var HtmlBanner = function(config) {
        this.config = typeof config === 'undefined' ? {} : config;

        this.url = purl(true);

        this.referer = this.get_referer();

        // Event Listenters:
        var _this = this;
        if(!this.config.disableClick) {
            $(document).on('click', function() {
                _this.onClick.apply(_this, []);
            });
        }
    };

    HtmlBanner.prototype.get_referer = function() {
        if(this.config.referer) {
            return purl(this.config.referer, true);
        }

        var referer;

        if(this.url.param('referer')) {
            referer = this.url.param('referer');
        } else {
            try {
                referer = top.location.href;
            } catch(e) {
                referer = document.referrer;
            }
        }
        return purl(referer, true);
    };

    HtmlBanner.prototype.get_href = function() {
        var href = purl(this.config.href || this.url.param('href'), true);
        var href_params = href.param();

        if(this.config.params) {
            href_params = $.extend(href_params, this.config.params);
        }

        if(this.config.utm) {
            var host = this.referer.attr('host').replace('www.', '');
            href_params.utm_source = host;
            href_params.utm_medium = 'banner';
        }

        return href.attr('protocol') + '://' + href.attr('host') + href.attr('path') + '?' + $.param(href_params);
    };

    HtmlBanner.prototype.onClick = function() {
        var ref = [this.referer.attr('host'), this.referer.attr('path')].join('');

        if(typeof ga !== 'undefined') {
            ga('send', 'event', ref, 'click');
        }

        if(this.config.onClick) {
            this.config.onClick.apply(this, []);
        }

        window.open(this.get_href(), '_NEW').focus();
    };

    global.HtmlBanner = HtmlBanner;

})(window, jQuery);
