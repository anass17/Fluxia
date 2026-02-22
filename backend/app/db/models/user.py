from sqlalchemy import Column, Integer, String, Enum, Boolean, TIMESTAMP, func
from app.db.base import Base
from app.db.enums.role_enum import EnumRole

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    role = Column(Enum(EnumRole, name="role_enum"), nullable=False, default="CLIENT")
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    is_active = Column(Boolean, nullable=False, default=True)
    created_at = Column(TIMESTAMP, server_default=func.now())