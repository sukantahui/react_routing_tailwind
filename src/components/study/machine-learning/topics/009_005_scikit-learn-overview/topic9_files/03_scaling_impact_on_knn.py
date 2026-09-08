"""
Topic 9: KNeighborsClassifier
Script 3: Impact of Feature Scaling on KNN Distance
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

# Features: [Age (years 20-60), Annual Income (INR 25,000 - 150,000)]
X = np.array([
    [22, 28000],
    [25, 32000],
    [45, 110000],
    [50, 130000]
])
y = np.array([0, 0, 1, 1])

# Query point: Age 48, Income 30,000 (Low income senior)
query = np.array([[48, 30000]])

# 1. Unscaled KNN
knn_raw = KNeighborsClassifier(n_neighbors=1)
knn_raw.fit(X, y)
pred_raw = knn_raw.predict(query)[0]
_, idx_raw = knn_raw.kneighbors(query)

print("--- 1. KNN Without Scaling ---")
print(f"Nearest neighbor chosen: Sample #{idx_raw[0][0]} ({X[idx_raw[0][0]]})")
print(f"Predicted Class: {pred_raw}")
print("Problem: Income dominates the Euclidean distance entirely (differences of ₹10,000s dwarfs age difference of 25 years)!")

# 2. Scaled KNN Pipeline
knn_scaled_pipe = make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=1))
knn_scaled_pipe.fit(X, y)
pred_scaled = knn_scaled_pipe.predict(query)[0]

print("\n--- 2. KNN With StandardScaler Pipeline ---")
print(f"Predicted Class with Scaling: {pred_scaled}")
print("Result: Both Age and Income contribute equally to distance!")
