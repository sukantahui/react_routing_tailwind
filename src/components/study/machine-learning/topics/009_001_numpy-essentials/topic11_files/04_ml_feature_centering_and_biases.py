# 04_ml_feature_centering_and_biases.py
# NumPy Essentials — Topic 11: Broadcasting Concept (Part 4)
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
DESCRIPTION:
Demonstrates core Machine Learning workflows using broadcasting:
  1. Column-wise zero-mean feature centering: X - np.mean(X, axis=0)
     - Shape (N_samples, D_features) - (D_features,)
  2. Neural Network dense layer affine transformation: (X @ W) + b
     - Shape (Batch_Size, Out_Features) + (Out_Features,)
"""

import numpy as np

print("=" * 68)
print("  PART 4: ML Feature Centering & Neural Network Biases")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 68)

# ── 1. Column-wise Feature Mean Centering ────────────────────────────────────
# Tabular dataset of 4 students: [Height(cm), Weight(kg), Study_Hours]
X = np.array([
    [170.0, 65.0, 4.5],
    [180.0, 80.0, 6.0],
    [160.0, 55.0, 2.0],
    [175.0, 70.0, 5.5]
], dtype=np.float32)

print(f"\n[1] Feature Matrix X (shape {X.shape}):\n{X}")

# Compute mean across axis 0 (columns) -> shape (3,)
col_means = np.mean(X, axis=0)
print(f"\n    Column Means (shape {col_means.shape}): {col_means}")

# Broadcasting: (4, 3) - (3,) -> (4, 3) - (1, 3) -> (4, 3)
X_centered = X - col_means
print(f"\n    Zero-Centered Features (shape {X_centered.shape}):\n{X_centered}")
print(f"    Check new column means (should be ~0): {np.round(np.mean(X_centered, axis=0), 4)}")

# ── 2. Neural Network Dense Layer Bias Addition ──────────────────────────────
np.random.seed(42)
batch_size = 4
in_features = 3
out_features = 2

# Weights matrix W (3, 2)
W = np.random.randn(in_features, out_features)
# Bias vector b (2,)
b = np.array([0.5, -0.2])

# Matrix multiplication produces (4, 2)
pre_bias = X @ W
print(f"\n[2] Pre-Bias Matrix (X @ W, shape {pre_bias.shape}):\n{np.round(pre_bias, 3)}")
print(f"    Bias Vector b (shape {b.shape}): {b}")

# Broadcasting: (4, 2) + (2,) -> adds b to every sample row in batch!
logits = pre_bias + b
print(f"\n    Final Output Logits (X @ W + b, shape {logits.shape}):\n{np.round(logits, 3)}")
