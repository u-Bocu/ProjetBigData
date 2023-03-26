import pandas as pd
import tensorflow as tf
import librosa


FOLDER_PATH = './dataset/fr/clips/'

def load_audio(path):
    y, sr = librosa.load(FOLDER_PATH + path)
    return y

def load_train_dataset():
    data = pd.read_csv('./dataset/fr/train.tsv', delimiter='\t')
    data = data[['path', 'sentence']]

    audio_data = data['path'].apply(load_audio)

    return audio_data, data['sentence']

def load_test_dataset():
    data = pd.read_csv('./dataset/fr/test.tsv', delimiter='\t')
    data = data[['path', 'sentence']]

    audio_data = data['path'].apply(load_audio)

    return audio_data, data['sentence']