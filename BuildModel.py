# -----Imports----- 
import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Dense, LSTM
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping
from sklearn.model_selection import train_test_split

# -----Read the data-----
data = pd.read_csv('./data/treatments.csv')

# -----Convert diseases and treatments to numeric values-----
data['disease'] = pd.factorize(data['disease'])[0]
data['treatments'] = pd.factorize(data['treatments'])[0]

# -----Extract the input features (X) and the target variable (y)-----
X = data.iloc[:, :-1].values
y = data.iloc[:, -1].values

# -----Create training and testing datasets-----
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# -----Reshape the input data to a 3D format-----
X_train = np.reshape(np.array(X_train), (160, 1, 6))
X_test = np.reshape(np.array(X_test), (40, 1, 6))

# -----Create sequential model-----
model = Sequential()

# -----Add LSTM input layer-----
model.add(LSTM(6, activation='sigmoid', input_shape=(1, 6)))

# -----Add hidden layers-----
model.add(Dense(20, activation='relu'))
model.add(Dense(16, activation='relu'))

# -----Add an output layer-----
model.add(Dense(3, activation='softmax'))

# -----Compile the model-----
model.compile(optimizer='adam', loss='mean_squared_error', metrics=["accuracy"])

# -----Model checkpoint-----
checkpoint = ModelCheckpoint(
    filepath="./model/final_model.h5", 
    monitor="accuracy", 
    save_best_only=True,
    verbose=1
)

# -----Model early stopping-----
stopping = EarlyStopping(
    monitor="accuracy",
    min_delta=0.01,
    patience=30,
    verbose=1
)

# -----Fit the model-----
model.fit(X_train, y_train, epochs=600, batch_size=16, validation_data=(X_test, y_test), callbacks=[checkpoint, stopping])

# -----Make predictions using testing dataset-----
y_pred = model.predict(X_test)
print(y_pred)