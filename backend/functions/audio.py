import base64
import librosa
import numpy as np
from keras.models import load_model
from keras.optimizers import Adam


# Preprocess function
def preprocess_audio():
    max_len = 200
    y, sr = librosa.load('input.wav', sr=None)  # Read the audio file

    # Trim the audio file to remove leading/trailing silence
    y, _ = librosa.effects.trim(y)

    # Compute MFCC
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)  # n_mfcc: nombre de coefficients MFCC à conserver

    # Pad/truncate MFCCs
    if mfccs.shape[1] < max_len:
        pad_width = max_len - mfccs.shape[1]
        mfccs = np.pad(mfccs, pad_width=((0, 0), (0, pad_width)), mode='constant')
    else:
        mfccs = mfccs[:, :max_len]

    # Reshape the audio to match the expected input shape
    return np.reshape(mfccs.T, (1, 200, 13))


def preprocess_data(X):
    mean = -17.918066
    std = 106.18942
    X = np.array((X - mean) / std)
    return X


# Predict function
def predict_audio(base64_file):
    # Step 1: Convert the base64 file to a binary audio file
    audio_data = base64.b64decode(base64_file)
    with open('input.wav', 'wb') as file:
        file.write(audio_data)

    # Step 2: Load the Keras model
    model_path = r'assets\model.h5'
    model = load_model(model_path, custom_objects={'CustomAdam': Adam})

    # Step 3: Preprocess the audio
    input_data = preprocess_audio()
    input_data = preprocess_data(input_data)

    # Step 4: Make predictions using the Keras model
    word_list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'firefox', 'oui', 'non']
    prediction = model.predict(input_data)[0]
    print(prediction)
    predicted_index = np.argmax(prediction)
    recognized_word = word_list[predicted_index]

    return recognized_word
