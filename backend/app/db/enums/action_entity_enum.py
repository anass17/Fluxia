from enum import Enum

class EnumActionEntity(str, Enum):
    ORDER = "ORDER"
    RESERVATION = "RESERVATION"
    MENU = "MENU"
    USER = "USER"