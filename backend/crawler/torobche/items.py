# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy


class Product(scrapy.Item):
    name = scrapy.Field()
    page_url = scrapy.Field()
    image_url = scrapy.Field()
    price = scrapy.Field()
    is_available = scrapy.Field()
    shop_domain = scrapy.Field()
    features = scrapy.Field()