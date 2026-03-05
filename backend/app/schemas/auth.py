from pydantic import BaseModel, EmailStr, Field
from typing import Literal



class RegisterRequest(BaseModel):
    first_name: str = Field(..., min_length=2)
    last_name: str = Field(..., min_length=2)
    email: EmailStr
    password: str = Field(
        ...,
        min_length=8,
        description="Password should have at least 8 characters"
    )



class LoginRequest(BaseModel):
    email: EmailStr
    password: str



class AuthResponse(BaseModel):
    access_token: str
    first_name: str
    last_name: str
    role: Literal['OWNER', 'ADMIN', 'STUFF', 'CLIENT']