(function(global, $, undefined) {
    'use strict';

    var HtmlBanner = function(config) {
        this.config = typeof config === 'undefined' ? {} : config;

        // Parse banner url:
        this.url = purl(true);

        // Set default config and overwrite config options with url parameters if set:
        this.config = $.extend({
            href: null,
            params: {},
            referer: null,
            utm: false,
            click_element: document,
            disable_click: false,
            onClick: null
        }, this.config, this.url.param());

        // Event Listenters:
        var _this = this;
        if(!this.config.disable_click) {
            $(this.config.click_element).on('click', function() {
                _this.onClick.call(_this, this);
            });
        }
    };

    HtmlBanner.prototype.get_referer = function() {
        var referer;

        if(this.config.referer) {
            referer = this.config.referer;
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
        var href = purl(this.config.href, true);
        var href_params = href.param();

        if(this.config.params) {
            href_params = $.extend(this.config.params, href_params);
        }

        if(this.config.utm) {
            var host = this.get_referer().attr('host').replace('www.', '');
            href_params.utm_source = host;
            href_params.utm_medium = 'banner';
        }

        return href.attr('protocol') + '://' + href.attr('host') + href.attr('path') + '?' + $.param(href_params);
    };

    HtmlBanner.prototype.onClick = function(el) {
        var ref = this.get_referer();
        var ref_str = [ref.attr('host'), ref.attr('path')].join('');

        if(typeof ga !== 'undefined') {
            ga('send', 'event', ref_str, 'click');
        }

        if(this.config.onClick) {
            this.config.onClick.call(this);
        }

        window.open(this.get_href(), '_NEW').focus();
    };

    global.HtmlBanner = HtmlBanner;

})(window, jQuery);
