from app.models.menu import MenuModel
from app.models.query import QueryModel

from sentence_transformers import SentenceTransformer
from app.utils.prompt import llm_prompt
from app.utils.ollama_generate import ollama_generate
import mlflow
import pandas as pd
import io

# import os


# os.environ['SENTENCE_TRANSFORMERS_HOME'] = './.model_cache'
embedding_model = SentenceTransformer("BAAI/bge-m3")
# embedding_model = None


class MenuService:

    def __init__(self, db):
        self.db = db
        self.model = MenuModel(db)
        self.query_model = QueryModel(db)

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

    @mlflow.trace()
    def search_menu(self, user_query: str, limit: int = 5):
        query_vector = embedding_model.encode(user_query).tolist()

        plates = self.model.search_by_similarity(query_vector, limit)

        formatted_results = []
        for plate in plates:
            formatted_results.append(
                {
                    "name": plate.Name,
                    "category": plate.RecipeCategory,
                    "ingredients": plate.RecipeIngredientParts,
                    "price": plate.Price,
                }
            )

        return formatted_results

    def llm_generate_answer(
        self,
        query: str,
        ollama_url: str,
        model: str,
        chunks: list,
        user_id: int,
        temperature: int = 0.2,
        max_tokens: int = 256,
        log_mlflow: bool = False,
    ) -> str:

        # Build context from chunks
        context = "\n\n".join(
            [
                f"Plate: {c['name']} | Category: {c['category']} | Ingredients: {c['ingredients']}"
                for c in chunks
            ]
        )

        prompt = llm_prompt(query, context)
        answer = ollama_generate(prompt, ollama_url, model, temperature, max_tokens)

        mlflow.log_text(prompt, "prompt_template.txt")

        if not log_mlflow:
            self.query_model.insert_query(query, answer, user_id)

        return answer
