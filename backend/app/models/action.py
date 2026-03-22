from app.db.models.action import Action
from sqlalchemy.orm import Session


class ActionModel:

    def __init__(self, db: Session):
        self.db = db

    def create_action(self, type, entity, message, user_id):
        action = Action(type=type, entity=entity, message=message, user_id=user_id)

        self.db.add(action)
        self.db.commit()
        self.db.refresh(action)

        return action

    def get_last_actions(self):
        actions = self.db.query(Action).order_by(Action.id.desc).limit(3).all()

        return actions
