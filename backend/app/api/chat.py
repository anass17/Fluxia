from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.deps import get_db
from app.services.query import QueryService
from app.schemas.menu import HistoryQuerySchema
from app.core.deps import require_roles


router = APIRouter(prefix='/chat', tags=['Chat'])


@router.get("", response_model=list[HistoryQuerySchema])
def get_all_user_queries(
    db: Session = Depends(get_db),
    user_id = Depends(require_roles("CLIENT")),
):

    service = QueryService(db)
    queries = service.get_all_user_queries(user_id)
    
    return queries