<?php

function purge_cloudflare_cache () {
  $zone_id = get_option( 'cloudflare_zone_id' );
  $email = get_site_option( 'cloudflare_email' );
  $api_key = get_site_option( 'cloudflare_api_key' );

  if ( !empty( $api_key ) && !empty( $email ) && !empty( $zone_id ) ) {
    wp_remote_request(
      'https://api.cloudflare.com/client/v4/zones/' . $zone_id . '/purge_cache', [
        'body' => '{"purge_everything":true}',
        'headers' => [
          'Content-Type' => 'application/json',
          'X-Auth-Email' => $email,
          'X-Auth-Key' => $api_key
        ],
        'method' => 'DELETE'
      ]
    );
  }
}

function purge_varnish_cache () {
  wp_remote_request( get_home_url(), ['method' => 'BAN'] );
}

add_action( 'save_post', 'purge_varnish_cache' );
add_action( 'save_post', 'purge_cloudflare_cache' );

// add a custom endpoint to purge all site caches
// useful when called from a post-deploy hook
add_action( 'rest_api_init', function () {
  register_rest_route( 'ci', '/purge_all_caches', [
    'methods' => 'DELETE',
    'callback' => function () {
      foreach( get_sites() as $site ) {
        switch_to_blog( $site->blog_id );
        purge_cloudflare_cache();
        purge_varnish_cache();
      }
    }
  ] );
} );
