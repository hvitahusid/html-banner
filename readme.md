HTML5 Banner Boilerplate
===========

This is a base for creating HTML5 Banners.

### How to use:
~~~JavaScript
// Simple banner with a href:
var html_banner = new HtmlBanner({href: 'http://hvitahusid.is'});

// More Advanced examples:
// How to overwrite onClick parameter:
HtmlBanner.prototype.onClick = function(el) {
    console.log('onClick overwrite');
};

// Note: All config options can be overwritten by parameters in url.
var html_banner = new HtmlBanner({
    href: 'http://hvitahusid.is/',  // Default: null
    params: {  // Default: {}
        // Can be overwritten by parsed parameters from href parameter in url.
        utm_term: 'test',
        utm_campaign: 'test'
    },
    referer: null,  // Default: null
    utm: true,  // Default: false
    click_element: document,  // Default: document
    disable_click: false,  // Default: false
    onClick: function() {  // Default: none
        console.log('click', this);
    }
});
~~~

### Instance Methods (prototypes):
~~~JavaScript
var html_banner = new HtmlBanner({
    href: 'http://hvitahusid.is?test=test#example_fragment'
    params: {
        example: 'example'
    }
});

html_banner.get_referer();
// Returns: <current domain> i.e. "localhost" or <medium> ("mbl.is", "visir.is")

html_banner.get_href();
// Returns: <compiled href> in this case: "http://hvitahusid.is?test=test&example=example#example_fragment"
~~~
