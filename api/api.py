from flask import Flask, jsonify, current_app, request
from config import Config
import stripe
import json
import flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder="../build", static_url_path='/')
CORS(app)
app.config.from_object(Config)

@app.route('/')
@cross_origin()
def index():
    return app.send_static_file('index.html')

@app.route('/api/shop/products')
@cross_origin()
def get_products():
    stripe.api_key = current_app.config.get('STRIPE_SECRET_KEY')
    return jsonify(stripe.Product.list())

@app.route('/api/shop/checkout', methods=["POST"])
def get_cart():
    stripe.api_key = current_app.config.get('STRIPE_SECRET_KEY')
    products = json.loads(request.get_data().decode('utf-8'))
    print(type(products))
    lst = []
    for product in products['items'].values():
        product_dict = {
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': product['name'],
                        'images': product['images'],
                    },
                    'unit_amount': int(float(product["price"])),
                },
                'quantity': product['quantity'],
                
            }
        lst.append(product_dict)
    try:
        # HANDLE PAYMENT
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            shipping_address_collection={
            'allowed_countries': ['US', 'CA'],
            },
            line_items=lst,
            mode='payment',
            success_url='http://localhost:5000/shop/cart',
            cancel_url='http://localhost:5000/shop/cart',
        )

        return jsonify({ 'session_id': checkout_session.id })
        # redirect(url_for('shop.checkout'))
    except Exception as e:
        return jsonify(error=str(e)), 403

if __name__ == '__main__':
    app.run()