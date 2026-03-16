import os
import cv2
import numpy as np
from sklearn.model_selection import train_test_split

# Define the path where you extracted the Kaggle dataset
DATASET_PATH = r'C:\Users\LENOVO\Downloads\archive\leapGestRecog' 
IMG_SIZE = 64  # Small size for faster browser performance

data = []
labels = []

# Mapping folder names to numbers
lookup = {
    '01_palm': 0, '02_l': 1, '03_fist': 2, '04_fist_moved': 3,
    '05_thumb': 4, '06_index': 5, '07_ok': 6, '08_palm_moved': 7,
    '09_c': 8, '10_down': 9
}

print("Starting preprocessing...")

# The dataset is structured as: Subject ID -> Gesture Name -> Image
for subject in os.listdir(DATASET_PATH):
    subject_path = os.path.join(DATASET_PATH, subject)
    if not os.path.isdir(subject_path): continue
    
    for gesture in os.listdir(subject_path):
        gesture_path = os.path.join(subject_path, gesture)
        if gesture not in lookup: continue
        
        for img_name in os.listdir(gesture_path):
            img_path = os.path.join(gesture_path, img_name)
            
            # Read in Grayscale
            img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
            if img is not None:
                # Resize and Normalize (0 to 1)
                img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))
                data.append(img)
                labels.append(lookup[gesture])

# Convert to Numpy arrays
X = np.array(data, dtype='float32').reshape(-1, IMG_SIZE, IMG_SIZE, 1) / 255.0
y = np.array(labels)

# Split into Training (80%) and Testing (20%)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Save processed data so we don't have to do this again
np.save('X_train.npy', X_train)
np.save('y_train.npy', y_train)
np.save('X_test.npy', X_test)
np.save('y_test.npy', y_test)

print(f"Done! Preprocessed {len(data)} images.")
print(f"Shape: {X_train.shape}")