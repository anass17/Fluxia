from fastapi import APIRouter, Depends, HTTPException, status
from app.services.user import UserService
from app.db.deps import get_db
from sqlalchemy.orm import Session
from app.schemas.user import UserSchema, UserRoleUpdateResponse



router = APIRouter(prefix='/users', tags=['Users'])



# Get All Users

@router.get("", response_model=list[UserSchema])
def get_all_users(
    db: Session = Depends(get_db)
):
    service = UserService(db)

    return service.get_all_users()



# Get All Clients

@router.get("/clients", response_model=list[UserSchema])
def get_all_clients(
    db: Session = Depends(get_db)
):
    service = UserService(db)

    return service.get_all_clients()



# Get All Stuffs

@router.get("/stuffs", response_model=list[UserSchema])
def get_all_stuffs(
    db: Session = Depends(get_db)
):
    service = UserService(db)

    return service.get_all_stuffs()



# Get All Admins

@router.get("/admins", response_model=list[UserSchema])
def get_all_admins(
    db: Session = Depends(get_db)
):
    service = UserService(db)

    return service.get_all_admins()



# Promote Stuffs

@router.put("/promote/{id}")
def promote_stuff(
    id: int,
    db: Session = Depends(get_db)
):
    service = UserService(db)

    return service.promote_stuff(id)



# Demote Admins

@router.put("/demote/{id}")
def demote_admin(
    id: int,
    db: Session = Depends(get_db)
):
    service = UserService(db)

    return service.demote_stuff(id)



# Block User

@router.put("/block/{id}")
def block_user(
    id: int,
    db: Session = Depends(get_db)
):
    service = UserService(db)

    return service.block_user("OWNER", id)



# Unblock User

@router.put("/unblock/{id}")
def unblock_user(
    id: int,
    db: Session = Depends(get_db)
):
    service = UserService(db)

    return service.activate_user("OWNER", id)