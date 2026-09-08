"""
Topic 12: Clustering
Script 3: Feature Scaling & k-means++ vs Random Centroid Initialization
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

# Features with vast scale mismatch: [Age in years (20-60), Annual Income in INR (20,000-200,000)]
np.random.seed(42)
ages = np.random.randint(20, 60, size=(100, 1))
income = np.random.randint(20000, 200000, size=(100, 1))
X_unscaled = np.hstack([ages, income])

# 1. Unscaled KMeans (Income will completely dominate centroid locations)
km_unscaled = KMeans(n_clusters=3, random_state=42, n_init=10).fit(X_unscaled)
print("--- 1. Unscaled Centroids (Income completely dominates) ---")
print(np.round(km_unscaled.cluster_centers_, 1))

# 2. Scaled KMeans with StandardScaler Pipeline
pipe = make_pipeline(StandardScaler(), KMeans(n_clusters=3, random_state=42, n_init=10))
pipe.fit(X_unscaled)

scaler_step = pipe.named_steps['standardscaler']
km_step = pipe.named_steps['kmeans']

print("\n--- 2. Scaled Centroids (Transformed back to real units) ---")
real_centers = scaler_step.inverse_transform(km_step.cluster_centers_)
print("Ages & Incomes properly balanced:\n", np.round(real_centers, 1))
