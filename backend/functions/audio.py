import base64
import librosa
import numpy as np
from keras.models import load_model
from keras.optimizers import Adam


# Preprocess function
def preprocess_audio():
    audio, sample_rate = librosa.load('input.wav', sr=None)  # Read the audio file

    # Resample the audio to the desired sample rate (if necessary)
    desired_sample_rate = 44100  # Example desired sample rate
    resampled_audio = librosa.resample(y=audio, orig_sr=sample_rate, target_sr=desired_sample_rate)

    # Normalize the audio to the range [-1, 1]
    normalized_audio = resampled_audio / np.max(np.abs(resampled_audio))

    # Adjust the desired length to match the available audio length
    desired_length = min(len(normalized_audio), 128 * 550)

    # Slice or pad the audio to match the desired length
    processed_audio = np.zeros((desired_length,))
    processed_audio[:len(normalized_audio)] = normalized_audio[:desired_length]

    # Reshape the audio to match the expected input shape
    return np.reshape(processed_audio, (1, 128, 550))


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

    # Step 4: Make predictions using the Keras model
    prediction = model.predict(input_data)[0]
    print(prediction)
    predicted_index = np.argmax(prediction)
    recognized_number = predicted_index + 1

    return recognized_number
