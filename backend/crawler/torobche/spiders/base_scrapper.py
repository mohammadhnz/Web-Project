from abc import ABC, abstractmethod

import scrapy

from crawler.torobche.items import Product


class BaseScrapper(scrapy.Spider, ABC):
    name = "base-scrapper"
    shop_domain = ""
    allowed_domains = []

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
            product['name'] = self._get_title_from_item(item).strip()
            product['image_url'] = self._get_image_url(item).strip()
            product['page_url'] = self._get_url(item).strip()
            product['price'] = self._get_cost(item)
            product['is_available'] = self._get_activeness_status(item)
            product['shop_domain'] = self.shop_domain
            yield scrapy.Request(
                product['page_url'],
                callback=self._parse_product_page,
                cb_kwargs=dict(product=product)
            )

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

    def _get_activeness_status(self, item):
        return True

    def _parse_product_page(self, response, product):
        product['features'] = self._extract_features(response, product)
        yield product

    def _extract_features(self, response, product):
        return dict()
