from fastapi import APIRouter, Query
from app.schemas.recipe import RecipeSchema
from app.services.recipe_generator import RecipeGeneratorService
from random import randint

router = APIRouter(prefix="/generator", tags=["Synthetic Data"])


@router.get("/random", response_model=list[RecipeSchema])
def get_synthetic_recipes():
    count = randint(30, 100)
    return [RecipeGeneratorService.generate_one() for _ in range(count)]