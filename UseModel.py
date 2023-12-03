import os
import numpy as np
import tensorflow as tf
import cv2
# Keras
from tensorflow.keras.applications.inception_v3 import preprocess_input,InceptionV3
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Model saved with Keras model.save()
MODEL_PATH ='./model/final_model.h5'

class_dict = {0:'Angelfish',
              1:'Clownfish',
              2:'Gurami',
              3:'Cannot Identify'
              }

# Load your trained model
model = load_model(MODEL_PATH)

def model_predict(model,img_path):
    # Load image
    img = image.load_img(img_path, target_size=(224, 224))

    # Preprocessing the image
    x = image.img_to_array(img)
    x=x/255
    x = np.expand_dims(x, axis=0)

    preds = model.predict(x)
    max_pred = np.max(preds)
    if max_pred < confidence_threshold:
        return class_dict[3]  # Cannot Identify
    else:
        pred_class = class_dict[np.argmax(preds)]
        return pred_class