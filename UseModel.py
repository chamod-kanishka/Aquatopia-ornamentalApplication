# -----Imports-----
import os
import numpy as np

from keras.models import load_model
from tensorflow.keras.utils import load_img, img_to_array

# -----Load model-----
model = load_model("./model/final_model.h5")

# -----Generate prediction function-----
def get_prediction(img_path):
    """Generate the prediction based on image provided
    """    
    # Load image
    img = load_img(img_path, target_size=(500,500))

    # Create an input using the image
    i = img_to_array(img)/500
    input_arr = np.array([i])
    input_arr.shape

    # Get the prediction
    prediction = np.argmax(model.predict(input_arr))

    # Remove image file
    os.remove(img_path)

    return prediction