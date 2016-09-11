function initialize() {
    updateQuotedTextLinks();
    trackLinks();
    trackAds();
}

function trackAds() {
    var elements; 
    if (document.getElementsByTagName) { 
        elements = document.body.getElementsByTagName("IFRAME"); 
    } else if (document.body.all) { 
        elements = document.body.all.tags("IFRAME"); 
    } else { 
        elements = Array(); 
    } 
    for (var i = 0; i < elements.length; i++) { 
        if (elements[i].src.indexOf('googlesyndication.com') > -1) { 
            elements[i].onfocus = asClick(); 
        } 
    }
}

function updateQuotedTextLinks() {
    // wrap all blockquotes with <p>
    $("blockquote[@class='muncited'] > div").wrap("<div class=\"quoted-link\"></div>");

    // add anchor inside <p>
    $("div[@class='quoted-link']").prepend("<a class=\"ql\" href=\"#\">Show Quoted Text</a>");

    // hide all blockquote
    $("blockquote[@class='muncited'] > div > div").hide();

    // add toggle function to show or hide text
    $("div[@class='quoted-link']").toggle(
         function() {
           $("div:first", $(this)).slideDown("normal");
           //$(this).attr('class', 'hide-quoted-link');
           $("a:first[@class='ql']", $(this)).html('Hide Quoted Text');
         },
         function() {
           $("div:first", $(this)).slideUp("normal");
           //$(this).attr('class', 'quoted-link');
           $("a:first[@class='ql']", $(this)).html('Show Quoted Text');
         }
    );
}

function trackLinks() {

$('a').each(function() {
  var $a = $(this);
  var href = $a.attr('href');
 
  if (href && (href.match(/^http/)) && (! href.match(document.domain)) ) {
    $a.click(function() {
      $a.attr("target", "_blank");
      // get the post title if there is one
      // and add it to the string for tracking
      var postTitle = $a.parents('div.post').find('h2:first');
      href = href.replace('http://',''); // cleanup for nice GA reports
      href = (postTitle.length > 0) ? postTitle.text() + '/' + href : href;
      pageTracker._trackPageview('/outgoing/' + href);
    });
  }
 
});

var fileTypes = ['doc','xls','pdf','mp3'];
 
$('a').each(function() {
  var $a = $(this);
  var href = $a.attr('href');
  if (href) {
  var hrefArray = href.split('.');
  var extension = hrefArray[href.length - 1];
 
  if ($.inArray(extension,fileTypes) != -1) {
    $a.click(function() {
      // get the post title if there is one
      // and add it to the string for tracking
      pageTracker._trackPageview('/downloads/' + href);
    });
  }
 }
});
}

function asClick() { 
    if (window.status.indexOf('go to') == 0) { 
        pageTracker._trackPageview('/adsense/ads/' + escape(window.status.substring(6))); 
    } else if (window.status.indexOf('View ads about') == 0) { 
        pageTracker._trackPageview('/adsense/links/' + escape(window.status.substring(15))); 
    } 
} 



jQuery(function($) {
  initialize();
});