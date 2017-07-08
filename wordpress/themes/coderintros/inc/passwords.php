<?php

// don't show password protected posts in feeds
// https://codex.wordpress.org/Using_Password_Protection
add_action( 'pre_get_posts', function ( $query ) {
  if ( is_feed() ) {
    add_filter( 'posts_where', function ( $where ) {
      global $wpdb;
      return $where .= " AND {$wpdb->posts}.post_password = '' ";
    } );
  }
} );
