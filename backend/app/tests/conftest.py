import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.db.deps import get_db
from app.db.base import Base
from app.core.deps import get_current_user


# Use a separate SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"



engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)




@pytest.fixture(scope="function")
def db_session():
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)



@pytest.fixture(scope="function")
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as c:
        yield c

    app.dependency_overrides.clear()



@pytest.fixture
def as_client(client):
    def mock_get_client():
        return {"sub": 99, "role": "CLIENT"}

    from app.core.deps import get_current_user
    app.dependency_overrides[get_current_user] = mock_get_client
    yield client
    app.dependency_overrides.clear()



@pytest.fixture
def as_admin(client):
    def mock_get_admin():
        return {"sub": 1, "role": "ADMIN", "email": "admin@test.com"}

    app.dependency_overrides[get_current_user] = mock_get_admin
    yield client
    app.dependency_overrides.clear()



@pytest.fixture
def as_owner(client):
    def mock_get_owner():
        return {"sub": 1, "role": "OWNER", "email": "owner@test.com"}

    app.dependency_overrides[get_current_user] = mock_get_owner
    yield client
    app.dependency_overrides.clear()