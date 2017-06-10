<?php

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

// every time a post is saved, clear the varnish cache
add_action( 'save_post', function () {
  wp_remote_request( get_home_url(), ['method' => 'BAN'] );
} );

// set an nonce cookie to give our react codebase the ability to access authorized routes
// read about nonces here: https://codex.wordpress.org/WordPress_Nonces
add_action( 'admin_init', function () {
  setcookie( 'wp_rest_nonce',  wp_create_nonce( 'wp_rest' ), 0, '/' );
} );

// add a facebook page setting in the Settings->General section
add_action( 'admin_init', function () {
  register_setting(
    'general',
    'facebook_page_url'
  );

  add_settings_field(
    'facebook_page_url',
    '<label for="facebook_page_url">' . __( 'Facebook Page (URL)' , 'facebook_page_url' ) . '</label>',
    function () {
      $option = get_option('facebook_page_url');
      echo "<input id='facebook_page_url' name='facebook_page_url' size='40' type='text' class='regular-text code' value='{$option}' />";
    },
    'general'
  );
} );

// add a custom endpoint for site details
add_action( 'rest_api_init', function () {
  register_rest_route( 'wordact', '/site_details', [
    'methods' => 'GET',
    'callback' => function () {
      return [
        'name' => get_bloginfo( 'name' ),
        'description' => get_bloginfo( 'description' ),
        'facebook_page_url' => get_option( 'facebook_page_url' )
      ];
    },
  ] );
} );
