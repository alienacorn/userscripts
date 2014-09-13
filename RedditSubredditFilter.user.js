// ==UserScript==
// @name        Reddit: Subreddit Filter
// @description Hides links from specified subreddits
// @namespace   http://github.com/alienacorn
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @match       *://*.reddit.com/r/all*
// ==/UserScript==

var htmlToInsert = '';
htmlToInsert += '<span id="sub_filter_form">';
htmlToInsert += ' <input id="sub_filter_input" size="50">';
htmlToInsert += ' <button id="sub_filter_button">save</button>';
htmlToInsert += '</span>';
htmlToInsert += '<a id="sub_filter_link">edit filters</a>';

$('span.nextprev').prepend(htmlToInsert);
$('#sub_filter_input').val(GM_getValue("filtered"));
$('#sub_filter_form').hide();
$('#sub_filter_link').click(function(){
  $('#sub_filter_form').show();
  $('#sub_filter_link').hide();
});
$('#sub_filter_button').click(function(){
  $('#sub_filter_form').hide();
  $('#sub_filter_link').show();
  GM_setValue("filtered", $('#sub_filter_input').val());
});

var filters = GM_getValue("filtered").split(';');
var filterCount = 0;
for(var i=0; i<filters.length; i++){
  $('a.subreddit').each(function(){
    if($(this).html().toLowerCase()=='/r/'+filters[i].toLowerCase()){
      $(this).parent().parent().parent().parent().addClass('sub_filtered');
      filterCount++;
    }
  });
}

$('.sub_filtered').hide().css('background', 'yellow');

if(filterCount>0){
  $('span.nextprev').prepend('<a id="sub_filter_show">show ' + filterCount+ ' filtered links</a> ');
  $('a#sub_filter_show').click(function(){
    $('.sub_filtered').show();
    $('a#sub_filter_show').hide();
  });
}
