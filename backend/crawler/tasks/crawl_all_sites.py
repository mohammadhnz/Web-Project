from celery import shared_task

from crawler.services import crawl_specific_site
from crawler.torobche.spiders import CheapkoSpider, HiAppleSpider, \
    KalaomaSpider, MacbookiranSpider, MeghdaditSpider


@shared_task
def crawl_all_sites():
    crawl_cheapko.delay()
    crawl_hiapple.delay()
    crawl_kalaoma.delay()
    crawl_macbookiran.delay()
    crawl_meghdadit.delay()


@shared_task
def crawl_cheapko():
    crawl_specific_site(CheapkoSpider)


@shared_task
def crawl_hiapple():
    crawl_specific_site(HiAppleSpider)


@shared_task
def crawl_kalaoma():
    crawl_specific_site(KalaomaSpider)


@shared_task
def crawl_macbookiran():
    crawl_specific_site(MacbookiranSpider)


@shared_task
def crawl_meghdadit():
    crawl_specific_site(MeghdaditSpider)
