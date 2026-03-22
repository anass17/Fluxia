from enum import Enum


class EnumActionType(str, Enum):
    ADDITION = "ADDITION"
    MODIFICATION = "MODIFICATION"
    DELETION = "DELETION"
