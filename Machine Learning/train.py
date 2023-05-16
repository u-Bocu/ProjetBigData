import tensorflow as tf

import load_dataset
from libs.dummy_models.dummy_model import DummyModel
from libs.waveletTransformer.waveletTransformer import WaveletTransformer

train_input, train_output = load_dataset.load_train_dataset()
test_input, test_output = load_dataset.load_test_dataset()

vocab_size = len(train_output.unique()) # 14

train_input = [tf.convert_to_tensor(x, dtype=tf.float32) for x in train_input]

model = WaveletTransformer(3, 128, 4*128, 8, vocab_size, vocab_size, 200)

model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

history = model.fit(train_input, validation_data=train_output, epochs=10)
test_loss, test_acc = model.evaluate(test_input, test_output)