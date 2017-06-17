<?php

function expire_varnish_cache () {
  wp_remote_request( get_home_url(), ['method' => 'BAN'] );
}

add_action( 'save_post', 'expire_varnish_cache' );

// TODO: figure out why the following hooks
// cause a mysql too many connections error:
// add_action( 'update_site_option', 'expire_varnish_cache' );
// add_action( 'update_option', 'expire_varnish_cache' );
