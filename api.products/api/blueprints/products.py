from flask import Blueprint, request
from marshmallow import ValidationError
from api.models import Product
from api.schemas import ProductSchema

from api.enum.product_status import ProductStatus


products_blueprint = Blueprint('products_blueprint', __name__)

@products_blueprint.route('/all', methods=['GET'])
def get_all_products():
    product_schema = ProductSchema(many=True)
    try:
        products = Product.select().dicts()
        products_serialized = product_schema.dump(products)
    except Exception as err:
        print(str(error))
        return { 'data': [], 'message': str(err) }, 500
    return { 'data': products_serialized, 'message': '' }, 200

@products_blueprint.route('/group_by_status', methods=['GET'])
def get_products_by_status():
    product_schema = ProductSchema(many=True)
    try:
        products = Product.select().dicts()
        grouped = {
            ProductStatus.Active.value: [],
            ProductStatus.InActive.value: []
        }
        for product in products:
            status = product.get("ProductStatus")
            if status in grouped.keys():
                grouped[status].append(product)
            else:
                grouped[status] = [product]
        grouped['Active'] = product_schema.dump(grouped['Active'])
        grouped['InActive'] = product_schema.dump(grouped['InActive'])
    except Exception as err:
        return { 'data': {}, 'message': str(err) }, 500
    return { 'data': grouped, 'message': '' }, 200

@products_blueprint.route('/update_status', methods=['POST'])
def post_update_product_status():
    product_schema = ProductSchema()
    json_data = request.get_json()

    # DEBUG
    print(json_data)
    
    if not json_data:
        return { 'message': 'No product data provided!' }, 400
    try:
        product = product_schema.load(json_data)

        # DEBUG
        print("test")
        print(product)

        Product.update({
            Product.ProductStatus: product['ProductStatus']
        }).where(
            Product.ProductID == product['ProductID']
        ).execute()
    except ValidationError as err:
        return { 'message': err.messages }, 422
    except Exception as err:
        return { 'message': str(err) }, 500
    return { 'message': f'{product["ProductID"]} updated successfully!' }, 200
