#!/bin/sh

# wait for RabbitMQ server to start
sleep 10

# Replace * with name of Django Project
su -m myuser -c "celery -A _base.celery worker --loglevel=info --pool=solo"
