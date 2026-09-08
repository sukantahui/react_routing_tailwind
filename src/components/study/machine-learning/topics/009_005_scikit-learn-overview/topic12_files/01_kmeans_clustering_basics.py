"""
Topic 12: Clustering
Script 1: KMeans Clustering Basics & Centroid Inspection
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
import pandas as pd
from sklearn.cluster import KMeans

# 2D Customer / Student data: [Monthly Spend / Study Hours, Engagement Score]
X = np.array([
    [10.0, 20.0],
    [12.0, 24.0],
    [15.0, 18.0],
    [80.0, 85.0],
    [85.0, 90.0],
    [90.0, 78.0],
    [50.0, 50.0],
    [52.0, 48.0],
    [48.0, 54.0]
])

# Instantiate KMeans with K=3 clusters and k-means++ initialization
kmeans = KMeans(n_clusters=3, init='k-means++', n_init=10, random_state=42)
cluster_labels = kmeans.fit_predict(X)

print("--- KMeans Clustering Output ---")
print("Cluster Assignments (labels_):", kmeans.labels_)
print("Cluster Centroids (cluster_centers_):\n", np.round(kmeans.cluster_centers_, 2))
print(f"Inertia (Within-Cluster Sum of Squares): {kmeans.inertia_:.2f}")
print(f"Iterations to converge: {kmeans.n_iter_}")

# Assign new unseen test points to nearest centroid
X_new = np.array([[11.0, 22.0], [88.0, 82.0]])
new_preds = kmeans.predict(X_new)
print("\n--- Predictions for New Samples ---")
for pt, c in zip(X_new, new_preds):
    print(f"Sample {pt} -> Assigned to Cluster {c}")
