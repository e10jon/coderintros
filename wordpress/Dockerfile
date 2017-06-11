FROM wordpress:4.8-php7.1-apache

COPY wp-config.php  /usr/src/wordpress
COPY wp-content     /usr/src/wordpress/wp-content
COPY php.ini        /usr/local/etc/php/conf.d/

RUN chown -R www-data:www-data /usr/src/wordpress

EXPOSE 80
