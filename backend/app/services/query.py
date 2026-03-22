from app.models.query import QueryModel


class QueryService:

    def __init__(self, db):
        self.db = db
        self.model = QueryModel(db)

    def get_all_user_queries(self, user_id):
        return self.model.get_user_queries(user_id)

    def delete_all_user_queries(self, user_id):
        try:
            self.model.delete_user_queries(user_id)
            return True
        except Exception:
            return False
