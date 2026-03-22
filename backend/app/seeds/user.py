from faker import Faker
from app.db.session import SessionLocal
from app.services.auth import AuthService
from app.db.models import User

fake = Faker()


CUSTOM_USERS = {
    "OWNER": [
        {
            "first_name": "anass",
            "last_name": "boutaib",
            "email": "anass@boutaib.com",
        }
    ],
    "CLIENT": [
        {
            "first_name": "oussama",
            "last_name": "edderkaoui",
            "email": "oussama@edd.com",
        },
    ],
    "STAFF": [
        {
            "first_name": "abdelhafid",
            "last_name": "ait elmokhtar",
            "email": "hafid@ait.com",
        }
    ],
    "ADMIN": [
        {
            "first_name": "ahmed",
            "last_name": "taoudi",
            "email": "ahmed@taoudi.com",
        }
    ],
}


def seed_custom_users():

    db = SessionLocal()
    service = AuthService(db)

    items = CUSTOM_USERS.items()

    for item in items:

        for user in item[1]:

            owner_data = {
                "first_name": user["first_name"],
                "last_name": user["last_name"],
                "email": user["email"],
                "password": "123456789",
            }

            service.register_client(**owner_data)

            db.query(User).filter(User.email == user["email"]).update(
                {User.role: item[0]}
            )
            db.commit()

        print(f"-> {len(item[1])} {item[0].lower()}s inserted")

    db.close()


def seed_users(n_clients=10, n_staffs=10):

    db = SessionLocal()
    service = AuthService(db)

    for _ in range(n_clients):

        user_data = {
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "email": fake.email(),
            "password": "123456789",
        }

        service.register_client(**user_data)

    for _ in range(n_staffs):

        user_data = {
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "email": fake.email(),
            "password": "123456789",
        }

        service.register_staff(**user_data)

    db.close()

    print(f"-> {n_clients} clients inserted")
    print(f"-> {n_staffs} staffs inserted")
