from app.db.models.plate import Plate
from sqlalchemy.orm import Session



class MenuModel:

    def __init__(self, db: Session):
        self.db = db

    

    def insert_menu_items(self, items):

        recipes = []

        for row in items:
            recipe = Plate(
                Name=row["Name"],
                TotalTime=row["TotalTime"],
                RecipeCategory=row["RecipeCategory"],
                RecipeIngredientParts=row["RecipeIngredientParts"],
                Price=row["Price"],
                Calories=row["Calories"],
                FatContent=row["FatContent"],
                SaturatedFatContent=row["SaturatedFatContent"],
                CholesterolContent=row["CholesterolContent"],
                SodiumContent=row["SodiumContent"],
                CarbohydrateContent=row["CarbohydrateContent"],
                FiberContent=row["FiberContent"],
                SugarContent=row["SugarContent"],
                ProteinContent=row["ProteinContent"],
            )
            recipes.append(recipe)

        self.db.add_all(recipes)
        self.db.commit()

        return recipes


    
    def get_menu(self):
        menu = self.db.query(Plate).all()
        return menu