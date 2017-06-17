<?php

function expire_cache () {
  // expire our local varnish vache
  wp_remote_request( get_home_url(), ['method' => 'BAN'] );

  // expire cloudflare cache
  $cloudflareEmail = get_site_option( 'cloudflare_email' );
  $cloudflareApiKey = get_site_option( 'cloudflare_api_key' );
  $cloudflareZoneId = get_option( 'cloudflare_zone_id' );

  if (
    ! empty( $cloudflareApiKey ) &&
    ! ( empty( $cloudflareEmail ) ) &&
    ! ( empty( $cloudflareZoneId ) )
  ) {
    wp_remote_request(
      'https://api.cloudflare.com/client/v4/zones/' . $cloudflareZoneId . '/purge_cache', [
        'body' => '{"purge_everything":true}',
        'headers' => [
          'Content-Type' => 'application/json',
          'X-Auth-Email' => $cloudflareEmail,
          'X-Auth-Key' => $cloudflareApiKey
        ],
        'method' => 'DELETE'
      ]
    );
  }
}

add_action( 'save_post', 'expire_cache' );

// TODO: figure out why the following hooks
// cause a mysql too many connections error:
// add_action( 'update_site_option', 'expire_varnish_cache' );
// add_action( 'update_option', 'expire_varnish_cache' );
