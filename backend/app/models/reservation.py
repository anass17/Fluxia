from app.db.models.reservation import Reservation
from sqlalchemy.orm import Session



class ReservationModel:

    def __init__(self, db: Session):
        self.db = db


    
    def get_all_reservations(self):
        reservations = self.db.query(Reservation).all()
        return reservations


    
    def get_user_reservations(self, user_id):
        reservations = self.db.query(Reservation).filter(Reservation.user_id == user_id).all()
        return reservations



    def create_reservation(self, table_number, date, time, guests, note, user_id, status = "COMING"):
        reservation = Reservation(
            table_number=table_number,
            date=date,
            time=time,
            guests=guests,
            note=note,
            user_id=user_id,
            status=status
        )

        self.db.add(reservation)
        self.db.commit()
        self.db.refresh(reservation)

        return reservation



    def check_reservation_existence(self, table_number, date, time):
        reservation = self.db.query(Reservation).filter(
            Reservation.table_number == table_number,
            Reservation.date == date,
            Reservation.time == time,
        ).first()

        return reservation
    
