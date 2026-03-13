from fastapi import APIRouter, Depends, HTTPException, status
from app.services.reservation import ReservationService
from app.db.deps import get_db
from app.core.deps import get_current_user, require_roles
from sqlalchemy.orm import Session
from app.schemas.reservation import CreateReservationSchema, ReservationSchema



router = APIRouter(prefix='/reservations', tags=['Reservations'])




@router.get("", response_model=ReservationSchema)
def get_all_reservations(
    db: Session = Depends(get_db),
    user_id = Depends(require_roles(["CLIENT"]))
):
    service = ReservationService(db)

    return service.get_user_reservations(user_id)



@router.get("/all", response_model=list[ReservationSchema])
def get_all_reservations(
    db: Session = Depends(get_db)
):
    service = ReservationService(db)

    return service.get_all_reservations()



@router.post("", response_model=ReservationSchema)
def get_all_reservations_by_user(
    data: CreateReservationSchema,
    db: Session = Depends(get_db),
    user_id = Depends(require_roles("CLIENT"))
):
    service = ReservationService(db)

    return service.create_reservation(**data.model_dump(), user_id=user_id)
