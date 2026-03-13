from enum import Enum

class EnumReservationStatus(str, Enum):
    COMING = "COMING"
    ONGOING = "ONGOING"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"