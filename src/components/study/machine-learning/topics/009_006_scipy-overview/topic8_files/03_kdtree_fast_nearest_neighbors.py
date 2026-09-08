"""
Topic 8: Fast O(log N) Nearest Neighbor Lookups using scipy.spatial.KDTree
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy.spatial import KDTree

# Simulate 1,000 spatial points in 2D coordinate space (e.g. store locations)
np.random.seed(42)
locations = np.random.uniform(0, 100, size=(1000, 2))

# Build KDTree index structure
tree = KDTree(locations)

# Query point: User's live GPS coordinates in Barrackpore
query_pt = np.array([45.2, 67.8])

# Query nearest 3 neighbors (k=3)
distances, indices = tree.query(query_pt, k=3)

print("--- KDTree O(log N) KNN Spatial Search ---")
print(f"User Location: {query_pt}\n")
for i, (dist, idx) in enumerate(zip(distances, indices), 1):
    nearest_coords = locations[idx]
    print(f"Neighbor #{i}: Index {idx} at coordinates {nearest_coords.round(2)}, Distance: {dist:.3f}")
