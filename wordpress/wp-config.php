<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

define( 'DB_NAME',       $_ENV['DB_NAME'] );
define( 'DB_USER',       $_ENV['DB_USER'] );
define( 'DB_PASSWORD',   $_ENV['DB_PASSWORD'] );
define( 'DB_HOST',       $_ENV['DB_HOST'] );

define( 'DB_CHARSET',   'utf8mb4' );
define( 'DB_COLLATE',   '' );

define( 'S3_UPLOADS_BUCKET',              $_ENV['S3_UPLOADS_BUCKET'] );
define( 'S3_UPLOADS_KEY',                 $_ENV['S3_UPLOADS_KEY'] );
define( 'S3_UPLOADS_SECRET',              $_ENV['S3_UPLOADS_SECRET'] );
define( 'S3_UPLOADS_REGION',              $_ENV['S3_UPLOADS_REGION'] );
define( 'S3_UPLOADS_USE_LOCAL',           isset( $_ENV['S3_UPLOADS_USE_LOCAL'] ) && $_ENV['S3_UPLOADS_USE_LOCAL'] == 'true' );
define( 'S3_UPLOADS_HTTP_CACHE_CONTROL',  60 * 60 * 24 * 30 );
define( 'S3_UPLOADS_BUCKET_URL',          $_ENV['S3_UPLOADS_BUCKET_URL'] );

define( 'AUTH_KEY',         $_ENV['AUTH_KEY'] );
define( 'SECURE_AUTH_KEY',  $_ENV['SECURE_AUTH_KEY'] );
define( 'LOGGED_IN_KEY',    $_ENV['LOGGED_IN_KEY'] );
define( 'NONCE_KEY',        $_ENV['NONCE_KEY'] );
define( 'AUTH_SALT',        $_ENV['AUTH_SALT'] );
define( 'SECURE_AUTH_SALT', $_ENV['SECURE_AUTH_SALT'] );
define( 'LOGGED_IN_SALT',   $_ENV['LOGGED_IN_SALT'] );
define( 'NONCE_SALT',       $_ENV['NONCE_SALT'] );

define( 'WP_ALLOW_MULTISITE',   true );
define( 'MULTISITE',            true );
define( 'SUBDOMAIN_INSTALL',    true );
define( 'COOKIE_DOMAIN',        false );

if ( strpos( $_SERVER['HTTP_X_FORWARDED_PROTO'], 'https' ) !== false ) {
  $_SERVER['HTTPS'] = 'on';
}

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG',     !!$_ENV['WP_DEBUG'] );
define( 'SAVEQUERIES',  !!$_ENV['WP_DEBUG'] );

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
  define( 'ABSPATH', dirname(__FILE__) . '/' );

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
