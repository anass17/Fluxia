from app.models.menu import MenuModel
from app.db.models import Plate
from fastapi import HTTPException, status
from sentence_transformers import SentenceTransformer
import pandas as pd
import io


embedding_model = SentenceTransformer('BAAI/bge-m3')


class MenuService:

    def __init__(self, db):
        self.db = db
        self.model = MenuModel(db)



    async def create_menu(self, file):
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

        texts_to_embed = [
            f"Dish: {row['Name']}. Category: {row['RecipeCategory']}. Ingredients: {row['RecipeIngredientParts']}."
            for _, row in df.iterrows()
        ]
        embeddings = embedding_model.encode(texts_to_embed, show_progress_bar=True)

        records = df.to_dict(orient="records")
        for i, record in enumerate(records):
            record["ingredients_vector"] = embeddings[i].tolist()

        recipes = self.model.insert_menu_items(records)

        return {"message": f"{len(recipes)} recipes inserted successfully"}
    


    def get_menu(self):
        menu = self.model.get_menu()
        return menu
    

    def search_menu(self, user_query: str, limit: int = 5):
        query_vector = embedding_model.encode(user_query).tolist()

        plates = self.model.search_by_similarity(query_vector, limit)

        formatted_results = []
        for plate in plates:
            formatted_results.append({
                "name": plate.Name,
                "category": plate.RecipeCategory,
                "ingredients": plate.RecipeIngredientParts,
                "price": plate.Price
            })

        return formatted_results