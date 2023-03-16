import librosa
import pywt
import numpy as np

WAVELET_TYPE = 'morl'

def cwt(audio_filename):
    # Sampling rate stays default
    y, sampling_rate = librosa.load(audio_filename)
    widths = np.arange(1, 64)

    # Compute continuous wavelet transform
    return pywt.cwt(y, widths, wavelet=WAVELET_TYPE, sampling_period=1/sampling_rate)