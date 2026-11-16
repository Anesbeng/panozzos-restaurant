
FROM php:8.4-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libcurl4-openssl-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
        curl \
        xml \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy Laravel project
COPY . .

# Install production dependencies
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction

# Set permissions
RUN chmod -R 775 storage bootstrap/cache

EXPOSE 10000

CMD php artisan config:clear && \
    php artisan migrate --force && \
    php artisan db:seed --class=AdminSeeder --force && \
    php artisan config:cache && \
    PHP_CLI_SERVER_WORKERS=4 php artisan serve --host=0.0.0.0 --port=${PORT:-10000}
