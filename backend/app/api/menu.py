from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.db.models import Plate
from app.services.menu import MenuService
from app.schemas.menu import MenuSchema, QuerySchema


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



LLM_MODEL = "llama3:8b"


@router.post("/answer")
def get_answer_to_query(
    data: QuerySchema,
    db: Session = Depends(get_db)
):
    
    ollama_url = "http://host.docker.internal:11434/api/generate"

    service = MenuService(db)
    context = service.search_menu(data.query)

    answer = service.llm_generate_answer(data.query, ollama_url, LLM_MODEL, context)
    
    return {
        "answer": answer
    }