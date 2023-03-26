import librosa
from libs.dummy_models import DummyModel

model = DummyModel(0)

model.compile(loss='categorical_corssentropy', optimizer='adam', metrics=['accuracy'])
model.summary()

history = model.fit(train_input, train_output, epochs=10, batch_size=32, validation_data=(test_input, test_output))
test_loss, test_acc = model.evaluate(test_input, test_output)

print('Accuracy: ', test_acc)