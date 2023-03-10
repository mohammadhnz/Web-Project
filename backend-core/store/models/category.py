from django.contrib.postgres.fields import HStoreField
from django.db import models


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', blank=True, null=True, on_delete=models.RESTRICT)
    is_leaf = models.BooleanField()
    related_words = HStoreField(null=True, blank=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.name

    def get_all_parents(self):
        result = [self]
        current = self
        while current.parent is not None:
            result.append(current.parent)
            current = current.parent
        return result
