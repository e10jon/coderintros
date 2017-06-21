<?php

add_action( 'admin_init', function () {
  register_setting( 'mu_ci', 'cloudflare_email' );
  register_setting( 'mu_ci', 'cloudflare_api_key' );

  add_settings_section( 'mu_ci_general', null, null, 'mu_ci' );

  add_settings_field(
    'cloudflare_email',
    '<label for="cloudflare_email">' . __( 'Cloudflare Email' , 'cloudflare_email' ) . '</label>',
    function () {
      $option = get_site_option('cloudflare_email');
      echo "<input id='cloudflare_email' name='cloudflare_email' type='text' class='regular-text' value='{$option}' />";
    },
    'mu_ci',
    'mu_ci_general'
  );

  add_settings_field(
    'cloudflare_api_key',
    '<label for="cloudflare_api_key">' . __( 'Cloudflare API Key' , 'cloudflare_api_key' ) . '</label>',
    function () {
      $option = get_site_option('cloudflare_api_key');
      echo "<input id='cloudflare_api_key' name='cloudflare_api_key' type='text' class='regular-text code' value='{$option}' />";
    },
    'mu_ci',
    'mu_ci_general'
  );
} );

add_action('network_admin_edit_mu_ci_options',  function ( ) {
  global $new_whitelist_options;

  foreach ( $new_whitelist_options['mu_ci'] as $option ) {
    if ( isset( $_POST[$option] ) ) {
      update_site_option( $option, $_POST[$option] );
    } else {
      delete_site_option( $option );
    }
  }

  wp_redirect(
    add_query_arg(
      ['page' => 'mu_ci', 'updated' => 'true'],
      network_admin_url( 'settings.php' )
    )
  );

  exit;
} );


add_action('network_admin_menu', function () {
  add_submenu_page(
    'settings.php',
    'Coder Intros Settings',
    'Coder Intros Settings',
    'manage_network_options',
    'mu_ci',
    function () {
      if ( !current_user_can( 'manage_network_options' ) ) {
        return;
      }

      if ( isset( $_GET['settings-updated'] ) ) {
        add_settings_error( 'mu_ci_messages', 'mu_ci_message', __( 'Settings Saved', 'mu_ci' ), 'updated' );
      }

      settings_errors( 'mu_ci_messages' );?>

      <div class="wrap">
        <h1><?php echo esc_html( get_admin_page_title() ); ?></h1>
        <form action="edit.php?action=mu_ci_options" method="post"><?php
          settings_fields( 'mu_ci' );
          do_settings_sections( 'mu_ci' );
          submit_button( 'Save Settings' );?>
        </form>
      </div><?php
    }
  );
} );
