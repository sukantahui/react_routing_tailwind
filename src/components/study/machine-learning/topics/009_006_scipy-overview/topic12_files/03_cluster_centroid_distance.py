"""
Topic 12: Cluster Centroid Assignment Engine
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy.spatial.distance import cdist

# K-Means Cluster Centroids: 3 Customer Segments [Recency (days), Monetary (₹k)]
centroids = np.array([
    [10.0, 50.0], # Cluster 0: High-Value Frequent Buyers
    [45.0, 15.0], # Cluster 1: Regular Occasional Buyers
    [120.0, 3.0]  # Cluster 2: Dormant / At-Risk Users
])

# New customer transaction vector from Naihati: [15.0 days, 48.0 k]
new_customer = np.array([[15.0, 48.0]])

# Calculate distance to all 3 centroids
distances = cdist(new_customer, centroids, metric='euclidean')[0]
assigned_cluster = int(np.argmin(distances))

print("--- K-Means Inference via scipy.spatial.distance.cdist ---")
print(f"Customer Profile: {new_customer[0]}")
for c_idx, d in enumerate(distances):
    print(f"Centroid {c_idx} Distance: {d:.2f}")

print(f"\nAssigned Cluster: Cluster {assigned_cluster} (Shortest Distance: {distances[assigned_cluster]:.2f})")
