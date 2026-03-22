# from app.seeds.seed_menu import seed_menu
from app.seeds.user import seed_users, seed_custom_users
from app.seeds.reservation import seed_reservations

def run():

    seed_custom_users()
    seed_users(30, 10)
    seed_reservations(200)

    print("✅ Database seeded")


if __name__ == "__main__":
    run()