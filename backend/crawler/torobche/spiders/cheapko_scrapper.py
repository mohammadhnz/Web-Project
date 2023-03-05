import scrapy

from crawler.torobche.spiders.base_scrapper import BaseScrapper


class CheapkoSpider(BaseScrapper):
    name = "cheapko-scrapper"
    shop_domain = "cheapko.ir"
    base_url = "https://cheapko.ir/shop?sort=newest&page={page_number}"
    allowed_domains = ["https://cheapko.ir"]

    def _get_cost(self, item):
        cost = -1
        if len(item.css('span').extract()) > 0:
            cost = int(item.css('span')[-2].css('::attr(wz-data-product-price)').extract()[0])
        return cost

    def _get_image_url(self, item):
        return item.css('.wzc2-img-inner ::attr(src)').extract()[0]

    def _get_url(self, item):
        return item.css('a::attr(href)').extract()[0]

    def _get_title_from_item(self, item):
        return item.css(".wz-shop-product-title::text").extract()[0]

    def _get_items(self, response):
        return response.css(".wz-shop-product-effect-none")
