MB ImageChimp RSS Feed Enhancer
===============================

WordPress plugin that extends the default RSS Feed with media elements for use with MailChimp.

**TO USE**
* Install and activate plugin
* make sure your recent posts has a featured image
* Use the \*|RSSITEM:IMAGE|\* merge-tag in your MailChimp template to show the featured image


===

**What it does**
Once activated this plugin will add the following to your sites default rss feed:

***To the rss name space declarations:***

    xmlns:media="http://search.yahoo.com/mrss/"

***To each individual item (if it has a featured image):***

    <media:content url="[url]" type="[mimetype]" medium="image" width="100%" height="auto">
        <media:description type="plain"><![CDATA[title]]></media:description>
    </media:content>

 
**This plugin contains**
* 100% clean lightweight code.
* 0% JS
* 0% CSS
* 0% options

The plugin uses the hooks ‘rss2_ns’ and ‘rss2_item’, part of the WordPress core API.<br>
Tested with WP 3.7.1 and MailChimp Dec 2013

Contribute via [github](https://github.com/mikkelbreum/MB-ImageChimp-RSS-Feed-Enhancer/ "MB-ImageChimp-RSS-Feed-Enhancer")

