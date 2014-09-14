# Greasemonkey Userscripts

## Reddit: Eliminate Report and Save Links

Remove the report, save, share, and watch links at reddit.com.

Works as of 2014-09-08.

[Userscripts.org](http://userscripts.org/scripts/show/16501)
[Userscripts-mirror.org](http://userscripts-mirror.org/scripts/show/16501)
[Install from Github](https://raw.githubusercontent.com/alienacorn/userscripts/master/RedditEliminateReportLinks.user.js)

## Reddit Filter Plus

Hide or highlight links by user, title, url or subreddit. Preferences
are found on the regular reddit preferences page. Highlight colors may
be entered as HTML colors (#123456) or with simple names.

License: GPL version 2 <http://www.gnu.org/licenses/gpl-2.0.html>

Written by Jesper Öqvist, <http://llbit.se/>

Does not work as of 2014-09-08.

[Userscripts.org](http://userscripts.org/scripts/show/33419)
[Userscripts-mirror.org](http://userscripts-mirror.org/scripts/show/33419)
[Install from Github](https://raw.githubusercontent.com/alienacorn/userscripts/master/RedditFilterPlus.user.js)

## Reddit: Fix http and np Links

Fix internal links on Reddit:

```
http://www.reddit.com/* -> https://www.reddit.com/*
http[s]://np.reddit.com/* -> https://www.reddit.com/*
```

Works as of 2014-09-12.

[Install from Github](https://raw.githubusercontent.com/alienacorn/userscripts/master/RedditFixHTTPAndNPLinks.user.js)

## Reddit: Floating Link

Adds a floating article link to the Reddit comments page.

Works as of 2014-09-08.

[Userscripts.org](http://userscripts.org/scripts/show/12464)
[Userscripts-mirror.org](http://userscripts-mirror.org/scripts/show/12464)
[Install from Github](https://raw.githubusercontent.com/alienacorn/userscripts/master/RedditFloatingLink.user.js)

## Reddit Hide All

Adds a button next to the logo to Hide All.

Written by Douglas Beck, <http://douglasbeck.com/scripts/reddit/>

Works as of 2014-09-08.

[Userscripts.org](http://userscripts-mirror.org/scripts/show/35704)
[Userscripts-mirror.org](http://userscripts-mirror.org/scripts/show/35704)
[Install from Github](https://raw.githubusercontent.com/alienacorn/userscripts/master/RedditHideAll.user.js)

## Reddit: Subreddit Filter

Hides links from specified subreddits.

Works as of 2014-09-13.

[Install from Github](https://raw.githubusercontent.com/alienacorn/userscripts/master/RedditSubredditFilter.user.js)

## Reddit: Toggle Side Bar and Footer

Hides the Reddit side bar and adds a toggle link in the user control
panel area on the header. Modified to also hide the Footer.

Written by Jared McAteer, <http://jaredmcateer.com/>

Improved by theplaceboeffect on Userscripts.org.

Works as of 2014-09-12.

[Userscripts.org](http://userscripts-mirror.org/scripts/show/67594)
[Userscripts-mirror.org](http://userscripts-mirror.org/scripts/show/67594)
[Install from Github](https://raw.githubusercontent.com/alienacorn/userscripts/master/RedditToggleSideBarAndFooter.user.js)

# Show images bookmarklet

```js
var elementOrParentIsFixed = function (element) {
    var $element = $(element);
    var $checkElements = $element.add($element.parents());
    var isFixed = false;
    $checkElements.each(function(){
        if ($(this).css("position") === "fixed") {
            isFixed = true;
            return false;
        }
    });
    return isFixed;
};

var image_ext = /\.(gif|jpg|jpeg|png)$/;
var imgur_no_album = /^https?:\/\/[a-z.]*imgur\.com\/(?!(a|gallery)\/)(.*)/;

$('a[href]').each(function(){
  var href = $(this).attr('href');

  var img_src;
  var is_img = false;
  if (href.match(image_ext)){
    is_img = true;
    img_src = href;
  } else if (href.match(imgur_no_album)) {
    is_img = true;
    img_src = href.replace(imgur_no_album, 'http://i.imgur.com/$2.jpg');
  }

  if (is_img) {
    if(elementOrParentIsFixed(this)) return;
    var img = $('<img>');
    img.attr('src', img_src);
    img.css('max-width', '1000px');
    $(this).after('<br>', img, '<br>');
    img.show();
  }
});
```

Run through [minifier](http://javascript-minifier.com/) and then [bookmarklet maker](http://mrcoles.com/bookmarklet/):

```
javascript:(function()%7Bvar%20elementOrParentIsFixed%3Dfunction(r)%7Bvar%20t%3D%24(r)%2Ce%3Dt.add(t.parents())%2Ca%3D!1%3Breturn%20e.each(function()%7Breturn%22fixed%22%3D%3D%3D%24(this).css(%22position%22)%3F(a%3D!0%2C!1)%3Avoid%200%7D)%2Ca%7D%2Cimage_ext%3D%2F%5C.(gif%7Cjpg%7Cjpeg%7Cpng)%24%2F%2Cimgur_no_album%3D%2F%5Ehttps%3F%3A%5C%2F%5C%2F%5Ba-z.%5D*imgur%5C.com%5C%2F(%3F!(a%7Cgallery)%5C%2F)(.*)%2F%3B%24(%22a%5Bhref%5D%22).each(function()%7Bvar%20r%2Ct%3D%24(this).attr(%22href%22)%2Ce%3D!1%3Bif(t.match(image_ext)%3F(e%3D!0%2Cr%3Dt)%3At.match(imgur_no_album)%26%26(e%3D!0%2Cr%3Dt.replace(imgur_no_album%2C%22http%3A%2F%2Fi.imgur.com%2F%242.jpg%22))%2Ce)%7Bif(elementOrParentIsFixed(this))return%3Bvar%20a%3D%24(%22%3Cimg%3E%22)%3Ba.attr(%22src%22%2Cr)%2Ca.css(%22max-width%22%2C%221000px%22)%2C%24(this).after(%22%3Cbr%3E%22%2Ca%2C%22%3Cbr%3E%22)%2Ca.show()%7D%7D)%7D)()
```
