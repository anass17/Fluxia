from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class RecipeSchema(BaseModel):
    RecipeId: int
    Name: str
    AuthorId: int
    AuthorName: str
    CookTime: Optional[str] = None
    PrepTime: Optional[str] = None
    TotalTime: Optional[str] = None
    DatePublished: Optional[datetime] = None
    Description: Optional[str] = None
    Images: Optional[str] = None
    RecipeCategory: Optional[str] = None
    Keywords: Optional[str] = None
    RecipeIngredientQuantities: Optional[str] = None
    RecipeIngredientParts: Optional[str] = None
    AggregatedRating: Optional[float] = None
    ReviewCount: Optional[int] = None
    Calories: Optional[float] = None
    FatContent: Optional[float] = None
    SaturatedFatContent: Optional[float] = None
    CholesterolContent: Optional[float] = None
    SodiumContent: Optional[float] = None
    CarbohydrateContent: Optional[float] = None
    FiberContent: Optional[float] = None
    SugarContent: Optional[float] = None
    ProteinContent: Optional[float] = None
    RecipeServings: Optional[int] = None
    RecipeYield: Optional[str] = None
    RecipeInstructions: Optional[str] = None
