<?php

// add a settings page
add_action( 'admin_init', function () {
  register_setting( 'ci', 'facebook_page_url' );
  register_setting( 'ci', 'facebook_modal_title' );
  register_setting( 'ci', 'facebook_modal_title_auto_open' );
  register_setting( 'ci', 'facebook_modal_body' );
  register_setting( 'ci', 'facebook_modal_body_auto_open' );
  register_setting( 'ci', 'facebook_modal_delay' );
  register_setting( 'ci', 'facebook_app_id' );
  register_setting( 'ci', 'ga_tracking_id' );
  register_setting( 'ci', 'mailchimp_form_html' );

  add_settings_section( 'ci_general', null, null, 'ci' );

  add_settings_field(
    'facebook_page_url',
    '<label for="facebook_page_url">' . __( 'Facebook Page (URL)' , 'facebook_page_url' ) . '</label>',
    function () {
      $option = get_option('facebook_page_url');
      echo "<input id='facebook_page_url' name='facebook_page_url' type='text' class='regular-text code' value='{$option}' />";
    },
    'ci',
    'ci_general'
  );

  add_settings_field(
    'facebook_modal_title',
    '<label for="facebook_modal_title">' . __( 'Facebook Modal Title' , 'facebook_modal_title' ) . '</label>',
    function () {
      $option = get_option('facebook_modal_title');
      echo "<input id='facebook_modal_title' name='facebook_modal_title' type='text' class='regular-text' value='{$option}' />";
    },
    'ci',
    'ci_general'
  );

  add_settings_field(
    'facebook_modal_title_auto_open',
    '<label for="facebook_modal_title_auto_open">' . __( 'Facebook Modal Title (Auto-Open)' , 'facebook_modal_title_auto_open' ) . '</label>',
    function () {
      $option = get_option('facebook_modal_title_auto_open');
      echo "<input id='facebook_modal_title_auto_open' name='facebook_modal_title_auto_open' type='text' class='regular-text' value='{$option}' />";
    },
    'ci',
    'ci_general'
  );

  add_settings_field(
    'facebook_modal_body',
    '<label for="facebook_modal_body">' . __( 'Facebook Modal Body' , 'facebook_modal_body' ) . '</label>',
    function () {
      $option = get_option('facebook_modal_body');
      echo "<input id='facebook_modal_body' name='facebook_modal_body' type='text' class='regular-text' value='{$option}' />";
    },
    'ci',
    'ci_general'
  );

  add_settings_field(
    'facebook_modal_body_auto_open',
    '<label for="facebook_modal_body_auto_open">' . __( 'Facebook Modal Body (Auto-Open)' , 'facebook_modal_body_auto_open' ) . '</label>',
    function () {
      $option = get_option('facebook_modal_body_auto_open');
      echo "<input id='facebook_modal_body_auto_open' name='facebook_modal_body_auto_open' type='text' class='regular-text' value='{$option}' />";
    },
    'ci',
    'ci_general'
  );

  add_settings_field(
    'facebook_modal_delay',
    '<label for="facebook_modal_delay">' . __( 'Facebook Modal Delay (MS)' , 'facebook_modal_delay' ) . '</label>',
    function () {
      $option = get_option('facebook_modal_delay');
      echo "<input id='facebook_modal_delay' name='facebook_modal_delay' type='number' class='regular-text code' value='{$option}' />";
      echo "<p class='description'>How long until the modal auto-opens. Set to no value to disable.</p>";
    },
    'ci',
    'ci_general'
  );

  add_settings_field(
    'facebook_app_id',
    '<label for="facebook_app_id">' . __( 'Facebook App ID' , 'facebook_app_id' ) . '</label>',
    function () {
      $option = get_option('facebook_app_id');
      echo "<input id='facebook_app_id' name='facebook_app_id' type='text' class='regular-text code' value='{$option}' />";
    },
    'ci',
    'ci_general'
  );

  add_settings_field(
    'ga_tracking_id',
    '<label for="ga_tracking_id">' . __( 'Google Analytics Tracking ID' , 'ga_tracking_id' ) . '</label>',
    function () {
      $option = get_option('ga_tracking_id');
      echo "<input id='ga_tracking_id' name='ga_tracking_id' type='text' class='regular-text code' value='{$option}' />";
    },
    'ci',
    'ci_general'
  );

  add_settings_field(
    'mailchimp_form_html',
    '<label for="mailchimp_form_html">' . __( 'Mailchimp Form HTML' , 'mailchimp_form_html' ) . '</label>',
    function () {
      $option = get_option('mailchimp_form_html');
      echo "<textarea id='mailchimp_form_html' name='mailchimp_form_html' class='regular-text' rows=20>{$option}</textarea>";
    },
    'ci',
    'ci_general'
  );
} );

add_action( 'admin_menu', function () {
  add_menu_page(
    'Coder Intros Settings',
    'Coder Intros',
    'manage_options',
    'ci',
    function () {
      if ( !current_user_can( 'manage_options' ) ) {
        return;
      }

      if ( isset( $_GET['settings-updated'] ) ) {
        add_settings_error( 'ci_messages', 'ci_message', __( 'Settings Saved', 'ci' ), 'updated' );
      }

      settings_errors( 'ci_messages' );?>
      <div class="wrap">
        <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
        <form action="options.php" method="post"><?php
          settings_fields( 'ci' );
          do_settings_sections( 'ci' );
          submit_button( 'Save Settings' );?>
        </form>
      </div><?php
    }
 );
} );
