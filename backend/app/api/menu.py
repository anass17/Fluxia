from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.services.menu import MenuService
from app.schemas.menu import MenuSchema, QuerySchema
from app.core.deps import require_roles
import mlflow

EMBEDDING_MODEL = "BAAI/bge-m3"
EMBEDDING_SIZE = 1024
TOP_K = 5
LLM_MODEL = "llama3:8b"
LLM_TEMPERATURE = 0.2
LLM_MAX_TOKENS = 500


router = APIRouter(prefix="/menu", tags=["Menu"])


@router.post("/import")
async def import_recipes(file: UploadFile = File(...), db: Session = Depends(get_db)):
    service = MenuService(db)
    return await service.create_menu(file)


@router.get("", response_model=list[MenuSchema])
def get_menu(db: Session = Depends(get_db)):
    service = MenuService(db)
    return service.get_menu()


@router.get("/search")
def search_menu(query: str, db: Session = Depends(get_db)):
    service = MenuService(db)
    return service.search_menu(query)


@router.post("/chat")
def get_answer_to_query(
    data: QuerySchema,
    db: Session = Depends(get_db),
    user_id=Depends(require_roles("CLIENT")),
):

    ollama_url = "http://host.docker.internal:11434/api/generate"

    service = MenuService(db)
    context = service.search_menu(data.query)

    answer = service.llm_generate_answer(
        data.query, ollama_url, LLM_MODEL, context, user_id
    )

    return {"answer": answer}


@router.post("/chat/mlflow")
def log_to_mlflow(data: QuerySchema, db: Session = Depends(get_db)):

    mlflow.set_tracking_uri("http://mlflow:5000")
    mlflow.set_experiment("Fluxia")

    with mlflow.start_run(run_name="rag_system"):
        mlflow.log_param("EMBEDDING_MODEL", EMBEDDING_MODEL)
        mlflow.log_param("EMBEDDING_SIZE", EMBEDDING_SIZE)
        mlflow.log_param("TOP_K", TOP_K)
        mlflow.log_param("LLM_MODEL", LLM_MODEL)
        mlflow.log_param("LLM_TEMPERATURE", LLM_TEMPERATURE)
        mlflow.log_param("LLM_MAX_TOKENS", LLM_MAX_TOKENS)

        ollama_url = "http://host.docker.internal:11434/api/generate"

        service = MenuService(db)
        context = service.search_menu(data.query)

        answer = service.llm_generate_answer(
            data.query,
            ollama_url,
            LLM_MODEL,
            context,
            1,
            LLM_TEMPERATURE,
            LLM_MAX_TOKENS,
            True,
        )

        mlflow.log_dict(
            {
                "Query": data.query,
                "Answer": answer,
                "Context": context,
            },
            "generation_details.json",
        )

    return {"answer": answer}
