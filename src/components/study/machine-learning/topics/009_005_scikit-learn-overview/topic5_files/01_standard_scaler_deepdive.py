"""
Topic 5: StandardScaler and MinMaxScaler
Script 1: Deep Dive into StandardScaler (Z-score Normalization)
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

# Data representing student study hours and scores
X_train = np.array([
    [10.0, 45.0],
    [25.0, 75.0],
    [15.0, 55.0],
    [30.0, 85.0],
    [20.0, 65.0]
])

feature_names = ['study_hours', 'score']
print("--- Training Data (Raw) ---")
print(pd.DataFrame(X_train, columns=feature_names))

# Initialize StandardScaler
scaler = StandardScaler()

# Fit and transform training set
X_train_scaled = scaler.fit_transform(X_train)

print("\n--- Learned Parameters of StandardScaler ---")
print("Mean (mean_):", scaler.mean_)
print("Variance (var_):", scaler.var_)
print("Standard Deviation (scale_):", scaler.scale_)
print("Number of samples seen (n_samples_seen_):", scaler.n_samples_seen_)

print("\n--- Transformed Training Data (Z-Scores) ---")
print(pd.DataFrame(X_train_scaled, columns=feature_names).round(4))
print("Transformed Mean (should be ~0):", np.round(X_train_scaled.mean(axis=0), 6))
print("Transformed Std Dev (should be ~1):", np.round(X_train_scaled.std(axis=0), 6))

# Transform unseen test samples using ALREADY LEARNED parameters
X_test = np.array([[12.0, 50.0]])
X_test_scaled = scaler.transform(X_test)
print("\n--- Unseen Test Data Scaling ---")
print("Raw test point:", X_test)
print("Scaled test point:", np.round(X_test_scaled, 4))
