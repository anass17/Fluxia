from pydantic import BaseModel


class MenuSchema(BaseModel):
    Name: str
    TotalTime: int
    RecipeCategory: str
    RecipeIngredientParts: str
    Price: int
    Calories: float
    FatContent: float
    SaturatedFatContent: float
    CholesterolContent: float
    SodiumContent: float
    CarbohydrateContent: float
    FiberContent: float
    SugarContent: float
    ProteinContent: float


class QuerySchema(BaseModel):
    query: str


class HistoryQuerySchema(BaseModel):
    query: str
    answer: str
