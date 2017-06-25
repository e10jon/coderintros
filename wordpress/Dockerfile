FROM wordpress:4.8-php7.1-apache

RUN apt-get update && \
  apt-get install git zip unzip -y

WORKDIR /usr/src/composer

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
  php -r "if (hash_file('SHA384', 'composer-setup.php') === '669656bab3166a7aff8a7506b8cb2d1c292f042046c5a994c43155c0be6190fa0355160742ab2e1c88d40d5be660b410') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;" && \
  php composer-setup.php && \
  php -r "unlink('composer-setup.php');" && \
  mv composer.phar /usr/local/bin/composer

WORKDIR /var/www/html

COPY wp-config.php                  /usr/src/wordpress
COPY themes                         /usr/src/wordpress/wp-content/themes
COPY uploads                        /usr/src/wordpress/wp-content/uploads
COPY php.ini                        /usr/local/etc/php/conf.d/
COPY composer.json                  /usr/src/wordpress
COPY composer.lock                  /usr/src/wordpress
COPY gcloud-service-account.json    /usr/src
COPY .htaccess                      /usr/src/wordpress

RUN cd /usr/src/wordpress && \
  composer install --prefer-dist

RUN chown -R www-data:www-data /usr/src/wordpress

EXPOSE 80
