from app.db.models.user import User
from sqlalchemy.orm import Session

class UserModel:

    def __init__(self, db: Session):
        self.db = db



    def create_user(self, first_name, last_name, email, hashed_password, role = "CLIENT"):
        user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            role=role,
            password=hashed_password
        )

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)

        return user



    def get_user_by_email(self, email):
        user = self.db.query(User).filter(User.email == email).first()
        return user
    


    def get_user_by_id(self, id):
        user = self.db.query(User).filter(User.id == id).first()
        return user
    


    def get_all_users(self):
        users = self.db.query(User).order_by(User.id).all()
        return users
    


    def get_all_clients(self):
        clients = self.db.query(User).filter(User.role == "CLIENT").order_by(User.id).all()
        return clients
    


    def get_all_stuffs(self):
        stuffs = self.db.query(User).filter(User.role == "STUFF").order_by(User.id).all()
        return stuffs
    


    def get_all_admins(self):
        admins = self.db.query(User).filter(User.role == "ADMIN").order_by(User.id).all()
        return admins
    


    def update_user_role(self, id, role):
        self.db.query(User).filter(User.id == id).update(
            {User.role: role}
        )
        self.db.commit()
        return True
    


    def update_user_active_status(self, id, status):
        self.db.query(User).filter(User.id == id).update(
            {User.is_active: status}
        )
        self.db.commit()
        return True