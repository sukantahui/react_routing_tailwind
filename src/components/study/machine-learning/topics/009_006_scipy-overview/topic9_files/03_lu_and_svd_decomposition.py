"""
Topic 9: LU and Singular Value Decomposition (SVD)
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import linalg

# Feature dataset matrix with 4 samples and 2 features
X = np.array([
    [2.5, 2.4],
    [0.5, 0.7],
    [2.2, 2.9],
    [1.9, 2.2]
])

# Singular Value Decomposition: X = U \Sigma V^T
# Core mathematical backbone of PCA, Latent Semantic Analysis, and Matrix Factorization
U, s, Vt = linalg.svd(X)

print("--- Singular Value Decomposition (SVD) ---")
print("Input Matrix X shape:", X.shape)
print("\n1. Left Singular Matrix U (Sample space projection):")
print(np.round(U, 3))

print("\n2. Singular Values \u03a3 (Eigen-energy of features):")
print(np.round(s, 3))

print("\n3. Right Singular Matrix V^T (Principal Component directions):")
print(np.round(Vt, 3))
