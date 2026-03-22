from app.db.models.query import Query
from sqlalchemy.orm import Session


class QueryModel:

    def __init__(self, db: Session):
        self.db = db

    def insert_query(self, user_query, answer, user_id):
        query = Query(
            query=user_query,
            answer=answer,
            user_id=user_id,
        )

        self.db.add(query)
        self.db.commit()
        self.db.refresh(query)

        return query

    def get_user_queries(self, user_id):
        queries = (
            self.db.query(Query)
            .filter(Query.user_id == user_id)
            .order_by(Query.id)
            .all()
        )

        return queries

    def delete_user_queries(self, user_id):
        self.db.query(Query).filter(Query.user_id == user_id).delete()

        self.db.commit()
