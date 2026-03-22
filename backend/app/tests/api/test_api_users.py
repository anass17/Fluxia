from app.models.user import User


# Helper to create users in the test DB
def create_user(db, email, role, is_active=True):
    user = User(
        email=email,
        role=role,
        is_active=is_active,
        first_name="Test",
        last_name="User",
        password="hashed_password",
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def test_get_all_users_success(as_admin, db_session):
    create_user(db_session, "user1@test.com", "CLIENT")
    create_user(db_session, "user2@test.com", "STAFF")

    # Call endpoint using the admin-authenticated client
    response = as_admin.get("/users")

    assert response.status_code == 200
    assert len(response.json()) == 2


def test_promote_staff_to_admin(as_owner, db_session):
    staff = create_user(db_session, "staff@test.com", "STAFF")

    response = as_owner.put(f"/users/promote/{staff.id}")

    assert response.status_code == 200
    db_session.refresh(staff)
    assert staff.role == "ADMIN"


def test_block_user_logic(as_owner, db_session):
    user = create_user(db_session, "active@test.com", "CLIENT", is_active=True)

    response = as_owner.put(f"/users/block/{user.id}")

    assert response.status_code == 200
    db_session.refresh(user)
    assert user.is_active is False


def test_unauthorized_access(client):
    response = client.get("/users")

    # Missing credentials usually return 401.
    # If the user is logged in but has the wrong role, it's usually 403.
    assert response.status_code == 401
    assert response.json()["detail"] == "Not authenticated"


def test_promote_non_existent_user(as_owner):
    response = as_owner.put("/users/promote/9999")

    assert response.status_code == 404
    assert "not found" in response.json()["detail"].lower()


def test_promote_invalid_role(as_owner, db_session):
    client_user = create_user(db_session, "client@test.com", "CLIENT")

    response = as_owner.put(f"/users/promote/{client_user.id}")

    # Usually a 400 Bad Request or 403 for business logic violations
    assert response.status_code == 400
    assert response.json()["detail"].lower() == "you can only promote staff members"
