from pydantic import BaseModel, EmailStr, Field
from typing import Literal




class UserRoleUpdateResponse(BaseModel):
    first_name: str
    last_name: str
    role: Literal["ADMIN", "STUFF"]



class UserSchema(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    is_active: bool
    role: Literal['OWNER', 'ADMIN', 'STUFF', 'CLIENT']

