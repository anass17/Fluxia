from pydantic import BaseModel, EmailStr
from typing import Literal
from app.db.enums.role_enum import EnumRole
from datetime import datetime




class UserRoleUpdateResponse(BaseModel):
    first_name: str
    last_name: str
    role: Literal["ADMIN", "STUFF"]



class UserSchema(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    is_active: bool
    role: EnumRole
    created_at: datetime

