import tensorflow as tf

import load_dataset
from libs.dummy_models.dummy_model import DummyModel
from libs.waveletTransformer.waveletTransformer import WaveletTransformer

train_input, train_output = load_dataset.load_train_dataset()
test_input, test_output = load_dataset.load_test_dataset()

vocab_size = train_output.nunique()
print("Vocab size: ", vocab_size)

model = DummyModel(vocab_size)

model.compile(loss='categorical_corssentropy', optimizer='adam', metrics=['accuracy'])

history = model.fit(train_input, train_output, epochs=10)
test_loss, test_acc = model.evaluate(test_input, test_output)
