from app.models.reservation import ReservationModel
from fastapi import HTTPException, status


class ReservationService:

    def __init__(self, db):
        self.db = db
        self.model = ReservationModel(db)



    def create_reservation(self, table_number: int, date: str, time: str, guests: int, note: str, user_id: int):
        existing_reservation = self.model.check_reservation_existence(table_number, date, time)

        if existing_reservation:
            raise HTTPException(status.HTTP_409_CONFLICT, detail="Reservation already exists")

        reservation = self.model.create_reservation(table_number, date, time, guests, note, user_id)

        return reservation
    



    def get_all_reservations(self):
        reservations = self.model.get_all_reservations()
        return reservations
    


    def get_user_reservations(self, user_id):
        reservations = self.model.get_user_reservations(user_id)
        return reservations
