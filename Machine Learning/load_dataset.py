import pandas as pd
import tensorflow as tf
import librosa
import pywt

FOLDER_PATH = './dataset/fr/clips/'

def load_audio(path):
    y, _ = librosa.load(FOLDER_PATH + path)
    cd, ca = pywt.dwt(y, 'haar')
    return cd

def load_train_dataset():
    data = pd.read_csv('./dataset/fr/train.tsv', delimiter='\t')
    data = data[['path', 'sentence']]

    audio_data = data['path'].apply(load_audio)

    return audio_data, data['sentence'].array

def load_test_dataset():
    data = pd.read_csv('./dataset/fr/test.tsv', delimiter='\t')
    data = data[['path', 'sentence']]

    audio_data = data['path'].apply(load_audio)

    return audio_data, data['sentence']