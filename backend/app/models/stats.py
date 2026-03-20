from app.db.models.user import User
from app.db.models.reservation import Reservation
from sqlalchemy.orm import Session
from sqlalchemy import func



class StatsModel:

    def __init__(self, db: Session):
        self.db = db


    
    def get_owner_stats(self):
        role_counts = self.db.query(
            User.role, 
            func.count(User.id)
        ).group_by(User.role).all()

        stats_dict = {role: count for role, count in role_counts}

        num_reservations = self.db.query(Reservation).count()

        return {
            "clients": stats_dict.get('CLIENT', 0),
            "staffs": stats_dict.get('STAFF', 0),
            "admins": stats_dict.get('ADMIN', 0),
            "reservations": num_reservations
        }
        

