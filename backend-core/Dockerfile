FROM python:3.6

RUN apt-get update && apt-get install -y libpq-dev
WORKDIR /app

RUN python -m venv /venv
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/

RUN chmod 0777 /app/run.sh

ENTRYPOINT ["/app/run.sh"]