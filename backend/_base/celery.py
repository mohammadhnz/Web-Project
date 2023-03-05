from __future__ import absolute_import, unicode_literals

import os
from datetime import timedelta

from celery import Celery
from raven.contrib.celery import register_logger_signal
from raven.contrib.celery import register_signal
from raven.contrib.django.models import client

# set the default Django settings module for the 'celery' program.

os.environ.setdefault('DJANGO_SETTINGS_MODULE', '_base.settings')

app = Celery("heb")
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
register_logger_signal(client)
register_signal(client)

app.conf.beat_schedule = {
    'crawl all sites': {
        'task': 'crawler.tasks.crawl_all_sites.crawl_all_sites',
        'schedule': timedelta(seconds=30),
    }
}
