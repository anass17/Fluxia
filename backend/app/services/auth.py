from app.core.security import create_access_token, verify_password, hash_password
from app.models.user import UserModel
from fastapi import HTTPException, status


class AuthService:

    def __init__(self, db):
        self.db = db
        self.model = UserModel(db)



    def register_client(self, first_name: str, last_name: str, email: str, password: str):
        existing_user = self.model.get_user_by_email(email)

        first_name = first_name.capitalize()
        last_name = last_name.capitalize()

        if existing_user:
            return None

        user = self.model.create_user(first_name, last_name, email, hash_password(password))

        token = create_access_token({"sub": str(user.id), "role": user.role})

        return {
            "access_token": token,
            "first_name": first_name,
            "last_name": last_name,
            "role": "CLIENT"
        }
    


    def register_staff(self, first_name: str, last_name: str, email: str, password: str):
        existing_user = self.model.get_user_by_email(email)

        first_name = first_name.capitalize()
        last_name = last_name.capitalize()

        if existing_user:
            return None

        user = self.model.create_user(first_name, last_name, email, hash_password(password), "STAFF")

        token = create_access_token({"sub": str(user.id), "role": user.role})

        return {
            "access_token": token,
            "first_name": first_name,
            "last_name": last_name,
            "role": "STAFF"
        }
    



    def authenticate_user(self, email: str, password: str):
        user = self.model.get_user_by_email(email)

        if not user:
            return None

        if not verify_password(password, user.password):
            return None
        
        if user.is_active == False:
            raise HTTPException(status.HTTP_403_FORBIDDEN, "Your account has been blocked by an admin")

        token = create_access_token({"sub": str(user.id), "role": user.role})
        return {
            "access_token": token,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role
        }