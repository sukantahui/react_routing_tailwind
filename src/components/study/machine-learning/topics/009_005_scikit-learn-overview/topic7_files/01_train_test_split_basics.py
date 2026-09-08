"""
Topic 7: train_test_split()
Script 1: Basic Dataset Splitting and Reproducibility
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.model_selection import train_test_split

# Synthetic dataset: 10 student samples (X = study hours, y = exam score)
X = np.array([[2], [4], [6], [8], [10], [12], [14], [16], [18], [20]])
y = np.array([25, 38, 48, 62, 70, 78, 85, 90, 94, 98])

# 80/20 train/test split with deterministic random_state
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,       # 20% testing (2 samples), 80% training (8 samples)
    random_state=42,     # Guarantees identical random shuffle across runs
    shuffle=True         # Default is True
)

print(f"Total Samples: {len(X)}")
print(f"Training Set ({len(X_train)} samples):")
print("X_train:\n", X_train.flatten())
print("y_train:\n", y_train)

print(f"\nTesting Set ({len(X_test)} samples):")
print("X_test:\n", X_test.flatten())
print("y_test:\n", y_test)
