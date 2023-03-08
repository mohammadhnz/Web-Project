from django.db import models

from core.models.base_model import BaseModel


class Seller(BaseModel):
    account = models.OneToOneField(
        to='core.BaseAccount',
        on_delete=models.CASCADE
    )
    shop = models.OneToOneField(
        to='store.Shop',
        on_delete=models.CASCADE,
        null=True
    )
