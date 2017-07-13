<?php

// by default, don't show password protected posts
// this keeps password-protected posts out of our feed and xmlrpc list
// we'll still need to manually filter for REST requests
// https://codex.wordpress.org/Using_Password_Protection
add_action( 'pre_get_posts', function ( $query ) {
  if ( !is_single() && !is_page() && !is_admin() && !REST_REQUEST ) {
    add_filter( 'posts_where', function ( $where ) {
      global $wpdb;
      return $where .= " AND {$wpdb->posts}.post_password = '' ";
    } );
  }
} );
