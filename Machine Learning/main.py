import pandas as pd
import os
import torch
import librosa
import librosa.display
import matplotlib.pyplot as plt

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import normalize 
import warnings
warnings.filterwarnings('ignore')

import tensorflow as tf
from keras.layers import LSTM, Dense, Dropout, Conv2D, Flatten, Reshape, MaxPooling2D
import numpy as np
import keras
from keras.utils import to_categorical

FOLDER_PATH = './dataset/fr/clips/'

def padding(data, axis, length):
    pad_width = [(0, 0)] * len(data.shape)
    pad_width[axis] = (0, max(0, length - data.shape[axis]))
    padded_data = np.pad(data, pad_width, mode='constant', constant_values=0)
    return padded_data

def get_features(df_in):
    features=[]
    labels=[]
    
    for index in range(0, len(df_in)):
        filename = FOLDER_PATH + df_in.path[index]
        label = df_in.sentence[index]
        
        #load the file
        y, sr = librosa.load(filename)
        
        data = np.array([padding(librosa.feature.mfcc(y=y, sr=sr, n_fft=255, hop_length=512, n_mfcc=128), 1, 550)])
        features.append(data)
        labels.append(label)
        
    output = np.concatenate(features, axis=0)
    return (np.array(output), labels)

data = pd.read_csv('./dataset/fr/test.tsv', delimiter='\t')
data = data[['path', 'sentence']]

X, y = get_features(data)

X = np.array((X-np.min(X))/(np.max(X)-np.min(X)))
X = X/np.std(X)
y = np.array(y)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=123, stratify=y)
X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.25, random_state=123)

print(X_train.shape)
print(X_test.shape)
print(X_val.shape)
print(len(y_train))
print(len(y_test))
print(len(y_val))

input_shape = (128, 550, 1)

model = keras.Sequential()
model.add(Dense(512, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(256, activation='relu'))
model.add(Dropout(0.5))
# Couche de sortie
model.add(Dense(14, activation='softmax'))

#model.add(Reshape((64, -1)))
#model.add(LSTM(64, input_shape(64, None)))
#model.add(Dropout(0.2))
#model.add(Dense(128, activation='relu'))
#model.add(Dense(64, activation='relu'))
#model.add(Dropout(0.4))
#model.add(Dense(48, activation='relu'))
#model.add(Dropout(0.4))
#model.add(Dense(24, activation='relu'))
#model.add(Dropout(0.2))
#model.add(Dense(14, activation='softmax'))
#model.build(input_shape)
#model.summary()

#optimizer = keras.optimizers.Adam(learning_rate=1)
model.compile(optimizer='adam', loss='SparseCategoricalCrossentropy', metrics=['accuracy'])
history = model.fit(X_train, y_train, epochs=20, batch_size=254, validation_data=(X_val, y_val))

TrainLoss, Trainacc = model.evaluate(X_train,y_train)
TestLoss, Testacc = model.evaluate(X_test, y_test)
y_pred=model.predict(X_test)
print('Confusion_matrix: ',tf.math.confusion_matrix(y_test, np.argmax(y_pred,axis=1)))

model.save("model.h5")