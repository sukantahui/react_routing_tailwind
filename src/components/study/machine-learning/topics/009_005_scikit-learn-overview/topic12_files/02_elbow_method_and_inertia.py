"""
Topic 12: Clustering
Script 2: Finding Optimal K via the Elbow Method (Inertia Analysis)
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
"""

import numpy as np
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans

# Generate synthetic dataset with 4 natural clusters
X, _ = make_blobs(n_samples=300, centers=4, cluster_std=0.60, random_state=42)

inertias = []
k_range = range(1, 9)

print("--- Calculating Inertia across K = 1 to 8 ---")
for k in k_range:
    km = KMeans(n_clusters=k, init='k-means++', n_init=10, random_state=42)
    km.fit(X)
    inertias.append(km.inertia_)
    print(f"K = {k} | Inertia (WCSS) = {km.inertia_:10.2f}")

# Calculate rate of inertia drop
print("\n--- Inertia Drops (Look for the Elbow bend) ---")
for i in range(1, len(inertias)):
    drop = inertias[i-1] - inertias[i]
    print(f"From K={i} to K={i+1}: Inertia Drop = {drop:10.2f}")
print("Notice how the steep drop slows dramatically after K=4 (the true cluster count)!")
