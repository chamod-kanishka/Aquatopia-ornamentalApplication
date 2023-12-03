# -----Imports-----
import numpy as np
import ast

from keras.models import load_model

# -----Load model-----
model = load_model("./model/final_model.h5")

# -----Generate prediction function-----
def get_prediction(data):
    """Generate the prediction based on array provided
    """    
    # Convert string to python list
    normal_array = ast.literal_eval(data)

    # Convert normal array to 1D array
    one_d_input = np.array(normal_array)

    # Convert 1D array to 3D array
    three_d_input = one_d_input.reshape((1, 1, 6))

    # Get prediction
    prediction = model.predict(three_d_input)

    return prediction.tolist()[0]