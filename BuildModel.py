# import Required Libraries

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras.layers import Input, Lambda, Dense, Flatten
from tensorflow.keras.models import Model
from tensorflow.keras.applications.inception_v3 import InceptionV3,preprocess_input
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import load_img,ImageDataGenerator
from tensorflow.keras.models import Sequential
from glob import glob
#from google.colab import drive

# Load Dataset
train_set = "E:\\SLIIT\\4th yr 2nd semester\\RP\\fish_id_web_service\\data\\training"
test_set = "E:\\SLIIT\\4th yr 2nd semester\\RP\\fish_id_web_service\\data\\validation"

#Create a base model
IMAGE_SIZE = [224,224]
inception = InceptionV3(input_shape=IMAGE_SIZE + [3], weights='imagenet', include_top=False)

# Freeze layers of the base model
for layer in inception.layers:
    layer.trainable = False

folders = glob("E:\\SLIIT\\4th yr 2nd semester\\RP\\fish_id_web_service\\data\\training\\*")

# our layers - you can add more if you want
x = Flatten()(inception.output)

prediction = Dense(len(folders),activation='softmax')(x)

# Final model
model = Model(inputs=inception.input, outputs=prediction)

# Compile the model
model.compile(
  loss='categorical_crossentropy',
  optimizer='adam',
  metrics=['accuracy']
)

# Setup batches of tensor image data with real-time data augmentation
train_datagen = ImageDataGenerator(rescale = 1./255,
                                  shear_range = 0.2,
                                  zoom_range = 0.2,
                                  horizontal_flip = True)

test_datagen = ImageDataGenerator(rescale = 1./255)

# Create training dataset
training_set = train_datagen.flow_from_directory('E:\\SLIIT\\4th yr 2nd semester\\RP\\fish_id_web_service\\data\\training',
                                                 target_size = (224, 224),
                                                 batch_size = 32,
                                                 class_mode = 'categorical')

# Create testing dataset
test_set = test_datagen.flow_from_directory('E:\\SLIIT\\4th yr 2nd semester\\RP\\fish_id_web_service\\data\\validation',
                                            target_size = (224, 224),
                                            batch_size = 32,
                                            class_mode = 'categorical')

# Fit the model
incep = model.fit_generator(training_set,
                            validation_data = test_set,
                            epochs = 20,
                            steps_per_epoch = len(training_set),
                            validation_steps=len(test_set))






