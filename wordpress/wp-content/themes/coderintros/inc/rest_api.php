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

// add social links to posts
add_action( 'rest_api_init', function () {
  register_rest_field( 'post', '_social_links', [
    'get_callback' => function ( $object ) {
      return [
        'hacker_news' => get_post_meta( $object['id'], 'hacker_news_url', true ),
        'reddit' => get_post_meta( $object['id'], 'reddit_url', true )
      ];
    }
  ] );
} );

// add a custom endpoint for site details
add_action( 'rest_api_init', function () {
  register_rest_route( 'ci', '/site_details', [
    'methods' => 'GET',
    'callback' => function () {
      return [
        'name' => get_bloginfo( 'name' ),
        'description' => get_bloginfo( 'description' ),
        'home' => get_home_url(),
        'facebook_app_id' => get_option( 'facebook_app_id' ),
        'facebook_page_url' => get_option( 'facebook_page_url' ),
        'facebook_modal_title' => get_option( 'facebook_modal_title' ),
        'facebook_modal_title_auto_open' => get_option( 'facebook_modal_title_auto_open' ),
        'facebook_modal_body' => get_option( 'facebook_modal_body' ),
        'facebook_modal_body_auto_open' => get_option( 'facebook_modal_body_auto_open' ),
        'facebook_modal_delay' => intval( get_option( 'facebook_modal_delay' ) ),
        'ga_tracking_id' => get_option( 'ga_tracking_id' ),
        'mailchimp_form_html' => get_option( 'mailchimp_form_html' )
      ];
    },
  ] );
} );
