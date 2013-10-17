(function(window, document, $, undefined) {
    'use strict';

    var referer, ref_host;

    var url = purl(true);

    if(url.param('referer')) {
        referer = url.param('referer');
    } else {
        try {
            referer = top.location.href;
        } catch(e) {
            referer = document.referrer;
        }
    }
    referer = purl(referer, true);

    referer_str = [referer.attr('host'), referer.attr('path')].join('');

    var href = purl(url.param('href'), true);
    var href_params = href.param();
    href_params.referer = referer_str;

    var href_str = href.attr('protocol') + '://' + href.attr('host') + href.attr('path') + '?' + $.param(href_params);

    $(document).on('click', function() {
        if(typeof ga !== 'undefined') {
            ga('send', 'event', referer_str, 'click');
        }

        window.open(href_str, '_NEW').focus();
    });

})(window, document, jQuery);