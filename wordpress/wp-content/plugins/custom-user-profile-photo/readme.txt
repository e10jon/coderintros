=== Plugin Name ===
Contributors: 3five, VincentListrani, jmichaelward
Donate link: 
Tags: custom profile photo, custom profile picture, profile picture, user profile, profile photo, user profile photo, user profile picture
Requires at least: 3.6.1
Tested up to: 4.7.3
Stable tag: 0.5.3
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Add a customized User Profile photo to a WordPress user profile.

== Description ==

A more flexible way to attach and display a photo for a WordPress user profile.

Some users might not have or want to have a gravatar account or other universal avatar account. They simply may want to use a one-time specified photo to represent them on your WordPress site. This plugin solves that use case.

With the ability to upload a photo to a user profile via the WordPress Media Uploader or by specifying an external URL to an image, your users and/or authors can have a personalized photo specific to your website.*

This plugin will add a custom set of fields to the user profile page which will allow for the use of a custom profile photo.

You can add/change/edit uploaded photos directly from the user profile page. The external option allows you to provide a URL to the external image or remove it.

**As of v0.4**, the plugin now filters the get_avatar() function found in most WordPress themes.

Simply go to the users section and select a user or select "Your Profile" depending on your permission level. The new fields are added to the bottom of the user profile page. Choose which type of photo you want to use. Upload an image or add an external url. Then press the Update Profile button.

If you require a customized approach or your theme does not support the get_avatar() hook, use the example below.

To retrieve the photo on the front-end use the following example on your template page(s).

`
<?php
	// Retrieve The Post's Author ID
	$user_id = get_the_author_meta('ID');
	// Set the image size. Accepts all registered images sizes and array(int, int)
	$size = 'thumbnail';

	// Get the image URL using the author ID and image size params
	$imgURL = get_cupp_meta($user_id, $size);

	// Print the image on the page
	echo '<img src="'. $imgURL .'" alt="">';
?>
`

You will need to place the code above in each area of your theme where you wish to add and retrieve your theme's custom avatar image. This can include but is not limited to single.php, page.php, and comments.php.

*Future Updates to this plugin include allowing other roles to access this feature, a settings page to allow a custom default image and other options.

== Installation ==

1. Upload `custom-user-profile-photo` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Place `<?php get_cupp_meta($user_id, $size); ?>` in your templates

== Frequently Asked Questions ==

= Who can upload and manage these images? =

Currently, only a user with the upload_files capability can use this option.
Editors and Admins can upload and edit files.
Authors can only upload files.
Subscribers and Contributors cannot do either so an Admin will need to do this for them.

= I installed the plugin but I want to customize the output and placement of the image. Is this possible? =

Yes, you can still customize the output by using the get_cupp_meta() function. Please reference the code snippet below or on the Description tab.
`<?php echo get_cupp_meta($user_ID, $size); ?>`
Where the $user_ID is the users ID number and the size is a registered image size like 'thumbnail' or an array like `array(50,50)`.

== Screenshots ==

1. The new fields that are added to the user profile page.

2. After uploading and saving your selected image.

3. On hover, Edit or Remove an uploaded image.

4. On hover, Remove a URL to an external image.

5. An example of getting this new image to display on the front-end.

== Changelog ==

= 0.5.3 =
* Addressed an issue where an object being passed into `cupp_get_user_by_id_or_email` could potentially be the WP_Comment object.

= 0.5.2 =
* Fixed issue with a PHP warning when getting the user with the WP_User object.

= 0.5.1 =
* Fixed issue with `update_user_attribute`.

= 0.5 =
* Major Update - please be sure to backup your site and db.
* Replaced `update_user_meta` with `update_user_attribute` per WordPress VIP Standards.
* Replaced `get_home_url` with `get_site_url` for users where the edit image link was returning a 404. Credit: SOMTIJDS
* Fixed textdomain loading issue.
* Added Spanish translation. Credit: David Pérez
* Updated and formatted code per PHPCS. Credit: jmichaelward
* Refactored multiple functions and variables for simplicity and compatibility. Credit: jmichaelward

= 0.4 =
* Major Update - please be sure to backup your site and db.
* The plugin now overrides the WordPress avatar by filtering the get_avatar() hook.
* The get_cupp_meta() function still exists and can be used to customize the output (this will eventually be deprecated).

= 0.3 =
* Changed the function which gets the attachment post ID by GUID to the WordPress core function attachment_url_to_postid() for better reliability. (Props to sqhendr).

= 0.2.7 =
* Added Hungarian Translation (Thanks to Harkály Gergő)

= 0.2.6 =
* Fixed a bug where the save function required a different capability than the upload function (courtesy of douglas_johnson).

= 0.2.5 =
* Tested with WordPress v4.1
* Fixed a bug where the external URL option would not return the URL with get_cupp_meta().
* Fixed a bug where the saved image did not correspond to the selected radio button.
* Replaced depricated update_usermeta with update_user_meta.
* Improved image selection functionality.
* Images now show immediately after selecting an uploaded item or entering an external URL.
* Added Dutch translation - Thanks Olaf Lederer

= 0.2.4 =
* Tested with WordPress v3.8
* Updated description text. Better explanation of how to quickly use this plugin.

= 0.2.3 =
* Beta version release.

== Upgrade Notice ==

= 0.5.3 =
Addressed an issue where an object being passed into `cupp_get_user_by_id_or_email` could potentially be the WP_Comment object.

= 0.5.2 =
Fixed issue with a PHP warning when getting the user with the WP_User object.

= 0.5.1 =
Fixed issue with update_user_attribute.

= 0.5 =
Major Update - please be sure to backup your site and db. The plugin was refactored and restructured per PHPCS. Some functions were swapped for ones that were less costly or could cause a 404 response. Fixed textdomain issue for translations and added Spanish translation.

= 0.4 =
Major Update - please be sure to backup your site and db. The plugin now filters and overrides `get_avatar()`. This could affect your theme or other plugins you have installed.

= 0.3 =
Minor improvement.

= 0.2.6 =
Bug Fixes and minor improvements.

= 0.2.5 =
Bug Fixes and minor improvements.

= 0.2.3 =
Beta Release

== Translations ==

* English - default, always included
* Dutch
* Hungarian
* Spanish

== Credits ==

Thanks to [Olaf Lederer](https://profiles.wordpress.org/finalwebsites/), [Harkály Gergő](https://github.com/harkalygergo), [sqhendr](https://profiles.wordpress.org/sqhendr/), [SOMTIJDS](https://profiles.wordpress.org/somtijds/), [David Pérez](https://www.closemarketing.es)