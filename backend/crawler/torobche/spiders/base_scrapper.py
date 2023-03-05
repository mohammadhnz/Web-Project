from abc import ABC, abstractmethod

import scrapy

from crawler.torobche.items import Product


class BaseScrapper(scrapy.Spider, ABC):
    name = "base-scrapper"
    shop_domain = ""
    allowed_domains = []

    # def __init__(self, category=None, *args, **kwargs):
    #     super(BaseScrapper, self).__init__(*args, **kwargs)
    #     self.start_urls = [f'http://www.example.com/categories/{category}']
    def start_requests(self):
        for i in range(1, 2):
            yield scrapy.Request(
                self._format_url(i),
                self.parse
            )

    def _format_url(self, index):
        return self.base_url.format(page_number=index)

    def parse(self, response):
        items = self._get_items(response)
        for item in items:
            product = Product()
            product['title'] = self._get_title_from_item(item).strip()
            product['image_url'] = self._get_image_url(item).strip()
            product['url'] = self._get_url(item).strip()
            product['cost'] = self._get_cost(item)

            yield product

    @abstractmethod
    def _get_items(self, response):
        pass

    @abstractmethod
    def _get_title_from_item(self, item):
        pass

    @abstractmethod
    def _get_image_url(self, item):
        pass

    @abstractmethod
    def _get_url(self, item):
        pass

    @abstractmethod
    def _get_cost(self, item):
        pass
