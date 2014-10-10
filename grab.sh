# Set the environmental variable GM_SCRIPTS to the Greasemonkey script directory.

# Example:

# export GM_SCRIPTS=/c/Users/[user]/AppData/Roaming/Mozilla/Firefox/Profiles/[code].default/gm_scripts

# Copy user scripts from Firefox profile to this directory.
cp "$GM_SCRIPTS/Reddit_Eliminate_Report_and_Save_Links/RedditEliminateReportLinks.user.js" .
cp "$GM_SCRIPTS/Reddit_Fix_http_and_np_Links/RedditFixHTTPAndNPLinks.user.js" .
cp "$GM_SCRIPTS/Reddit_Floating_Link/RedditFloatingLink.user.js" .
cp "$GM_SCRIPTS/Reddit_Hide_All/RedditHideAll.user.js" .
cp "$GM_SCRIPTS/Reddit_Subreddit_Filter/RedditSubredditFilter.user.js" .
cp "$GM_SCRIPTS/Reddit_Toggle_Side_Bar_and_Footer/RedditToggleSideBarAndFooter.user.js" .

# Remove UTF-8 BOM
for f in *.user.js
do
    awk '{ if (NR==1) sub(/^\xef\xbb\xbf/,""); print }' "$f" > "$f-fixed"
    rm "$f"
    mv "$f-fixed" "$f"
done

# Convert /n to /r/n
unix2dos.exe *.user.js
