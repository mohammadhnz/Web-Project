from django.db import models

from core.models import base_model


class Customer(base_model.BaseModel):
    account = models.OneToOneField(
        to='core.BaseAccount',
        on_delete=models.CASCADE
    )
