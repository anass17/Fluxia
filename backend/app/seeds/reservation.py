import random
from faker import Faker
from app.db.session import SessionLocal
from app.db.models import Reservation, User
from app.db.enums.reservation_status_enum import EnumReservationStatus
from sqlalchemy.orm import Session

fake = Faker()


def seed_reservations(n=50):

    db = SessionLocal()

    # Get all user IDs
    client_ids = [user.id for user in db.query(User.id).filter(User.role == "CLIENT").all()]

    if not client_ids:
        print("No users found. Seed users first.")
        return

    reservations = []

    for _ in range(n):
        reservation = Reservation(
            table_number=random.randint(1, 20),
            date=fake.date_between(start_date="-30d", end_date="+30d"),
            time=random.choice([f"{i}:00" for i in range(10, 23)]),
            status=random.choice(list(EnumReservationStatus)),
            guests=random.randint(1, 4),
            note=fake.sentence(nb_words=6),
            user_id=random.choice(client_ids)
        )

        reservations.append(reservation)

    db.add_all(reservations)
    db.commit()

    print(f"{len(reservations)} reservations inserted successfully.")