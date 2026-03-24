import random
from datetime import datetime, timedelta
from faker import Faker

fake = Faker()

class RecipeGeneratorService:
    @staticmethod
    def generate_one():
        # Pre-define some categories and parts for realism
        categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Vegan"]
        ingredients = ["Chicken", "Tomato", "Garlic", "Onion", "Pasta", "Olive Oil", "Basil", "Milk", "Celery", "Carrot", "Garlic Clove", "Honey", "Black Beans", "Pinto Beans", "Water", "Butter", "Rice"]
        
        # Calculate times
        prep = random.randint(5, 30)
        cook = random.randint(10, 120)
        
        return {
            "RecipeId": random.randint(1000, 99999),
            "Name": f"{fake.word().capitalize()} {fake.word().capitalize()} Delight",
            "AuthorId": random.randint(1, 500),
            "AuthorName": fake.name(),
            "CookTime": f"PT{cook}M",
            "PrepTime": f"PT{prep}M",
            "TotalTime": f"PT{prep + cook}M",
            "DatePublished": fake.date_time_between(start_date="-5y", end_date="now").isoformat(),
            "Description": fake.sentence(nb_words=12),
            "Images": f"https://picsum.photos/seed/{random.randint(1, 1000)}/600/400",
            "RecipeCategory": random.choice(categories),
            "Keywords": ", ".join(fake.words(nb=3)),
            "RecipeIngredientQuantities": f"{random.randint(1,5)} cups, {random.randint(1,3)} tsp",
            "RecipeIngredientParts": ", ".join(random.sample(ingredients, random.randint(3, 10))),
            "AggregatedRating": round(random.uniform(1.0, 5.0), 1),
            "ReviewCount": random.randint(0, 1000),
            "Calories": float(random.randint(100, 800)),
            "FatContent": float(random.randint(5, 40)),
            "SaturatedFatContent": float(random.randint(1, 15)),
            "CholesterolContent": float(random.randint(0, 100)),
            "SodiumContent": float(random.randint(100, 1500)),
            "CarbohydrateContent": float(random.randint(10, 100)),
            "FiberContent": float(random.randint(0, 15)),
            "SugarContent": float(random.randint(0, 30)),
            "ProteinContent": float(random.randint(5, 50)),
            "RecipeServings": random.randint(1, 8),
            "RecipeYield": f"Serves {random.randint(1, 8)}",
            "RecipeInstructions": fake.paragraph(nb_sentences=5)
        }