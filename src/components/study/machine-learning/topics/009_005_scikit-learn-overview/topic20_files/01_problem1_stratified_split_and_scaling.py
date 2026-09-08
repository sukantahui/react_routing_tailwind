"""
Topic 20: Practice Problems
Problem 1: Implement Leak-Free Preprocessing with StandardScaler & Stratified Split
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Simulated student dataset: [Age, Marks] -> Result (0/1)
X = np.array([
    [20, 45], [22, 50], [25, 80], [28, 85], [21, 40],
    [30, 90], [23, 55], [29, 88], [24, 60], [27, 82]
])
y = np.array([0, 0, 1, 1, 0, 1, 0, 1, 0, 1])

# Task:
# 1. Split into 70% train and 30% test with stratification and random_state=42
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.3, stratify=y, random_state=42
)

# 2. Correctly fit StandardScaler on training set ONLY, then transform both train and test
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test) # Do not call fit on test!

print("--- Problem 1 Solution ---")
print("Learned Scaler Mean:", scaler.mean_)
print("Learned Scaler Scale (Std Dev):", scaler.scale_)
print("X_train_scaled shape:", X_train_scaled.shape)
print("X_test_scaled shape:", X_test_scaled.shape)
print("Mean of X_train_scaled (should be ~0):", np.round(X_train_scaled.mean(axis=0), 4))
