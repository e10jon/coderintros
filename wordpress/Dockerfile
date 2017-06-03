FROM wordpress:latest

RUN apt-get update && apt-get install libfreetype6-dev libjpeg62-turbo-dev libpng12-dev -y
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/
RUN docker-php-ext-install mysqli gd
RUN a2enmod rewrite
RUN service apache2 restart

COPY wp-config.php  /usr/src/wordpress
COPY wp-content     /usr/src/wordpress/wp-content
COPY php.ini        /usr/local/etc/php/conf.d/

RUN chown -R www-data:www-data /usr/src/wordpress

EXPOSE 80
