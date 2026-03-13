from sqlalchemy import Column, Integer, String, Enum, Date, Text, TIMESTAMP, ForeignKey, func
from app.db.base import Base
from app.db.enums.reservation_status_enum import EnumReservationStatus


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    table_number = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    time = Column(String, nullable=False)
    status = Column(Enum(EnumReservationStatus, name="reservation_status_enum"), nullable=False, default=EnumReservationStatus.COMING)
    guests = Column(Integer, nullable=False)
    note = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.now())