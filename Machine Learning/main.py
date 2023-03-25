from waveletTransformer import WaveletTransformer
import librosa
import numpy as np

# Input mp3 files
mp3_files = ['dataset/fr/clips/common_voice_fr_21894151.mp3']

# Process mp3 files and stack them into a batch
batch_size = len(mp3_files)
max_len = 500

input_tensor = np.zeros((batch_size, max_len, 40, 1))

for i, mp3_file in enumerate(mp3_files):

    # Load mp3 files and extract features
    y, sr = librosa.load(mp3_file)
    mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=40)
    mfccs = np.transpose(mfccs, (1, 0))[:, :, np.newaxis] # Transpose and add channel dimension

    # Pad or truncate the feature matrix to the maximum length
    if mfccs.shape[0] < max_len:
        mfccs = np.pad(mfccs, ((0, max_len - mfccs.shape[0]), (0, 0), (0, 0)), mode='constant')
    else:
        mfccs = mfccs[:max_len, :, :]

    # Add the feature matrix to the input tensor
    input_tensor[i, :, :, 0] = mfccs[:, :, 0]


# Feed input tensor to the model
model = WaveletTransformer(n_layers=4, d_model=128, dff=512, n_heads=8, input_vocab_size=1000, target_vocab_size=2, max_position_encoding=max_len)

output = model(input_tensor)