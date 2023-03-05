#!/bin/sh

# wait for RabbitMQ server to start
sleep 10

su -m myuser -c "rm /tmp/celerybeat-doshi.pid > /dev/null"
# Replace * with name of Django Project
su -m myuser -c "celery -A _base.celery beat --loglevel=info"