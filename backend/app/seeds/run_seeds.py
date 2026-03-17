# from app.seeds.seed_menu import seed_menu
from app.seeds.user import seed_users, seed_custom_users

def run():

    seed_custom_users()
    seed_users(10)

    print("✅ Database seeded")


if __name__ == "__main__":
    run()