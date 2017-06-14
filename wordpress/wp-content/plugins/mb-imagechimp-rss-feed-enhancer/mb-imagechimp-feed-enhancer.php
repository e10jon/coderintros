<?php
/*
 * Plugin Name:   MB ImageChimp RSS Feed Enhancer
 * Plugin URI:    http://mikkelbreum.com/wordpress-plugins/mb-imagechimp-rss-feed-enhancer/
 * Description:   Adds featured images to the default RSS Feed for use with MailChimps image merge tags. 
 * Version:       1.0
 * Author:        Mikkel Breum
 * Author URI:    http://www.mikkelbreum.com
 * License: GPLv2
 * Released under the GPL license
 * http://www.gnu.org/copyleft/gpl.html
 *
 *    This program is free software; you can redistribute it and/or modify
 *    it under the terms of the GNU General Public License as published by
 *    the Free Software Foundation; either version 2 of the License, or
 *    (at your option) any later version.
 *
 *    This program is distributed in the hope that it will be useful,
 *    but WITHOUT ANY WARRANTY; without even the implied warranty of
 *    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *    GNU General Public License for more details.
 *
 *    You should have received a copy of the GNU General Public License
 *    along with this program; if not, write to the Free Software
 *    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

add_action('init', 'mb_rss_extend' );

function mb_rss_extend(){
	
	// Add the media namespace to the rss namespace declaration block
	add_action( 'rss2_ns', 'mb_rss_extend_namespace_media' );	

	// Add a media element to the feed item if the post has a featured image
	add_action( 'rss2_item', 'mb_rss_extend_item_media' );

	// overrides the actual image dimension with 100% width and auto height
	// to use the actual image dimensions simply remove this filter via a plugin or your functions.php
	// using remove_filter( 'mb_rss_extend_item_media_image_dimension', 'mb_rss_image_fullwidth' );
	// call remove_filter on the 'init' hook.
	add_filter( 'mb_rss_extend_item_media_image_dimension', 'mb_rss_image_fullwidth');
}


function mb_rss_image_fullwidth(){

	return array('width' => '100%', 'height' => 'auto');

}


// Add the media namespace to the rss namespace declaration block

function mb_rss_extend_namespace_media() {	
    echo 'xmlns:media="http://search.yahoo.com/mrss/"';
}


function mb_rss_extend_item_media() {

	global $post;

	if(!has_post_thumbnail( $post->ID )){
		return;
	}

	$img_id		= get_post_thumbnail_id($post->ID);
	$img_attr 	= wp_get_attachment_image_src( $img_id, apply_filters('mb_rss_extend_item_media_image_size','large') );
	$img_url 	= $img_attr[0];
	$img_dimension 	= apply_filters( 'mb_rss_extend_item_media_image_dimension', array('width' => $img_attr[1], 'height' => $img_attr[2]) );

	$img_mime_type	= get_post_mime_type($img_id);
	$img_title		= get_the_title($img_id);

	$out = PHP_EOL.'		<media:content url="'.$img_url.'" type="'.$img_mime_type.'" medium="image" width="'.$img_dimension['width'].'" height="'.$img_dimension['height'].'">'
          .PHP_EOL.'				<media:description type="plain"><![CDATA['.$img_title.']]></media:description>'
          .PHP_EOL.'		</media:content>'
	;

	echo apply_filters( 'mb_rss_extend_item_media_out', $out );

}
