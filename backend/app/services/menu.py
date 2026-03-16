from app.models.menu import MenuModel
from app.db.models import Plate
from fastapi import HTTPException, status
import pandas as pd
import io



class MenuService:

    def __init__(self, db):
        self.db = db
        self.model = MenuModel(db)



    async def create_menu(self, file):
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
        records = df.to_dict(orient="records")
        recipes = self.model.insert_menu_items(records)

        return {"message": f"{len(recipes)} recipes inserted successfully"}
    


    def get_menu(self):
        menu = self.model.get_menu()
        return menu