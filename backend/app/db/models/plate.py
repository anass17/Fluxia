from sqlalchemy import Column, Integer, Float, String, Text
from app.db.base import Base
from pgvector.sqlalchemy import Vector


class Plate(Base):
    __tablename__ = "plates"

    id = Column(Integer, primary_key=True, index=True)

    Name = Column(String(255), nullable=False)
    TotalTime = Column(Integer)
    RecipeCategory = Column(String(100))
    RecipeIngredientParts = Column(Text)
    Price = Column(Integer)

    Calories = Column(Float)
    FatContent = Column(Float)
    SaturatedFatContent = Column(Float)
    CholesterolContent = Column(Float)
    SodiumContent = Column(Float)
    CarbohydrateContent = Column(Float)
    FiberContent = Column(Float)
    SugarContent = Column(Float)
    ProteinContent = Column(Float)

    ingredients_vector = Column(Vector(1024))