import scrapy

from crawler.torobche.spiders.base_scrapper import BaseScrapper


class HiAppleSpider(BaseScrapper):
    name = "hiapple-scrapper"
    shop_domain = "hi.ir"
    base_url = "https://hiapple.ir/page/{page_number}" \
               "/?s=apple&post_type=product&search_limit_to_post_titles=0&fs=1"
    allowed_domains = ["https://hiapple.ir"]

    def _get_cost(self, item):
        try:
            return item.css('div > div > span > span > bdi::text').extract()[0][:-1]
        except Exception as e:
            return -1

    def _get_image_url(self, item):
        return item.css('div > a > div > img').css("::attr(src)").extract()[0]

    def _get_url(self, item):
        return item.css('div > div > div.product-details > div > h3 > a').css('::attr(href)').extract()[0]

    def _get_title_from_item(self, item):
        return item.css('div > div > div.product-details > div > h3 > a::text').extract()[0]

    def _get_items(self, response):
        return response.css(".product-grid-view")
