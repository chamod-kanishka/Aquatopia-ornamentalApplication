# -----Imports-----
from UseModel import get_prediction
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from json import JSONEncoder

# -----App initalization-----
app = Flask(__name__)
CORS(app)

# -----API endpoints-----
# Get prediction
@app.route('/predict', methods=['GET'])
def pedict():
    # Variables
    final = ""

    # Validate req params
    if "symptoms" not in request.args:
        return jsonify({"error": "Input array not provided!"}), 400
    
    # Get symptoms
    symptoms = request.args.get('symptoms')

    # Validate array
    if len(symptoms) == 0:
        return jsonify({"error": "Array is empty!"}), 400

    # Get the prediction
    prediction = get_prediction(symptoms)

    # Get the max value
    max_value = max(prediction)

    # Get the index
    max_index = prediction.index(max_value)

    if max_index == 0:
        final = "Putting them in an isolated tank. It doesn't need to be well kitted out, with the only essential needs being the primary filters and aerators."
    elif prediction == 1:
        final = "Remove dirt or debris from eye or antibiotic treatment."
    else:
        final = "The most effective way to remove the deep-lying tumor from your fish is by surgical removing it under anesthesia."

    return jsonify({"result": final}), 200

# -----Execute the app-----
if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5003)