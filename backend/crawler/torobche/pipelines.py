# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


import json

from itemadapter import ItemAdapter


# useful for handling different item types with a single interface


class TorobchePipeline:
    def process_item(self, item, spider):
        return item


class RequestToApiPipeline:

    def open_spider(self, spider):
        self.data = []

    def close_spider(self, spider):
        print(self.data)

    def process_item(self, item, spider):
        product_data = ItemAdapter(item).asdict()
        self.data.append(product_data)
        return item
