from airflow import DAG
from airflow.operators.python import PythonOperator
from datetime import datetime
from sqlalchemy import create_engine
import pandas as pd
import os


db_user = os.getenv("POSTGRES_USER", "postgres")
db_pass = os.getenv("POSTGRES_PASSWORD", "password")
db_host = os.getenv("POSTGRES_HOST", "localhost")
db_port = os.getenv("POSTGRES_PORT", "5432")
db_name = os.getenv("POSTGRES_DB", "fluxia")



def call_api():
    import requests
    response = requests.get("http://backend:8000/generator/random")
    return response.json()



def transform_recipes(ti):
    recipes_list = ti.xcom_pull(task_ids='get_recipes')

    if not recipes_list:
        print("No data found to clean.")
        return
    
    data = pd.DataFrame(recipes_list)

    data = data[["Name", "TotalTime", "RecipeCategory", "RecipeIngredientParts", "Calories", "FatContent", "SaturatedFatContent", "CholesterolContent", "SodiumContent", "CarbohydrateContent", "FiberContent", "SugarContent", "ProteinContent"]]

    data = data[data["RecipeCategory"].notnull()]

    data = data.drop_duplicates(subset=["Name"])

    data = data[data["TotalTime"].str.find("H") < 0]        # Takes at least an hour

    data = data[data["TotalTime"].str.find("S") < 0]        # Instant

    data = data[data["TotalTime"].str.replace("PT", '').str.replace("M", '').astype(int) <= 15]

    data = data[data["RecipeIngredientParts"].str.find("vodka") < 0]

    data["TotalTime"] = data["TotalTime"].str.replace("PT", '').str.replace("M", '').astype(int)

    # Keep only relevant categories
    categories = [
        "Beverages",
        "Breakfast",
        "Lunch/Snacks",
        "Salad",
        "Soup/Stew",
        "Pasta",
        "Rice",
        "Seafood",
        "Meat",
        "Dessert"
    ]

    data = data[data['RecipeCategory'].isin(categories)]

    return data



def load_recipes(ti):
    df : pd.DataFrame = ti.xcom_pull(task_ids='transform_recipes')

    engine = create_engine(f"postgresql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}")

    df.to_sql('synthetic_recipes', engine, if_exists='append', index=False)
    
    print("Data successfully loaded into the database.")



with DAG(
    'fluxia_dag',
    start_date=datetime(2026, 1, 1),
    description='Periodic restaurant data sync',
    schedule_interval="0 0 * * *",
    catchup=False,
) as dag:


    extract = PythonOperator(
        task_id='get_recipes',
        python_callable=call_api
    )

    transform = PythonOperator(
        task_id='transform_recipes',
        python_callable=transform_recipes
    )

    load = PythonOperator(
        task_id='load_recipes',
        python_callable=load_recipes
    )

    extract >> transform >> load
