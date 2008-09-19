// ==UserScript==
// @name	Reddit Filter Plus
// @description	Hide unwanted links by user, title, or site. Preferences are found on the regular reddit preferences page.
// @include	http://www.reddit.com/prefs/
// @include	http://www.reddit.com/*
// @exclude	http://www.reddit.com/user/*
// @exclude	http://www.reddit.com/info/*
// @exclude	http://www.reddit.com/r/*/comments/*
// ==/UserScript==

var hidden_headlines = [];

if (typeof GM_log === "undefined") {
  GM_log = function (msg) {};
}
if (typeof GM_setValue === "undefined") {
  GM_setValue = function (name, value) {
    var date = new Date();
    date.setTime(expdate.getTime()+(750*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
    document.cookie = name+"="+value+expires+"; path=/";
  }
}
if (typeof GM_getValue === "undefined") {
  GM_getValue = function (name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; ++i) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1 ,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}

load_config = function() {
  var v;
	
  get_key = function(key) {
    var v = GM_getValue(key);
    return v ? v.split(/\s*,\s*/) : [];
  }
	
  return {
    users: get_key('users'),
    titles: get_key('titles'),
    urls: get_key('urls'),
    subreddits: get_key('subreddits')
  }
}

get_regexps = function(cfg) {
  var i, regextbl = { user: [], url: [], title: [], subreddit: [] };
	
	// add user matches
  for (i = 0; i < cfg.users.length; i++) {
    regextbl.user.push('http://www.reddit.com/user/' + cfg.users[i] + '/');
  }
	
	// add subreddit matches
  for (i = 0; i < cfg.subreddits.length; i++) {
    regextbl.subreddit.push('http://www.reddit.com/r/' + cfg.subreddits[i] + '/');
  }

	// add url matches
  for (i = 0; i < cfg.urls.length; i++) {
    regextbl.url.push(new RegExp(cfg.urls[i], 'i'));
  }
	
	// add title matches
  for (i = 0; i < cfg.titles.length; i++) {
    regextbl.title.push(new RegExp(cfg.titles[i], 'i'));
  }
	
  return regextbl;
}

rf_doFilter = function(cfg)
{
  var trs = document.getElementsByTagName('div');
  var num_matches = 0;
  var regexps = get_regexps(cfg);

  for (var i = 0; i < trs.length; i++) {
    var tr = trs[i];

		
    if (/^thingrow_/.test(tr.id)) {
      var match = false;
      var a_list = tr.getElementsByTagName('a');
      for (var j = 0; !match && j < a_list.length; j++) {
        var a_element = a_list[j];
			
        if (/^title/.test(a_element.className)) {
					// title match
          for (var k = 0; k < regexps.title.length; ++k) {
            if (regexps.title[k].test(a_element.innerHTML)) {
              tr.style.display = 'none';
              hidden_headlines.push(tr);
              ++num_matches;
              match = true;
              break;
            }
          }
					
					// url match
          for (var k = 0; k < regexps.url.length; ++k) {
            if (regexps.url[k].test(a_element.href)) {
              tr.style.display = 'none';
              hidden_headlines.push(tr);
              ++num_matches;
              match = true;
              break;
            }
          }
        } else if (a_element.className == 'author') {
					// user match
          for (var k = 0; k < regexps.user.length; ++k) {
            if (regexps.user[k] == a_element.href) {
              tr.style.display = 'none';
              hidden_headlines.push(tr);
              ++num_matches;
              match = true;
              break;
            }
          }
        } else if (a_element.className == 'hover') {
					// subreddit match
          for (var k = 0; k < regexps.subreddit.length; ++k) {
            if (regexps.subreddit[k] == a_element.href) {
              tr.style.display = 'none';
              hidden_headlines.push(tr);
              ++num_matches;
              match = true;
              break;
            }
          }
					//a_element.style.display = 'none';
        }
			
      }
    }
  }

  return num_matches;
}

rf_saveOptions = function() {
  GM_setValue('titles', document.getElementById('titlefilter').value);
  GM_setValue('urls', document.getElementById('urlfilter').value);
  GM_setValue('users', document.getElementById('userfilter').value);
  GM_setValue('subreddits', document.getElementById('subredditfilter').value);
  GM_log('Saved settings. ['+document.getElementById('userfilter').value+']');
}

rf_loadOptions = function() {
  document.getElementById('titlefilter').value = GM_getValue('titles') ? GM_getValue('titles') : '';
  document.getElementById('urlfilter').value = GM_getValue('urls') ? GM_getValue('urls') : '';
  document.getElementById('userfilter').value = GM_getValue('users') ? GM_getValue('users') : '';
  document.getElementById('subredditfilter').value = GM_getValue('subreddits') ? GM_getValue('subreddits') : '';
}

rf_prefs = function() {
  var forms = document.getElementsByTagName('form');
  var newForm = document.createElement('form');
	//var saveButton = document.createElement('input');
	
  for (var i = 0; i < forms.length; ++i) {
    if (forms[i].className == 'pretty-form short-text') {
      forms[i].parentNode.insertBefore(newForm, forms[i].nextSibling);
    }
  }
	
  newForm.className = 'pretty-form';
  newForm.innerHTML = '<h1>Filter Options</h1><table class="content preftable"><tr><th>title filters</th><td class="prefright"><input id="titlefilter" type="text" value="" /></td></tr><tr><th>url filters</th><td class="prefright"><input id="urlfilter" type="text" value="" /></td></tr><tr><th>user filters</th><td class="prefright"><input id="userfilter" type="text" value="" /></td></tr><tr><th>subreddit filters</th><td class="prefright"><input id="subredditfilter" type="text" value="" /></td></tr><tr><td><input id="savefilter" type="button" class="btn" value="save filter options" /></td></tr></table>';
  document.getElementById('savefilter').addEventListener('click', rf_saveOptions, false);
  rf_loadOptions();
}

rf_report = function(num) {
  var tbl = document.getElementById('siteTable'),
  div = document.createElement('div'),
  msg = num + ' headlines filtered: ';
  if (!tbl) {
    tbl = document.getElementById('siteTable_organic');
  }
	
  GM_log(msg);
  if (!tbl)
  return;
	
  div.innerHTML = '<p id="rf_report"><i>' + msg + ' <a id="rf_unhide" onClick="rf_unhide()">[unhide]</a><i></p>';
  tbl.parentNode.insertBefore(div, tbl.nextSibling);
  document.getElementById('rf_unhide').addEventListener('click', rf_unhide, false);
}

rf_unhide = function() {
  for (var i = 0; i < hidden_headlines.length; ++i) {
    hidden_headlines[i].style.display = '';
    hidden_headlines[i].style.backgroundColor = 'yellow';
  }
  document.getElementById('rf_report').style.display = 'none';
}

var cfg = load_config();

if (/\/prefs\//.test(window.location.href)) {
  rf_prefs();
} else {
  var matches = rf_doFilter(cfg);
  rf_report(matches);
}
