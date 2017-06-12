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

// expire the cache when the site is updated
add_action( 'save_post', 'expire_varnish_cache' );
function expire_varnish_cache () {
  wp_remote_request( get_home_url(), ['method' => 'BAN'] );
}

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

  register_setting(
    'general',
    'facebook_modal_cta'
  );

  register_setting(
    'general',
    'facebook_modal_delay'
  );

  register_setting(
    'general',
    'facebook_app_id'
  );

  register_setting(
    'general',
    'ga_tracking_id'
  );

  register_setting(
    'general',
    'mailchimp_form_html'
  );

  add_settings_field(
    'facebook_page_url',
    '<label for="facebook_page_url">' . __( 'Facebook Page (URL)' , 'facebook_page_url' ) . '</label>',
    function () {
      $option = get_option('facebook_page_url');
      echo "<input id='facebook_page_url' name='facebook_page_url' type='text' class='regular-text code' value='{$option}' />";
    },
    'general'
  );

  add_settings_field(
    'facebook_modal_cta',
    '<label for="facebook_modal_cta">' . __( 'Facebook Modal CTA' , 'facebook_modal_cta' ) . '</label>',
    function () {
      $option = get_option('facebook_modal_cta');
      echo "<input id='facebook_modal_cta' name='facebook_modal_cta' type='text' class='regular-text' value='{$option}' />";
    },
    'general'
  );

  add_settings_field(
    'facebook_modal_delay',
    '<label for="facebook_modal_delay">' . __( 'Facebook Modal Delay (MS)' , 'facebook_modal_delay' ) . '</label>',
    function () {
      $option = get_option('facebook_modal_delay');
      echo "<input id='facebook_modal_delay' name='facebook_modal_delay' type='number' class='regular-text code' value='{$option}' />";
      echo "<p class='description'>How long until the modal auto-opens. Set to no value to disable.</p>";
    },
    'general'
  );

  add_settings_field(
    'facebook_app_id',
    '<label for="facebook_app_id">' . __( 'Facebook App ID' , 'facebook_app_id' ) . '</label>',
    function () {
      $option = get_option('facebook_app_id');
      echo "<input id='facebook_app_id' name='facebook_app_id' type='text' class='regular-text code' value='{$option}' />";
    },
    'general'
  );

  add_settings_field(
    'ga_tracking_id',
    '<label for="ga_tracking_id">' . __( 'Google Analytics Tracking ID' , 'ga_tracking_id' ) . '</label>',
    function () {
      $option = get_option('ga_tracking_id');
      echo "<input id='ga_tracking_id' name='ga_tracking_id' type='text' class='regular-text code' value='{$option}' />";
    },
    'general'
  );

  add_settings_field(
    'mailchimp_form_html',
    '<label for="mailchimp_form_html">' . __( 'Mailchimp Form HTML' , 'mailchimp_form_html' ) . '</label>',
    function () {
      $option = get_option('mailchimp_form_html');
      echo "<textarea id='mailchimp_form_html' name='mailchimp_form_html' class='regular-text'>{$option}</textarea>";
    },
    'general'
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

// add custom fields to objects
add_action( 'rest_api_init', function () {
  register_rest_field( 'page', '_custom_fields', [
    'get_callback' => function ( $object ) {
      return [
        'hide_title' => get_post_meta( $object['id'], 'hide_title', true ) == '1'
      ];
    }
  ]);
} );
