from fastapi import APIRouter, Depends
from app.services.reservation import ReservationService
from app.db.deps import get_db
from app.core.deps import require_roles
from sqlalchemy.orm import Session
from app.schemas.reservation import CreateReservationSchema, ReservationSchema
from datetime import date

router = APIRouter(prefix="/reservations", tags=["Reservations"])


@router.get("", response_model=list[ReservationSchema])
def get_user_reservations(
    db: Session = Depends(get_db), user_id=Depends(require_roles("CLIENT"))
):
    service = ReservationService(db)

    return service.get_user_reservations(user_id)


@router.get("/all", response_model=list[ReservationSchema])
def get_all_reservations(
    db: Session = Depends(get_db),
    user_id=Depends(require_roles("STAFF", "ADMIN", "OWNER")),
):
    service = ReservationService(db)

    return service.get_all_reservations()


@router.post("", response_model=ReservationSchema)
def create_reservation(
    data: CreateReservationSchema,
    db: Session = Depends(get_db),
    user_id=Depends(require_roles("CLIENT")),
):
    service = ReservationService(db)

    return service.create_reservation(**data.model_dump(), user_id=user_id)


@router.get("/timeslots", response_model=list[str])
def get_taken_timeslots(
    date: date,
    table: int,
    db: Session = Depends(get_db),
    # user_id = Depends(require_roles("CLIENT")),
):
    service = ReservationService(db)

    return service.get_taken_timeslots(table, date)


@router.get("/date")
def get_reservations_by_date(
    date: date,
    db: Session = Depends(get_db),
    user_id=Depends(require_roles("CLIENT")),
):
    service = ReservationService(db)

    return service.get_reservations_by_date(user_id, date)


@router.get("/date/all")
def get_all_reservations_by_date(
    date: date,
    db: Session = Depends(get_db),
    user_id=Depends(require_roles("STAFF", "ADMIN", "OWNER")),
):
    service = ReservationService(db)

    return service.get_all_reservations_by_date(date)
