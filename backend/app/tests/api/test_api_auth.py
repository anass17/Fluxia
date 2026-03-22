def test_register_client_success(client):
    payload = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com",
        "password": "strongpassword123",
    }
    response = client.post("/auth/client/register", json=payload)

    assert response.status_code == 201
    assert "access_token" in response.json()


def test_register_duplicate_email(client):
    payload = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "duplicate@example.com",
        "password": "123456789",
    }

    client.post("/auth/client/register", json=payload)

    response = client.post("/auth/client/register", json=payload)

    assert response.status_code == 409
    assert response.json()["detail"] == "Email already exists"


def test_login_success(client):
    reg_payload = {
        "first_name": "Jane",
        "last_name": "Smith",
        "email": "jane@example.com",
        "password": "123456789",
    }
    client.post("/auth/client/register", json=reg_payload)

    # Try to login
    login_payload = {"email": "jane@example.com", "password": "123456789"}
    response = client.post("/auth/login", json=login_payload)

    assert response.status_code == 200
    assert "access_token" in response.json()


def test_login_invalid_credentials(client):
    login_payload = {"email": "wrong@example.com", "password": "000000000"}
    response = client.post("/auth/login", json=login_payload)

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"
