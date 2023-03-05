from celery import shared_task
from crawler.models import CrawlLog


@shared_task
def crawl_all_sites():
    CrawlLog(shop_domain="sth", shop_name="sdfj", total_count_crawled=100).save()
