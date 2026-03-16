import numpy as np
import tensorflow as tf
from tensorflow.keras import layers, models, callbacks
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# 1. Load Data
X_train = np.load('X_train.npy')
y_train = np.load('y_train.npy')
X_test = np.load('X_test.npy')
y_test = np.load('y_test.npy')

# Ensure inputs are (N, 64, 64, 1)
# If your data is grayscale (64,64), add the channel dimension
if len(X_train.shape) == 3:
    X_train = np.expand_dims(X_train, -1)
    X_test = np.expand_dims(X_test, -1)

# 2. Data Augmentation (The secret to accuracy)
datagen = ImageDataGenerator(
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    zoom_range=0.2,
    horizontal_flip=False # Keep False for gestures like 'Left'/'Right'
)

# 3. Improved CNN Architecture
model = models.Sequential([
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(64, 64, 1)),
    layers.BatchNormalization(), # Stabilizes learning
    layers.MaxPooling2D((2, 2)),
    
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.BatchNormalization(),
    layers.MaxPooling2D((2, 2)),
    
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.BatchNormalization(),
    layers.MaxPooling2D((2, 2)),
    
    layers.Flatten(),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.5), # Stronger regularization
    layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# 4. Training with Early Stopping
# Stops training if validation accuracy stops improving
early_stop = callbacks.EarlyStopping(monitor='val_loss', patience=3, restore_best_weights=True)

print("Training with augmentation...")
history = model.fit(
    datagen.flow(X_train, y_train, batch_size=64),
    epochs=20, 
    validation_data=(X_test, y_test),
    callbacks=[early_stop]
)

model.save('hand_gesture_model.h5')