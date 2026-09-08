# 05_ml_image_norm_and_pairwise_distance.py
# NumPy Essentials — Topic 11: Broadcasting Concept (Part 5)
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
DESCRIPTION:
Demonstrates advanced multidimensional tensor broadcasting in Machine Learning:
  1. Image Batch RGB Channel Normalization:
     - Shape (Batch_Size, Height, Width, Channels) - (Channels,)
     - e.g. (10, 32, 32, 3) - (3,)
  2. Pairwise Euclidean Distance Matrix for K-Means / KNN:
     - Computing distances between N samples and M centroids in 1 vectorized line
     - Shape (N, 1, D) - (1, M, D) -> (N, M, D)
"""

import numpy as np

print("=" * 68)
print("  PART 5: Image Channel Normalization & Pairwise Distances")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 68)

# ── 1. Image Batch RGB Channel Normalization ─────────────────────────────────
# Batch of 4 images, 32x32 pixels, 3 color channels
image_batch = np.ones((4, 32, 32, 3), dtype=np.float32) * 128.0

# Standard ImageNet RGB channel means and standard deviations
rgb_means = np.array([123.68, 116.78, 103.94])  # shape (3,)
rgb_stds  = np.array([58.395, 57.120, 57.375])   # shape (3,)

print(f"\n[1] Image Batch shape : {image_batch.shape}")
print(f"    RGB Means shape   : {rgb_means.shape}")

# Broadcasting: (4, 32, 32, 3) - (3,) -> pads to (1, 1, 1, 3)
normalized_batch = (image_batch - rgb_means) / rgb_stds
print(f"    Normalized Batch shape : {normalized_batch.shape}")
print(f"    Sample pixel values at (0, 0, 0, :) : {np.round(normalized_batch[0, 0, 0, :], 4)}")

# ── 2. Pairwise Euclidean Distances (K-Means / KNN) ──────────────────────────
# 3 Data points in 2D space
X_points = np.array([
    [1.0, 2.0],
    [3.0, 4.0],
    [5.0, 6.0]
]) # shape (3, 2)

# 2 Cluster Centroids
C_centroids = np.array([
    [0.0, 0.0],
    [4.0, 4.0]
]) # shape (2, 2)

print(f"\n[2] Data Points X shape  : {X_points.shape}")
print(f"    Centroids C shape    : {C_centroids.shape}")

# Expand dimensions: X ➔ (3, 1, 2) and C ➔ (1, 2, 2)
# Broadcasting computes difference for every (point, centroid) pair!
diffs = X_points[:, np.newaxis, :] - C_centroids[np.newaxis, :, :] # shape (3, 2, 2)
distances = np.sqrt(np.sum(diffs ** 2, axis=-1))                   # shape (3, 2)

print(f"    Pairwise Distances Matrix (shape {distances.shape}):\n{np.round(distances, 3)}")
print("    -> Row i contains distances from Point i to Centroid 0 and Centroid 1!")
