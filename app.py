# -----Imports-----
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from json import JSONEncoder

from UsingAlgorithm import get_recommendation, update_recommendation_system
from TrainingAlgorithm import train_recommendation_system

# -----App initalization-----
app = Flask(__name__)
CORS(app)

# -----API endpoints-----
# Train
@app.route('/train', methods=['GET'])
def train():
    # Train
    train = train_recommendation_system()

    if train:
        return jsonify({"result": "Successfully trained!"}), 200
    else:
        return jsonify({"error": "Failed to train"}), 400

    

# Get recommendation
@app.route('/recommend', methods=['GET'])
def recommend():
    # Validate req params
    if "productid" not in request.args:
        return jsonify({"error": "Product id not provided!"}), 400
    
    if "productcount" not in request.args:
        return jsonify({"error": "Product count not provided!"}), 400

    if "sellercount" not in request.args:
        return jsonify({"error": "Seller count not provided!"}), 400
    
    # Get params
    product_id = int(request.args.get('productid'))
    product_count = int(request.args.get('productcount'))
    seller_count = int(request.args.get('sellercount'))

    # Validate user id
    if product_id <= 0:
        return jsonify({"error": "Product id is invalid!"}), 400
    
    # Validate user count
    if product_count <= 0:
        return jsonify({"error": "Product count is invalid!"}), 400
    
    # Validate seller count
    if seller_count <= 0:
        return jsonify({"error": "Seller count is invalid!"}), 400

    try:
        # Get the prediction
        recommended_seller = get_recommendation(product_count, seller_count, product_id)

        if recommended_seller is not None:
            return jsonify({"result": recommended_seller}), 200
        else:
            return jsonify({"error": "Failed to get the recommended seller!"}), 400

    except Exception as e:
        return jsonify({"error": "An error occurred: " + str(e)}), 400


# Update recommendation system
@app.route('/update', methods=['GET'])
def update():
    # Validate req params
    if "productid" not in request.args:
        return jsonify({"error": "Product id not provided!"}), 400
    
    if "productcount" not in request.args:
        return jsonify({"error": "Product count not provided!"}), 400

    if "sellercount" not in request.args:
        return jsonify({"error": "Seller count not provided!"}), 400

    if "recommendedseller" not in request.args:
        return jsonify({"error": "Recommended seller not provided!"}), 400

    if "reward" not in request.args:
        return jsonify({"error": "Reward not provided!"}), 400
    
    # Get params
    product_id = request.args.get('productid')
    product_count = request.args.get('productcount')
    seller_count = request.args.get('sellercount')
    recommended_seller = request.args.get('recommendedseller')
    reward = request.args.get('reward')

    # Validate user id
    if product_id == "":
        return jsonify({"error": "Product id is empty!"}), 400
    
    # Validate user count
    if product_count == 0 or product_count == "":
        return jsonify({"error": "Product count is 0 or empty!"}), 400
    
    # Validate seller count
    if seller_count == 0 or seller_count == "":
        return jsonify({"error": "Seller count is 0 or empty!"}), 400

    # Validate recommended seller
    if recommended_seller == "":
        return jsonify({"error": "Recommended seller is empty!"}), 400

    # Validate reward
    if reward is None or reward == "" or (isinstance(reward, (int, float)) and (reward < -1.0 or reward > 1.0)):
        return jsonify({"error": "Reward is lesser or greater than expected or empty!"}), 400

    # Update
    update = update_recommendation_system(product_count, seller_count, product_id, recommended_seller, reward)

    if update:
        return jsonify({"result": "Successfully updated!"}), 200
    else:
        return jsonify({"error": "Failed to update"}), 400

# -----Execute the app-----
if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5004)