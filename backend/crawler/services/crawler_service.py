from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings

from crawler.torobche.spiders import *


class CrawlerService:
    def run(self):
        settings = get_project_settings()
        process = CrawlerProcess(settings)
        process.crawl(MacbookiranSpider)
        process.start()
