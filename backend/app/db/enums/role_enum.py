from enum import Enum

class EnumRole(str, Enum):
    OWNER = "OWNER"
    ADMIN = "ADMIN"
    STUFF = "STUFF"
    CLIENT = "CLIENT"