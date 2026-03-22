import pytest
from unittest.mock import MagicMock
from fastapi import HTTPException
from app.services.reservation import ReservationService


@pytest.fixture
def mock_model():
    return MagicMock()


@pytest.fixture
def service(db_session, mock_model):
    srv = ReservationService(db_session)
    srv.model = mock_model
    return srv


def test_create_reservation_success(service, mock_model):
    mock_model.check_reservation_existence.return_value = None
    mock_model.create_reservation.return_value = {"id": 1, "table_number": 5}

    result = service.create_reservation(
        table_number=5,
        date="2026-05-10",
        time="19:00",
        guests=2,
        note="Window seat",
        user_id=123,
    )

    assert result["id"] == 1
    mock_model.create_reservation.assert_called_once()


def test_create_reservation_conflict(service, mock_model):
    mock_model.check_reservation_existence.return_value = True

    with pytest.raises(HTTPException) as exc:
        service.create_reservation(
            table_number=5,
            date="2026-05-10",
            time="19:00",
            guests=2,
            note="Wait",
            user_id=123,
        )

    assert exc.value.status_code == 409
    assert exc.value.detail == "Reservation already exists"


def test_get_taken_timeslots_formatting(service, mock_model):
    mock_model.get_timeslots_by_table_date.return_value = [("12:00",), ("13:00",)]

    result = service.get_taken_timeslots(table=1, date="2026-05-10")

    assert result == ["12:00", "13:00"]
