import pytest
from unittest.mock import MagicMock, patch
from fastapi import HTTPException
from app.services.auth import AuthService


@pytest.fixture
def service(db_session):
    srv = AuthService(db_session)
    srv.model = MagicMock()
    return srv


def test_register_client_success(service):
    service.model.get_user_by_email.return_value = None

    mock_user = MagicMock()
    mock_user.id = 1
    mock_user.role = "CLIENT"
    service.model.create_user.return_value = mock_user

    with patch("app.services.auth.hash_password", return_value="hashed_pw"), patch(
        "app.services.auth.create_access_token", return_value="fake_token"
    ):

        result = service.register_client("john", "doe", "john@test.com", "password123")

        assert result["access_token"] == "fake_token"
        assert result["first_name"] == "John"
        assert result["role"] == "CLIENT"
        service.model.create_user.assert_called_once()


def test_register_client_duplicate_email(service):
    service.model.get_user_by_email.return_value = {"id": 1}

    result = service.register_client("john", "doe", "john@test.com", "password123")

    assert result is None
    service.model.create_user.assert_not_called()


def test_authenticate_user_blocked(service):
    mock_user = MagicMock()
    mock_user.password = "hashed_pw"
    mock_user.is_active = False
    service.model.get_user_by_email.return_value = mock_user

    with patch("app.services.auth.verify_password", return_value=True):
        with pytest.raises(HTTPException) as exc:
            service.authenticate_user("blocked@test.com", "password123")

        assert exc.value.status_code == 403
        assert "blocked" in exc.value.detail


def test_authenticate_user_invalid_password(service):
    mock_user = MagicMock()
    service.model.get_user_by_email.return_value = mock_user

    with patch("app.services.auth.verify_password", return_value=False):
        result = service.authenticate_user("user@test.com", "wrong_password")

        assert result is None
