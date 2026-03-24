from fastapi import FastAPI, Request
from fastapi.responses import Response
from contextlib import asynccontextmanager
from app.db.base import Base
from app.db.session import engine

# from app.routes.health import router as health_router
from app.api.auth import router as auth_router
from app.api.user import router as user_router
from app.api.reservation import router as reservation_router
from app.api.menu import router as menu_router
from app.api.chat import router as chat_router
from app.api.stats import router as stats_router
from app.api.generator import router as generator_router
from app.api.websocket import router as ws_router
import app.db.models  # noqa: F401
from prometheus_client import generate_latest, CONTENT_TYPE_LATEST, Counter, Histogram
from fastapi.middleware.cors import CORSMiddleware
import time

origins = [
    "http://localhost:3000",  # dev on host
    "http://frontend:3000",  # frontend container
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    # STARTUP code
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")

    yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


# app.include_router(health_router)
app.include_router(auth_router)
app.include_router(user_router)
app.include_router(reservation_router)
app.include_router(menu_router)
app.include_router(chat_router)
app.include_router(stats_router)
app.include_router(generator_router)
app.include_router(ws_router)


# Metrics
REQUEST_COUNT = Counter(
    "http_requests_total",
    "Total number of HTTP requests",
    ["method", "endpoint", "status"],
)

REQUEST_LATENCY = Histogram(
    "http_request_latency_seconds", "Latency of HTTP requests", ["endpoint"]
)

INFERENCE_TIME = Histogram(
    "model_inference_seconds", "Time spent during model inference"
)

ERROR_COUNT = Counter("http_errors_total", "Total number of errors", ["endpoint"])


@app.middleware("http")
async def metrics_middleware(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    latency = time.time() - start_time

    endpoint = request.url.path
    REQUEST_COUNT.labels(
        method=request.method, endpoint=endpoint, status=response.status_code
    ).inc()

    REQUEST_LATENCY.labels(endpoint=endpoint).observe(latency)

    if response.status_code >= 400:
        ERROR_COUNT.labels(endpoint=endpoint).inc()

    return response


@app.get("/")
def main():
    return {"message": "running"}


@app.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)
