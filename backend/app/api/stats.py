from fastapi import APIRouter, Depends, HTTPException, status
from app.services.stats import StatsService
from app.core.deps import require_roles
from app.db.deps import get_db
from sqlalchemy.orm import Session
from app.schemas.user import UserSchema



router = APIRouter(prefix='/stats', tags=['Statistics'])




@router.get("/owner")
def get_owner_stats(
    db: Session = Depends(get_db),
    user_id = Depends(require_roles("OWNER")),
):
    service = StatsService(db)

    return service.get_owner_stats()

