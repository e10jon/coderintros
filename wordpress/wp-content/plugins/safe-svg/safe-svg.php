<?php
/*
Plugin Name: Safe SVG
Plugin URI:  https://wpsvg.com/
Description: Allows SVG uploads into WordPress and sanitizes the SVG before saving it
Version:     1.4.4
Author:      Daryll Doyle
Author URI:  http://enshrined.co.uk
Text Domain: safe-svg
Domain Path: /languages
 */

defined( 'ABSPATH' ) or die( 'Really?' );

require 'lib/vendor/autoload.php';

if ( ! class_exists( 'safe_svg' ) ) {

    /**
     * Class safe_svg
     */
    Class safe_svg {

        /**
         * The sanitizer
         *
         * @var \enshrined\svgSanitize\Sanitizer
         */
        protected $sanitizer;

        /**
         * Set up the class
         */
        function __construct() {
            $this->sanitizer = new enshrined\svgSanitize\Sanitizer();
            $this->sanitizer->minify(true);

            add_filter( 'upload_mimes', array( $this, 'allow_svg' ) );
            add_filter( 'wp_handle_upload_prefilter', array( $this, 'check_for_svg' ) );
	        add_filter( 'wp_check_filetype_and_ext', array( $this, 'fix_mime_type_svg' ), 75, 4 );
            add_filter( 'wp_prepare_attachment_for_js', array( $this, 'fix_admin_preview' ), 10, 3 );
	        add_filter( 'wp_get_attachment_image_src', array( $this, 'one_pixel_fix' ), 10, 4 );
	        add_filter( 'admin_post_thumbnail_html', array( $this, 'featured_image_fix' ), 10, 3 );
	        add_action( 'admin_enqueue_scripts', array( $this, 'load_custom_admin_style' ) );
        }

        /**
         * Allow SVG Uploads
         *
         * @param $mimes
         *
         * @return mixed
         */
        public function allow_svg( $mimes ) {
            $mimes['svg'] = 'image/svg+xml';
            $mimes['svgz'] = 'image/svg+xml';

            return $mimes;
        }

	    /**
	     * Fixes the issue in WordPress 4.7.1 being unable to correctly identify SVGs
	     *
	     * @thanks @lewiscowles
	     *
	     * @param null $data
	     * @param null $file
	     * @param null $filename
	     * @param null $mimes
	     *
	     * @return null
	     */
	    public function fix_mime_type_svg( $data = null, $file = null, $filename = null, $mimes = null ) {
		    $ext = isset( $data['ext'] ) ? $data['ext'] : '';
		    if ( strlen( $ext ) < 1 ) {
			    $ext = strtolower( end( explode( '.', $filename ) ) );
		    }
		    if ( $ext === 'svg' ) {
			    $data['type'] = 'image/svg+xml';
			    $data['ext']  = 'svg';
		    } elseif ( $ext === 'svgz' ) {
                $data['type'] = 'image/svg+xml';
                $data['ext']  = 'svgz';
            }

		    return $data;
	    }

        /**
         * Check if the file is an SVG, if so handle appropriately
         *
         * @param $file
         *
         * @return mixed
         */
        public function check_for_svg( $file ) {

            if ( $file['type'] === 'image/svg+xml' ) {
                if ( ! $this->sanitize( $file['tmp_name'] ) ) {
                    $file['error'] = __( "Sorry, this file couldn't be sanitized so for security reasons wasn't uploaded",
                        'safe-svg' );
                }
            }

            return $file;
        }

        /**
         * Sanitize the SVG
         *
         * @param $file
         *
         * @return bool|int
         */
        protected function sanitize( $file ) {
            $dirty = file_get_contents( $file );

            // Is the SVG gzipped? If so we try and decode the string
            if ( $is_zipped = $this->is_gzipped( $dirty ) ) {
                $dirty = gzdecode( $dirty );

                // If decoding fails, bail as we're not secure
                if ( $dirty === false ) {
                    return false;
                }
            }

            $clean = $this->sanitizer->sanitize( $dirty );

            if ( $clean === false ) {
                return false;
            }

            // If we were gzipped, we need to re-zip
            if ( $is_zipped ) {
                $clean = gzencode( $clean );
            }

            file_put_contents( $file, $clean );

            return true;
        }

        /**
         * Check if the contents are gzipped
         * @see http://www.gzip.org/zlib/rfc-gzip.html#member-format
         *
         * @param $contents
         *
         * @return bool
         */
        protected function is_gzipped( $contents ) {
            if ( function_exists( 'mb_strpos' ) ) {
                return 0 === mb_strpos( $contents, "\x1f" . "\x8b" . "\x08" );
            } else {
                return 0 === strpos( $contents, "\x1f" . "\x8b" . "\x08" );
            }
        }

        /**
         * Filters the attachment data prepared for JavaScript to add the sizes array to the response
         *
         * @param array      $response   Array of prepared attachment data.
         * @param int|object $attachment Attachment ID or object.
         * @param array      $meta       Array of attachment meta data.
         *
         * @return array
         */
        public function fix_admin_preview( $response, $attachment, $meta ) {

            if ( $response['mime'] == 'image/svg+xml' ) {
                $possible_sizes = apply_filters( 'image_size_names_choose', array(
                    'thumbnail' => __( 'Thumbnail' ),
                    'medium'    => __( 'Medium' ),
                    'large'     => __( 'Large' ),
                    'full'      => __( 'Full Size' ),
                ) );

                $sizes = array();

                foreach ( $possible_sizes as $size ) {
                    $sizes[ $size ] = array(
                        'height'      => 2000,
                        'width'       => 2000,
                        'url'         => $response['url'],
                        'orientation' => 'portrait',
                    );
                }

                $response['sizes'] = $sizes;
                $response['icon'] = $response['url'];
            }

            return $response;
        }

        /**
         * Filters the image src result.
         * Here we're gonna spoof the image size and set it to 100 width and height
         *
         * @param array|false  $image         Either array with src, width & height, icon src, or false.
         * @param int          $attachment_id Image attachment ID.
         * @param string|array $size          Size of image. Image size or array of width and height values
         *                                    (in that order). Default 'thumbnail'.
         * @param bool         $icon          Whether the image should be treated as an icon. Default false.
         *
         * @return array
         */
        public function one_pixel_fix( $image, $attachment_id, $size, $icon ) {
            if ( get_post_mime_type( $attachment_id ) == 'image/svg+xml' ) {
                $image['1'] = 100;
                $image['2'] = 100;
            }

            return $image;
        }

	    /**
	     * If the featured image is an SVG we wrap it in an SVG class so we can apply our CSS fix.
	     *
	     * @param string $content      Admin post thumbnail HTML markup.
	     * @param int    $post_id      Post ID.
	     * @param int    $thumbnail_id Thumbnail ID.
	     *
	     * @return string
	     */
        public function featured_image_fix( $content, $post_id, $thumbnail_id) {
        	$mime = get_post_mime_type( $thumbnail_id );

        	if( 'image/svg+xml' === $mime ) {
        		$content = sprintf( '<span class="svg">%s</span>', $content );
	        }

	        return $content;
        }

	    /**
	     * Load our custom CSS sheet.
	     */
	    function load_custom_admin_style() {
		    wp_enqueue_style( 'safe-svg-css', plugins_url( 'assets/safe-svg.css', __FILE__ ), array() );
	    }

    }
}

$safe_svg = new safe_svg();