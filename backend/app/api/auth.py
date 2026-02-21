from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.services.auth import AuthService
from app.db.deps import get_db
from sqlalchemy.orm import Session
from app.schemas.auth import AuthResponse, RegisterRequest, LoginRequest



router = APIRouter(prefix='/auth', tags=['Auth'])



# Register Client

@router.post("/client/register", response_model=AuthResponse, status_code=201)
def register_client(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):
    service = AuthService(db)
    token = service.register_client(
        first_name=data.first_name,
        last_name=data.last_name,
        email=data.email,
        password=data.password
    )

    if not token:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists"
        )

    return token



# Register Stuff

@router.post("/stuff/register", response_model=AuthResponse, status_code=201)
def register_stuff(
    data: RegisterRequest,
    db: Session = Depends(get_db)
):
    service = AuthService(db)
    token = service.register_stuff(
        first_name=data.first_name,
        last_name=data.last_name,
        email=data.email,
        password=data.password
    )

    if not token:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="User already exists"
        )

    return token



# Login Endpoint

@router.post('/login', response_model=AuthResponse)
def login(
    form_data: LoginRequest,
    db: Session = Depends(get_db)
):
    service = AuthService(db)
    token = service.authenticate_user(
        email=form_data.email,
        password=form_data.password
    )

    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    return token