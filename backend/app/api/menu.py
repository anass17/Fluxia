from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.db.models import Plate
from app.services.menu import MenuService
from app.schemas.menu import MenuSchema


router = APIRouter(prefix='/menu', tags=['Menu'])


@router.post("/import")
async def import_recipes(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db)
):
    service = MenuService(db)
    return await service.create_menu(file)



@router.get("", response_model=list[MenuSchema])
def get_menu(
    db: Session = Depends(get_db)
):
    service = MenuService(db)
    return service.get_menu()



@router.get("/search")
def search_menu(
    query: str,
    db: Session = Depends(get_db)
):
    service = MenuService(db)
    return service.search_menu(query)