FROM php:7.0-apache

RUN apt-get update && apt-get install libfreetype6-dev libjpeg62-turbo-dev libpng12-dev -y
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/
RUN docker-php-ext-install mysqli gd
RUN a2enmod rewrite
RUN service apache2 restart

COPY .         /var/www/html/
COPY php.ini   /usr/local/etc/php/conf.d/

EXPOSE 80
