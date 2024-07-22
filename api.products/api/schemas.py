from marshmallow import Schema, fields, pre_load

from api.enum.product_status import ProductStatus


class ProductSchema(Schema):
    ProductID = fields.Int()
    ProductName = fields.Str()
    ProductPhotoURL = fields.Str()
    ProductStatus = fields.Enum(ProductStatus)
    ProductStatus = fields.Str()
    @pre_load
    def make_object(self, data, **kwargs):
        return data
