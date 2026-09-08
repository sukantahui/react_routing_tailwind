"""
Topic 12: Worked Example 2 - KNN Classification with scipy.spatial Distance
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy.spatial.distance import euclidean

# Training Dataset: Student profiles with [Study Hours/week, Practice Problems Solved]
# Labels: 0 = Needs Support, 1 = High Distinction
train_features = np.array([
    [5.0, 20.0],
    [6.5, 30.0],
    [8.0, 45.0],
    [15.0, 90.0],
    [18.0, 110.0],
    [20.0, 120.0]
])
train_labels = np.array([0, 0, 0, 1, 1, 1])

# New test student in Ichapur: [16.5 hours/week, 95 problems]
test_student = np.array([16.5, 95.0])

# Compute Euclidean distance to all training samples
distances = [euclidean(test_student, x) for x in train_features]

# Find 3 nearest neighbors (k=3)
k = 3
nearest_indices = np.argsort(distances)[:k]
predicted_label = int(np.round(np.mean(train_labels[nearest_indices])))

print("--- Worked Example: KNN Classification via scipy.spatial ---")
print(f"Test Student Vector: {test_student}\n")
for i, idx in enumerate(nearest_indices, 1):
    print(f"Neighbor #{i}: Train Index {idx} | Dist: {distances[idx]:.3f} | Label: {train_labels[idx]}")

verdict = "High Distinction (1)" if predicted_label == 1 else "Needs Support (0)"
print(f"\nFinal K=3 Majority Vote Prediction: {verdict}")
