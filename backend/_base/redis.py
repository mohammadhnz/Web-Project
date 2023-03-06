import redis
from decouple import config

redis_client = redis.Redis(
    config('REDIS_IP'),
    config('REDIS_PORT'),
)
