from django.db import models
from simple_history.models import HistoricalRecords
from django.db.models.fields import TextField
from django.contrib.auth.models import User as AdminUser
import json
import logging

logger = logging.getLogger(__name__)


def history_user_setter(historical_instance, user):
    historical_instance.history_user_id = None
    try:
        user_data = {}
        # Api User
        if user:
            if isinstance(user, AdminUser):
                # Django User
                user_data.update({'user_id': user.id})
                historical_instance.history_user_id = json.dumps(user_data)


    except Exception as e:
        logger.error(
            'Exception occured while handling history user setter',
            exc_info=True,
            extra={
                'instance': historical_instance,
                'user': user,
            }
        )
        historical_instance.history_user_id = None


def history_user_getter(historical_instance):
    if historical_instance.history_user_id is None:
        return 'System'
    user_data = json.loads(historical_instance.history_user_id)
    # Check is Django User
    try:
        user_id = user_data.get('user_id', None)
        admin_user = AdminUser.objects.get(pk=user_id)
        return admin_user
    except AdminUser.DoesNotExist:
        pass

    return 'System'


class ActiveManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_deleted=False)


class BaseModel(models.Model):
    history = HistoricalRecords(
        history_user_id_field=TextField(null=True),
        inherit=True,
        history_user_setter=history_user_setter,
        history_user_getter=history_user_getter
    )

    objects = models.Manager()
    active_objects = ActiveManager()

    created = models.DateTimeField(
        auto_now_add=True,
    )

    modified = models.DateTimeField(
        auto_now=True,
    )

    is_deleted = models.BooleanField(
        default=False,
    )

    is_archived = models.BooleanField(
        default=False,
    )

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        self.is_deleted = True
        self.is_archived = True
        self.save()
