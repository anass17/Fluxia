from fastapi import FastAPI, WebSocket
from contextlib import asynccontextmanager
from app.db.base import Base
from app.db.session import engine
# from app.routes.health import router as health_router
from app.api.auth import router as auth_router
from app.api.user import router as user_router
from app.api.websocket import router as ws_router
import app.db.models

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",   # dev on host
    "http://frontend:3000",    # frontend container
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
app.include_router(ws_router)


@app.get('/')
def main():
    return {'message': 'running'}