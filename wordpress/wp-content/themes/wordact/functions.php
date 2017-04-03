<?php

// enable thumbnail sizes to match the layout
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
add_action( 'admin_init', function() {
  setcookie( 'wp_rest_nonce',  wp_create_nonce( 'wp_rest' ), 0, '/');
} );

// allow users to comment without first creating wordpress accounts
add_filter( 'rest_allow_anonymous_comments', function () {
  return true;
} );

// REST customizations:
add_action( 'rest_api_init', function () {
  // add the "subtitle" field to posts and pages
  // requires this plugin to be active: https://wordpress.org/plugins/wp-subtitle/
  $subtitle_args = ['get_callback' => function ( $post ) {
    return get_post_meta( $post['id'], 'wps_subtitle', true );
  }];
  register_rest_field( 'post', 'subtitle', $subtitle_args );
  register_rest_field( 'page', 'subtitle', $subtitle_args );

  // add the ability for pages to have different nav titles than post titles
  register_rest_field( 'page', 'nav_title', [
    'get_callback' => function ( $page ) {
      return get_post_meta( $page['id'], 'nav_title', true );
    }
  ] );

  // return custom, uploaded user profile pictures
  // requires this plugin: https://wordpress.org/plugins/custom-user-profile-photo/
  register_rest_field( 'user', 'profile_picture', [
    'get_callback' => function ( $user ) {
      if ( get_cupp_meta( $user['id'] ) ) {
        $sizes = [];
        foreach ( get_intermediate_image_sizes() as $size ) {
          $sizes[$size] = ['source_url' => get_cupp_meta( $user['id'], $size )];
        }
        return [
          'alt_text' => $user['name'] . "'s profile picture",
          'sizes' => $sizes
        ];
      }
    }
  ] );

  // return an array of links and titles to monthly archive pages
  register_rest_route( 'wordact', '/archives_links', [
    'methods' => 'GET',
    'callback' => function () {
      preg_match_all( '/href=(?:\'|")(.+?)(?:\'|")\s*>\s*(.+?)\</', wp_get_archives( ['echo' => false] ), $matches );
      $links = [];
      for ( $i = 0; $i < count($matches[1]); $i++ ) {
        array_push( $links, ['link' => $matches[1][$i], 'title' => $matches[2][$i]] );
      }
      return $links;
    },
  ] );
} );
