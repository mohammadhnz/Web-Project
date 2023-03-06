import scrapy
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from crawler.models import CrawlLog


class CrawlerService:
    def __init__(self, scrapper: scrapy.Spider):
        self.scrapper = scrapper

    def run(self):
        settings = get_project_settings()
        process = CrawlerProcess(settings)
        process.crawl(self.scrapper)
        process.start()


def crawl_specific_site(scrapper):
    CrawlerService(scrapper).run()
    CrawlLog(
        shop_domain=scrapper.shop_domain,
        shop_name=scrapper.name,
        total_count_crawled=0
    ).save()
