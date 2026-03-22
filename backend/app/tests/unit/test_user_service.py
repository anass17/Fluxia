import pytest
from unittest.mock import MagicMock
from fastapi import HTTPException
from app.services.user import UserService



@pytest.fixture
def service(db_session):
    srv = UserService(db_session)
    srv.model = MagicMock()
    return srv



def test_promote_staff_success(service):
    mock_user = MagicMock(id=1, first_name="John", last_name="Doe", role="STAFF")
    service.model.get_user_by_id.return_value = mock_user

    result = service.promote_staff(1)

    assert result["role"] == "ADMIN"
    service.model.update_user_role.assert_called_once_with(1, "ADMIN")



def test_promote_staff_invalid_role(service):
    mock_user = MagicMock(id=1, role="CLIENT")
    service.model.get_user_by_id.return_value = mock_user

    with pytest.raises(HTTPException) as exc:
        service.promote_staff(1)
    
    assert exc.value.status_code == 400
    assert exc.value.detail == "You can only promote staff members"



def test_block_user_as_owner_success(service):
    mock_user = MagicMock(id=2, first_name="Staff", last_name="Member", role="STAFF")
    service.model.get_user_by_id.return_value = mock_user

    result = service.block_user(current_role="OWNER", user_id=2)

    assert result["status"] == "Blocked"
    service.model.update_user_active_status.assert_called_once_with(2, False)



def test_admin_cannot_block_admin(service):
    mock_user = MagicMock(id=3, role="ADMIN")
    service.model.get_user_by_id.return_value = mock_user

    with pytest.raises(HTTPException) as exc:
        service.block_user(current_role="ADMIN", user_id=3)
    
    assert exc.value.status_code == 400
    assert "Could not block this user" in exc.value.detail



def test_cannot_block_owner(service):
    mock_user = MagicMock(id=4, role="OWNER")
    service.model.get_user_by_id.return_value = mock_user

    with pytest.raises(HTTPException) as exc:
        service.block_user(current_role="OWNER", user_id=4)
    
    assert exc.value.status_code == 400



def test_user_not_found(service):
    service.model.get_user_by_id.return_value = None

    with pytest.raises(HTTPException) as exc:
        service.promote_staff(999)
    
    assert exc.value.status_code == 404