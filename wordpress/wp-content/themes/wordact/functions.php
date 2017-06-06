<?php

// images
add_theme_support( 'post-thumbnails' );
update_option( 'medium_size_w', 300 );
update_option( 'medium_size_h', 125 );
update_option( 'medium_crop', 1 );
update_option( 'medium_large_size_w', 600 );
update_option( 'medium_large_size_h', 250 );
update_option( 'medium_large_crop', 1 );
update_option( 'large_size_w', 1200 );
update_option( 'large_size_h', 500 );
update_option( 'large_crop', 1 );

// every time a post is saved, clear the varnish cache
add_action( 'save_post', function () {
  wp_remote_request( get_home_url(), ['method' => 'BAN'] );
} );

// set an nonce cookie to give our react codebase the ability to access authorized routes
// read about nonces here: https://codex.wordpress.org/WordPress_Nonces
add_action( 'admin_init', function () {
  setcookie( 'wp_rest_nonce',  wp_create_nonce( 'wp_rest' ), 0, '/' );
} );
