<?php

require_once( 'inc/purge.php' );
require_once( 'inc/helpers.php' );
require_once( 'inc/mu-settings.php' );
require_once( 'inc/settings.php' );
require_once( 'inc/rest_api.php' );

// images
add_theme_support( 'post-thumbnails' );
update_option( 'thumbnail_size_w', 300 );
update_option( 'thumbnail_size_h', 300 );
update_option( 'thumbnail_crop', 1 );
update_option( 'medium_size_w', 600 );
update_option( 'medium_size_h', 315 );
update_option( 'medium_crop', 1 );
update_option( 'medium_large_size_w', 1200 );
update_option( 'medium_large_size_h', 630 );
update_option( 'medium_large_crop', 1 );
update_option( 'large_size_w', 2400 );
update_option( 'large_size_h', 1260 );
update_option( 'large_crop', 1 );

// set an nonce cookie to give our react codebase the ability to access authorized routes
// read about nonces here: https://codex.wordpress.org/WordPress_Nonces
add_action( 'admin_init', function () {
  setcookie( 'wp_rest_nonce',  wp_create_nonce( 'wp_rest' ), 0, '/' );
} );

// change pages to have a path prefix
add_action( 'init', function () {
  global $wp_rewrite;
  $wp_rewrite->page_structure = $wp_rewrite->root . 'pages/%pagename%';
} );
