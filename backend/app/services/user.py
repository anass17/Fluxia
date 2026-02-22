from app.models.user import UserModel
from fastapi import HTTPException, status


class UserService:

    def __init__(self, db):
        self.db = db
        self.model = UserModel(db)



    def get_all_users(self):
        users = self.model.get_all_users()
        return users
    


    def get_all_clients(self):
        clients = self.model.get_all_clients()
        return clients
    


    def get_all_stuffs(self):
        stuffs = self.model.get_all_stuffs()
        return stuffs
    


    def get_all_admins(self):
        admins = self.model.get_all_admins()
        return admins
    


    def promote_stuff(self, id):
        user = self.model.get_user_by_id(id)

        if not user:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "User Not Found")
        elif user.role != "STUFF":
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "You can only promote stuff members")
        
        self.model.update_user_role(id, "ADMIN")

        return {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": "ADMIN"
        }
    


    def demote_stuff(self, id):
        user = self.model.get_user_by_id(id)

        if not user:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "User Not Found")
        elif user.role != "ADMIN":
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "You can only demote admins")
        
        self.model.update_user_role(id, "STUFF")

        return {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": "STUFF"
        }
    


    def block_user(self, current_role, user_id):
        user = self.model.get_user_by_id(user_id)

        if not user:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "User Not Found")
        elif user.role == "OWNER":
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "Could not block this user")
        elif current_role == "ADMIN" and user.role == "ADMIN":
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "Could not block this user")
        
        self.model.update_user_active_status(user_id, False)

        return {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "status": "Blocked"
        }
    
    

    def activate_user(self, current_role, user_id):
        user = self.model.get_user_by_id(user_id)

        if not user:
            raise HTTPException(status.HTTP_404_NOT_FOUND, "User Not Found")
        elif user.role == "OWNER":
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "Could not activate this user")
        elif current_role == "ADMIN" and user.role == "ADMIN":
            raise HTTPException(status.HTTP_400_BAD_REQUEST, "Could not activate this user")
        
        self.model.update_user_active_status(user_id, True)

        return {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "status": "Active"
        }