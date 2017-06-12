<?php

require_once( 'inc/settings.php' );
require_once( 'inc/rest_api.php' );

// images
add_theme_support( 'post-thumbnails' );
update_option( 'medium_size_w', 300 );
update_option( 'medium_size_h', 300 );
update_option( 'medium_crop', 1 );
update_option( 'medium_large_size_w', 600 );
update_option( 'medium_large_size_h', 600 );
update_option( 'medium_large_crop', 1 );
update_option( 'large_size_w', 1200 );
update_option( 'large_size_h', 1200 );
update_option( 'large_crop', 1 );

// expire the cache when the site is updated
// will not work in dev because url is not externally reachable!
add_action( 'save_post', function () {
  wp_remote_request( get_home_url(), ['method' => 'BAN'] );
} );

// set an nonce cookie to give our react codebase the ability to access authorized routes
// read about nonces here: https://codex.wordpress.org/WordPress_Nonces
add_action( 'admin_init', function () {
  setcookie( 'wp_rest_nonce',  wp_create_nonce( 'wp_rest' ), 0, '/' );
} );
