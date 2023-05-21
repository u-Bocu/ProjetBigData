# %%
import pandas as pd
import os
import torch
import librosa
import librosa.display
import pywt
import csv
import pickle
import keras

import matplotlib.pyplot as plt
import tensorflow as tf
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import normalize
from keras.optimizers import Adam
from keras.utils import to_categorical
from keras.layers import *

# %%
FOLDER_PATH = './dataset/fr/clips/'
FEATURES_FILE = 'matthieu_features.pkl'

# %%
def padding(data, axis, length):
    pad_width = [(0, 0)] * len(data.shape)
    pad_width[axis] = (0, max(0, length - data.shape[axis]))
    padded_data = np.pad(data, pad_width, mode='constant', constant_values=0)
    return padded_data


def get_features(df_in, max_len):
    features = []
    labels = []

    for index in range(0, len(df_in)):
        filename = FOLDER_PATH + df_in.path[index]
        label = df_in.sentence[index]

        # load the file
        y, sr = librosa.load(filename)
        
        # Trim the audio file to remove leading/trailing silence
        y, _ = librosa.effects.trim(y)

        # Compute MFCC
        mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)  # n_mfcc: nombre de coefficients MFCC à conserver
        
        # Pad/truncate MFCCs
        if (mfccs.shape[1] < max_len):
            pad_width = max_len - mfccs.shape[1]
            mfccs = np.pad(mfccs, pad_width=((0, 0), (0, pad_width)), mode='constant')
        else:
            mfccs = mfccs[:, :max_len]
        
        features.append(mfccs.T)
        labels.append(label)

    return (features, labels)

def preprocess_data(X, y):
    X = np.array((X - np.mean(X)) / np.std(X))
    y = np.array(y)
    return X, y


def split_data(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=123, stratify=y)
    X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.25, random_state=123)
    return X_train, X_test, X_val, y_train, y_test, y_val

# %%
data = pd.read_csv('./dataset/fr/test.tsv', delimiter='\t')
data = data[['path', 'sentence']]

# %%
max_len = 100000

if os.path.exists(FEATURES_FILE):
    with open(FEATURES_FILE, 'rb') as f:
        X, y = pickle.load(f)
else:
    X, y = get_features(data, max_len)
    with open(FEATURES_FILE, 'wb') as f:
        pickle.dump((X, y), f)

# %%
X, y = preprocess_data(X, y)

# %%
def create_model(input_shape):
    model = keras.Sequential()

    # Couche LSTM pour traiter chaque trame
    model.add(LSTM(32, input_shape=input_shape))

    # Couche Dense
    model.add(Dense(128, activation='relu'))

    # Dropout pour la régularisation
    model.add(Dropout(0.5))

    # Couche de sortie
    model.add(Dense(14, activation='softmax'))

    return model

# %%
# Divisez les données
X_train, X_test, X_val, y_train, y_test, y_val = split_data(X, y)

# Maintenant, supposons que X a la forme (nombre_d'échantillons, nombre_de_trames, n_mfcc)
num_samples, num_frames, n_mfcc = X_train.shape
input_shape = (num_frames, n_mfcc)

# Pas besoin de remodeler X_train, X_val ici

# Convertir les étiquettes en format catégorique
num_classes = 14  # Remplacez par le nombre de classes réel
y_train = to_categorical(y_train, num_classes)
y_val = to_categorical(y_val, num_classes)
y_test = to_categorical(y_test, num_classes)

print(X_train.shape)
print(y_train.shape)

# Créez le modèle
model = create_model(input_shape)
model.summary()

# Compilez et entraînez le modèle
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
history = model.fit(X_train, y_train, epochs=20, batch_size=254, validation_data=(X_val, y_val))

# %%
# Évaluez le modèle
TrainLoss, Trainacc = model.evaluate(X_train, y_train)
TestLoss, Testacc = model.evaluate(X_test, y_test)
y_pred = model.predict(X_test)

# %%
print('Confusion_matrix: ', tf.math.confusion_matrix(np.argmax(y_test, axis=1), np.argmax(y_pred, axis=1)))

# Sauvegardez le modèle
model.save("model.h5")


