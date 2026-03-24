FROM apache/airflow:2.9.3-python3.11

USER airflow

COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

USER airflow

EXPOSE 8080

CMD ["airflow", "standalone"]
