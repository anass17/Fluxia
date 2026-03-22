from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    db_user: str = "user"
    db_password: str = "password"
    db_host: str = "host"
    db_port: int = "5432"
    db_name: str = "fluxia"

    secret_key: str = "fluxia_123456789"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    model_config = SettingsConfigDict(
        env_file="../.env", extra="ignore", case_sensitive=False
    )


settings = Settings()
