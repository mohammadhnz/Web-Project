from crawler.torobche.spiders.base_scrapper import BaseScrapper


class MeghdaditSpider(BaseScrapper):
    name = "meghdadit-scrapper"
    shop_domain = "https://meghdadit.com/"
    base_url = "https://meghdadit.com/productlist/" \
               "?cs=true&pt=0&s=&sb=CreateDate&im=true&page={page_number}"
    allowed_domains = ["https://meghdadit.com/", "meghdadit.com"]

    def _get_cost(self, item):
        try:
            return item.css('.position-relative::text').extract()[6].split(" ")[0]
        except Exception as e:
            return -1

    def _get_image_url(self, item):
        return self.shop_domain + item.css('img::attr(src)').extract()[0]

    def _get_url(self, item):
        return self.shop_domain + item.css('.d-block::attr(href)').extract()[0]

    def _get_title_from_item(self, item):
        return item.css('.d-block::text').extract()[0]

    def _get_items(self, response):
        return response.css(".list-item-wrapper")

    def _extract_features(self, response, product):
        keys = response.css('.attribute-caption > span::text').extract()
        values =  response.css('.attribute-value > span::text').extract()
        return {keys[i].strip(): values[i].strip() for i in range(len(keys))} if len(keys) > 0 else dict()
