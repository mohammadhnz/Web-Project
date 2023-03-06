from crawler.torobche.spiders.base_scrapper import BaseScrapper


class KalaomaSpider(BaseScrapper):
    name = "kalaoma-scrapper"
    shop_domain = "https://kalaoma.com/"
    base_url = "https://www.kalaoma.com/category-digital-device?PageNumber={page_number}"
    allowed_domains = ["https://kalaoma.com/", "kalaoma.com"]

    def _get_cost(self, item):
        try:
            return item.css('.km-value::text').extract()[0]
        except Exception as e:
            return -1

    def _get_image_url(self, item):
        return item.css('.lazy::attr(data-src)').extract()[0]

    def _get_url(self, item):
        return self.shop_domain + item.css('::attr(href)').extract()[0]

    def _get_title_from_item(self, item):
        return item.css('.km-title::text').extract()[0]

    def _get_items(self, response):
        return response.css(".km-theme-5")

    def _extract_features(self, response, product):
        keys = response.css('.products-attribute-title::text').extract()
        values = response.css('.products-attribute-value::text').extract()
        return {keys[i]: values[i] for i in range(len(keys))}
