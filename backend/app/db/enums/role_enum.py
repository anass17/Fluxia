from enum import Enum

class EnumRole(str, Enum):
    OWNER = "OWNER"
    ADMIN = "ADMIN"
    STAFF = "STAFF"
    CLIENT = "CLIENT"