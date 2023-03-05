from django.db import models

from core.models.base_model import BaseModel


class CrawlLog(BaseModel):
    shop_domain = models.CharField(max_length=30)
    shop_name = models.CharField(max_length=30)
    total_count_crawled = models.PositiveIntegerField()

    class Meta:
        db_table = 'crawl_log'
        abstract = False
