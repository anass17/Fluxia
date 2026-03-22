from sqlalchemy import Column, Integer, String, Enum, TIMESTAMP, ForeignKey, func
from app.db.base import Base
from app.db.enums.action_type_enum import EnumActionType
from app.db.enums.action_entity_enum import EnumActionEntity


class Action(Base):
    __tablename__ = "actions"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(Enum(EnumActionType, name="action_type_enum"), nullable=False)
    entity = Column(Enum(EnumActionEntity, name="action_entity_enum"), nullable=False)
    message = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
