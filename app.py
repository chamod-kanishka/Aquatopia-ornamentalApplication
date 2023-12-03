import os
import numpy as np
import tensorflow as tf
import cv2
# Keras
from tensorflow.keras.applications.inception_v3 import preprocess_input,InceptionV3
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

from flask import Flask, redirect, url_for, request, render_template
from werkzeug.utils import secure_filename

# Define a flask app
app = Flask(__name__)

# Model saved with Keras model.save()
MODEL_PATH ='E:\\SLIIT\\4th yr 2nd semester\\RP\\fish_id_web_service\\model\\final_model.h5'

class_dict = {0:'Angelfish',
              1:'Clownfish',
              2:'Gurami',
              3:'Cannot Identify'}

# Load your trained model
model = load_model(MODEL_PATH)

def model_predict(model, img_path, confidence_threshold=0.9):
    img = image.load_img(img_path, target_size=(224, 224))

    # Preprocessing the image
    x = image.img_to_array(img)
    x = x / 255
    x = np.expand_dims(x, axis=0)

    preds = model.predict(x)
    max_pred = np.max(preds)
    if max_pred < confidence_threshold:
        return class_dict[3], "Cannot Identify"
    else:
        pred_class_idx = np.argmax(preds)
        pred_class = class_dict[pred_class_idx]
        pred_description = get_fish_description(pred_class_idx)  # Modify this to get the description
        return pred_class, pred_description

def get_fish_description(class_idx):
    # Modify this function to provide descriptions for each class index
    descriptions = {
        0: "Angelfish are divided into two main categories: marine and freshwater.There are around 85 species of marine angelfish in the Pomacanthidae family, and three species of freshwater angelfish in the Cichlidae family. Freshwater angelfish are typically found in South American river basins, while marine angelfish inhabit coral reefs in the Indian, Atlantic, and western Pacific oceans. These omnivores primarily feed on invertebrates, small insects, larvae, crustaceans, and worms, and are commonly kept as pets in aquariums.",
        1: "Clownfish, found in warm waters like the Red Sea and Pacific Oceans, come in various species with colorful appearances. They form a symbiotic relationship with anemones, where the anemones protect them and provide food. Clownfish have a diet of small invertebrates, algae, and anemone leftovers. In return, they attract prey to the anemone, which captures and consumes them. The clownfish also fertilizes the anemone with its waste.",
        2: "Gourami, a diverse group of over 90 tropical labyrinth fishes native to Asia, includes the giant gourami used as food. Other species found in home aquariums have unique characteristics, like elongated pelvic fin rays and distinctive colors. The kissing gourami, known for its kissing behavior, is popular in both cuisine and aquariums.",
        3: "Cannot Identify",
    }
    return descriptions.get(class_idx, "Unknown")

@app.route('/',methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def upload():
    if request.method == 'POST':
        # Get the file from the post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        # Make prediction
        pred_class, pred_description = model_predict(model, file_path)

        # Check if the prediction is "Cannot Identify" and return an appropriate response
        if pred_class == class_dict[3]:
            return "Cannot identify, please try again", 200  # Return a 400 Bad Request status
        else:
            result = f"{pred_class}. \n \n {pred_description}"
            return result, 200

    return None

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5001,debug=True)