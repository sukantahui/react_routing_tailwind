"""
Topic 9: Determinants, Eigenvalues, and Eigenvectors (PCA Foundation)
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import linalg

# Covariance / Transformation Matrix:
M = np.array([
    [4.0, 2.0],
    [1.0, 3.0]
])

# 1. Determinant (Scaling factor of area/volume)
det_val = linalg.det(M)
print(f"Matrix M:\n{M}")
print(f"Determinant det(M): {det_val:.4f}")

# 2. Eigenvalues (\lambda) and Eigenvectors (v): M v = \lambda v
eigenvalues, eigenvectors = linalg.eig(M)

print("\n--- Eigen Decomposition (Foundational for PCA) ---")
print("Eigenvalues (Variance magnitude along principal axes):")
for i, val in enumerate(eigenvalues.real, 1):
    print(f" \u03bb_{i} = {val:.4f}")

print("\nEigenvectors (Columns represent orthogonal principal directions):")
print(np.round(eigenvectors.real, 4))
