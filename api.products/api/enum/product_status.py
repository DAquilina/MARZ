from enum import Enum


class ProductStatus(Enum):
    Active = "Active"
    InActive = "InActive"

    @staticmethod
    def from_str(str):
        if str == "Active":
            return ProductStatus.Active
        elif str == "InActive":
            return ProductStatus.InActive
        else:
            raise NotImplementedError
