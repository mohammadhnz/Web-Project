#!/bin/bash

sleep 3

cd /app
echo "Running app..."

python manage.py migrate --noinput
if [ "$DJANGO_SUPERUSER_USERNAME" ]
then
    python manage.py createsuperuser \
        --noinput \
        --username $DJANGO_SUPERUSER_USERNAME \
        --email $DJANGO_SUPERUSER_EMAIL
fi

exec python manage.py runserver 0.0.0.0:8080