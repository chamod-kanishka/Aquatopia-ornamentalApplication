# -----Imports-----
from tensorflow.keras.layers import Conv2D, Flatten, Dense, MaxPool2D, BatchNormalization
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
from tensorflow.keras.preprocessing.image import ImageDataGenerator, load_img
from tensorflow.keras.applications.resnet50 import ResNet50
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Sequential
from tensorflow.keras.models import Model, load_model
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping
from tensorflow.keras.utils import load_img, img_to_array

import numpy as np

# -----Data directories-----
training = "./data/training"
validation = "./data/validation"

# -----Set image dimensions-----
img_height, img_width = 500, 500

# -----Data augmentation-----
data_gen = ImageDataGenerator(
    rescale=1./500.,
    horizontal_flip=True,
    preprocessing_function=preprocess_input,
    zoom_range=0.2,
    shear_range=0.2,
)

# -----Create training dataset-----
training_dataset = data_gen.flow_from_directory(
  training,
  target_size=(img_height, img_width),
  batch_size=4,
  class_mode="categorical"
)

# -----Create validation dataset-----
validation_dataset = data_gen.flow_from_directory(
  validation,
  target_size=(img_height, img_width),
  batch_size=2,
  class_mode="categorical"
)

# -----Create resnet50 model-----
rn_model = ResNet50(
    include_top=False,
    input_shape=(img_height, img_width, 3),
    pooling='avg',
    classes=3,
    weights='imagenet'
)

# -----Freeze layers of resnet model----- 
for layer in rn_model.layers:
    layer.trainable=False


# -----Get output of the resnet model-----
model = rn_model.output

# -----Add hidden layers for new weights-----
model = Dense(512, activation="relu")(model)
model = Dense(256, activation="relu")(model)
model = Dense(128, activation="relu")(model)

# -----Add output layer-----
model = Dense(3, activation="sigmoid")(model)

# -----Final model-----
final_model = Model(rn_model.input, model)

# -----Compile the model-----
final_model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

# -----Setup a checkpoint-----
model_checkpoint = ModelCheckpoint(
    filepath="./model/final_model.h5", 
    monitor="accuracy", 
    save_best_only=True,
    verbose=1
)

# -----Setup early stopping-----
early_stopping = EarlyStopping(
    monitor="accuracy",
    min_delta=0.01,
    patience=5,
    verbose=1
)

# -----Fit the model-----
final_model.fit(
    training_dataset,
    steps_per_epoch=20,
    epochs=30,
    validation_data=validation_dataset,
    validation_steps=10,
    callbacks=[model_checkpoint, early_stopping]
)