from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import pandas as pd
from app.db.deps import get_db
from app.db.models import Plate
import io


router = APIRouter(prefix='/menu', tags=['Menu'])


@router.post("/import")
async def import_recipes(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    
    contents = await file.read()
    df = pd.read_csv(io.StringIO(contents.decode("utf-8")))

    recipes = []

    for _, row in df.iterrows():
        recipe = Plate(
            Name=row["Name"],
            TotalTime=row["TotalTime"],
            RecipeCategory=row["RecipeCategory"],
            RecipeIngredientParts=row["RecipeIngredientParts"],
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

    db.add_all(recipes)
    db.commit()

    return {"message": f"{len(recipes)} recipes inserted successfully"}