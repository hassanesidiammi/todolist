ARG PHP_VERSION
ARG PHP_PROJECT_FOLDER
ARG COMPOSER_VERSION
ARG PWD

FROM php:${PHP_VERSION}-fpm

LABEL org.opencontainers.image.authors="h.sidiammi@gmail.com"

RUN apt-get update && \
    apt-get install -y \
        git \
        zip unzip \
        libpq-dev \
    && echo "COMPOSER_VERSION: ${COMPOSER_VERSION}"

# Install Composer, Set timezone & Install pdo xdebug...
RUN curl -sS https://getcomposer.org/installer | \
       php -- --install-dir=/usr/local/bin --filename=composer --${COMPOSER_VERSION} \
    && rm /etc/localtime \
    && ln -s /usr/share/zoneinfo/${LOCAL_TIME} /etc/localtime \
    && "date" \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql \
    && pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && {\
        echo 'alias ll="ls -alF"';  \
        echo 'export alias sf="php bin/console"';  \
    } >> ~/.bashrc

RUN usermod -u 1000 www-data

WORKDIR /var/www/
