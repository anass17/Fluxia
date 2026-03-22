from app.models.stats import StatsModel


class StatsService:

    def __init__(self, db):
        self.db = db
        self.model = StatsModel(db)

    def get_owner_stats(self):
        stats = self.model.get_owner_stats()

        return {
            "clients": stats["clients"],
            "staffs": stats["staffs"],
            "admins": stats["admins"],
            "reservations": stats["reservations"],
            "activities": [
                {
                    "who": "Admin - Sarah",
                    "action": "Updated Menu Prices",
                    "date": "2026-03-20T22:37",
                },
                {
                    "who": "Staff - Marco",
                    "action": "Modified Ingredient (Pasta)",
                    "date": "2026-03-19T22:37",
                },
                {
                    "who": "Staff - Alex",
                    "action": "Added 2 New Staff",
                    "date": "2026-03-18T22:37",
                },
            ],
            "most_ordered": {"name": "Pesto Pasta", "sold_units": 81},
        }
