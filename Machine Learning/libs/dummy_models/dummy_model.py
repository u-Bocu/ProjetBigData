import tensorflow as tf
from keras import layers
from keras import Model
from keras.models import Sequential

class DummyModel(Sequential):
    def __init__(self, target_vocab_size):
        super(DummyModel, self).__init__()

        # Hyperparameter
        self.target_vocab_size = target_vocab_size

        self.conv1 = layers.Conv2D(filters=32, kernel_size=(3, 3), activation='relu', input_shape=(128, 128, 1))
        self.pooling1 = layers.MaxPooling2D((2, 2))

        self.conv2 = layers.Conv2D(filters=64, kernel_size=(3, 3), activation='relu')
        self.pooling2 = layers.MaxPooling2D((2, 2))

        self.conv3 = layers.Conv2D(filters=64, kernel_size=(3, 3), activation='relu')        
        self.flatten = layers.Flatten()
        self.dense1 = layers.Dense(64, activation='relu')
        self.dropout = layers.Dropout(0.5)

        self.dense2 = layers.Dense(self.target_vocab_size, activation='softmax')



    def call(self, x):
        x = self.conv1(x)
        x = self.pooling1(x)

        x = self.conv2(x)
        x = self.pooling2(x)

        x = self.conv3(x)
        x = self.flatten(x)
        x = self.dense1(x)
        x = self.dropout(x)

        self.dense2(x)

        return x
