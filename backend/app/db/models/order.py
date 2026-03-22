from sqlalchemy import Column, Integer, TIMESTAMP, ForeignKey, func
from app.db.base import Base


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    quantity = Column(Integer, nullable=False)
    reservation_id = Column(Integer, ForeignKey("reservations.id"), nullable=False)
    plate_id = Column(Integer, ForeignKey("plates.id"), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())
