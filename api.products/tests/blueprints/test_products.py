from pytest import fixture
from app import PRODUCTS_URL
from api.blueprints.products import products_blueprint
from api.models import Product
import json

@fixture()
def test_client(test_app):
    test_app.register_blueprint(products_blueprint, url_prefix=PRODUCTS_URL)
    return test_app.test_client()

@fixture()
def init_db():
    active_product = Product(
        ProductName="Test1",
        ProductPhotoURL="/test1",
        ProductStatus="Active"
    )
    active_product.save()
    in_active_product = Product(
        ProductName="Test2",
        ProductPhotoURL="/test2",
        ProductStatus="InActive"
    )
    in_active_product.save()

    return [active_product, in_active_product]

def test_get_all_product(test_client, init_db):
    response = test_client.get(f"{PRODUCTS_URL}/all")
    assert response.status_code == 200
    deserialized_response = json.loads(response.data)
    data = deserialized_response.get('data')
    assert data is not None
    assert len(data) == 2
    product_statuses = {}
    for product in data:
        status = product.get("ProductStatus")
        if status in product_statuses.keys():
            product_statuses[status] += 1
        else: product_statuses[status] = 1
    assert len(product_statuses.keys()) == 2
    assert product_statuses.get("Active") == 1
    assert product_statuses.get("InActive") == 1

def test_post_update_product_status_empty_json(test_client):
    response = test_client.post(f"{PRODUCTS_URL}/update_status", json={})
    assert response.status_code == 400
    deserialized_response = json.loads(response.data)
    message = deserialized_response.get('message')
    assert message == 'No product data provided!'

def test_post_update_product_status_validation_error(test_client):
    response = test_client.post(
        f"{PRODUCTS_URL}/update_status",
        json={ "test": "test"},
    )
    assert response.status_code == 422

def test_post_update_product_status_database_error(test_client, init_db):
    [active_product, _] = init_db
    response = test_client.post(
        f"{PRODUCTS_URL}/update_status",
        json={
            "ProductID": active_product.ProductID,
            "ProductName": "test product",
            "ProductPhotoURL": "/test",
            "ProductStatus": "Having an existential crisis"
        },
    )
    assert response.status_code == 500

def test_post_update_product_status(test_client, init_db):
    [active_product, in_active_product] = init_db
    productID = in_active_product.ProductID
    response = test_client.post(
        f"{PRODUCTS_URL}/update_status",
        json={
            "ProductID": productID,
            "ProductName": "test product",
            "ProductPhotoURL": "/test",
            "ProductStatus": "Active"
        },
    )
    deserialized_response = json.loads(response.data)
    message = deserialized_response.get('message')
    assert message == f'{productID} updated successfully!'
    assert response.status_code == 200
