<?php

// add formatting options to object responses
add_action( 'rest_api_init', function () {
  function formatting_callback ( $object ) {
    return [
      'hide_title' => get_post_meta( $object['id'], 'hide_title', true ) == '1'
    ];
  }

  register_rest_field(
    'page',
    '_formatting',
    ['get_callback' => 'formatting_callback']
  );

  register_rest_field(
    'post',
    '_formatting',
    ['get_callback' => 'formatting_callback']
  );
} );

// add a custom endpoint for site details
add_action( 'rest_api_init', function () {
  register_rest_route( 'ci', '/site_details', [
    'methods' => 'GET',
    'callback' => function () {
      return [
        'name' => get_bloginfo( 'name' ),
        'description' => get_bloginfo( 'description' ),
        'facebook_app_id' => get_option( 'facebook_app_id' ),
        'facebook_page_url' => get_option( 'facebook_page_url' ),
        'facebook_modal_cta' => get_option( 'facebook_modal_cta' ),
        'facebook_modal_delay' => intval( get_option( 'facebook_modal_delay' ) ),
        'ga_tracking_id' => get_option( 'ga_tracking_id' ),
        'mailchimp_form_html' => get_option( 'mailchimp_form_html' )
      ];
    },
  ] );
} );
