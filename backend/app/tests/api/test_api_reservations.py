from datetime import date, timedelta
from app.models.reservation import Reservation


def test_create_reservation_success(as_client):
    payload = {
        "table_number": 5,
        "date": str(date.today() + timedelta(days=1)),
        "time": "18:00",
        "guests": 4,
        "note": "",
    }

    response = as_client.post("/reservations", json=payload)

    assert response.status_code == 200
    assert response.json()["table_number"] == 5
    assert response.json()["user_id"] == 99


def test_get_taken_timeslots(client, db_session):
    test_date = date.today() + timedelta(days=1)
    res = Reservation(
        table_number=1, date=test_date, time="19:00", user_id=99, note="", guests=4
    )
    db_session.add(res)
    db_session.commit()

    response = client.get(f"/reservations/timeslots?date={test_date}&table=1")

    assert response.status_code == 200
    assert "19:00" in response.json()


def test_get_all_reservations_as_staff(as_admin, db_session):
    res1 = Reservation(
        table_number=1, date=date.today(), time="12:00", user_id=1, note="", guests=4
    )
    res2 = Reservation(
        table_number=2, date=date.today(), time="13:00", user_id=2, note="", guests=4
    )
    db_session.add_all([res1, res2])
    db_session.commit()

    response = as_admin.get("/reservations/all")

    assert response.status_code == 200
    assert len(response.json()) >= 2


def test_prevent_double_booking(as_client):
    booking_date = date.today() + timedelta(days=2)
    existing_payload = {
        "table_number": 10,
        "date": str(booking_date),
        "time": "20:00",
        "guests": 4,
        "note": "",
    }
    as_client.post("/reservations", json=existing_payload)

    duplicate_response = as_client.post("/reservations", json=existing_payload)

    assert duplicate_response.status_code == 409
    assert duplicate_response.json()["detail"].lower() == "reservation already exists"
