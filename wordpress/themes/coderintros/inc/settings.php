<?php

// add a settings page
add_action( 'admin_init', function () {
  register_setting( 'ci', 'cloudflare_zone_id' );
  register_setting( 'ci', 'facebook_page_url' );
  register_setting( 'ci', 'facebook_modal_delay' );
  register_setting( 'ci', 'facebook_app_id' );
  register_setting( 'ci', 'ga_tracking_id' );
  register_setting( 'ci', 'github_repo_url' );
  register_setting( 'ci', 'mailchimp_frequency_group' );
  register_setting( 'ci', 'mailchimp_newsletter_url' );
  register_setting( 'ci', 'public_email' );
  register_setting( 'ci', 'site_password' );

  add_settings_section( 'ci_general', null, null, 'ci' );

  add_settings_field(
    'cloudflare_zone_id',
    '<label for="cloudflare_zone_id">' . __( 'Cloudflare Zone ID' , 'cloudflare_zone_id' ) . '</label>',
    function () {
      $option = get_option('cloudflare_zone_id');
      echo "<input id='cloudflare_zone_id' name='cloudflare_zone_id' type='text' class='regular-text code' value='{$option}' />";
    },
    'ci',
    'ci_general'
  );

  add_settings_field(
    'facebook_page_url',
    '<label for="facebook_page_url">' . __( 'Facebook Page Url' , 'facebook_page_url' ) . '</label>',
    function () {
      $option = get_option('facebook_page_url');
      echo "<input id='facebook_page_url' name='facebook_page_url' type='text' class='regular-text code' value='{$option}' />";
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
    'github_repo_url',
    '<label for="github_repo_url">' . __( 'Github Repo Url' , 'github_repo_url' ) . '</label>',
    function () {
      $option = get_option('github_repo_url');
      echo "<input id='github_repo_url' name='github_repo_url' type='text' class='regular-text code' value='{$option}' />";
    },
    'ci',
    'ci_general'
  );

  add_settings_field(
    'mailchimp_frequency_group',
    '<label for="mailchimp_frequency_group">' . __( 'Mailchimp Frequency Group' , 'mailchimp_frequency_group' ) . '</label>',
    function () {
      $option = get_option('mailchimp_frequency_group');
      echo "<input id='mailchimp_frequency_group' name='mailchimp_frequency_group' type='text' class='regular-text code' value='{$option}' />";
    },
    'ci',
    'ci_general'
  );

  add_settings_field(
    'mailchimp_newsletter_url',
    '<label for="mailchimp_newsletter_url">' . __( 'Mailchimp Newsletter URL' , 'mailchimp_newsletter_url' ) . '</label>',
    function () {
      $option = get_option('mailchimp_newsletter_url');
      echo "<input id='mailchimp_newsletter_url' name='mailchimp_newsletter_url' type='text' class='regular-text code' value='{$option}' />";
    },
    'ci',
    'ci_general'
  );

  add_settings_field(
    'public_email',
    '<label for="public_email">' . __( 'Public Email Address' , 'public_email' ) . '</label>',
    function () {
      $option = get_option('public_email');
      echo "<input id='public_email' name='public_email' type='text' class='regular-text code' value='{$option}' />";
    },
    'ci',
    'ci_general'
  );

  add_settings_field(
    'site_password',
    '<label for="site_password">' . __( 'Password for Site Protection' , 'site_password' ) . '</label>',
    function () {
      $option = get_option('site_password');
      echo "<input id='site_password' name='site_password' type='text' class='regular-text code' value='{$option}' />";
      echo "<p class='description'>Require a password to view the front-end. Set to nothing to disable.</p>";
    },
    'ci',
    'ci_general'
  );
} );

add_action( 'admin_menu', function () {
  add_submenu_page(
    'options-general.php',
    'Coder Intros Settings',
    'Coder Intros',
    'manage_options',
    'ci',
    function () {
      if ( !current_user_can( 'manage_options' ) ) {
        return;
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
