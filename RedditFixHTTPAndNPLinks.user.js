// ==UserScript==
// @name        Reddit: Fix http and np Links
// @namespace   http://github.com/alienacorn
// @description Rewrite links
// @include     http://www.reddit.com/*
// @include     https://www.reddit.com/*
// @version     1
// @grant       none
// ==/UserScript==

function GM_wait() {
  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait,100);
  } else {
    GM_use_JQuery();
  }
}
GM_wait();

function GM_use_JQuery() {
  var nplinks = /^https?:\/\/np\.reddit\.com\/(.*)/;
  var nonhttps = /^http:\/\/www\.reddit\.com\/(.*)/;
  var $ = unsafeWindow.jQuery;
  $('a[href]').each(
    function(i){
      var href = $(this).attr('href');

      if (href.match(nplinks)) {
        var fixed = href.replace(nplinks, 'https://www.reddit.com/$1');
        $(this).attr('href', fixed);
      }

      if (href.match(nonhttps)) {
        var fixed = href.replace(nonhttps, 'https://www.reddit.com/$1');
        $(this).attr('href', fixed);
      }
    }
  )
}
