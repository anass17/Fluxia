from pydantic import BaseModel
from app.db.enums.reservation_status_enum import EnumReservationStatus
from datetime import datetime, date as dt




class CreateReservationSchema(BaseModel):
    table_number: int
    date: dt
    time: str
    guests: int
    note: str



class ReservationSchema(CreateReservationSchema):
    id: int
    status: EnumReservationStatus
    user_id: int
    created_at: datetime