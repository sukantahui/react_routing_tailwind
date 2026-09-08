"""
02_problem2_pairwise_euclidean_distance.py
==========================================
Practice Problem 2: Fully Vectorized Pairwise Euclidean Distance Matrix (No Loops)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def pairwise_distances_broadcasting(A: np.ndarray, B: np.ndarray) -> np.ndarray:
    """Computes pairwise Euclidean distance matrix between (M, D) and (N, D) using 3D broadcasting."""
    # A[:, np.newaxis, :] has shape (M, 1, D)
    # B[np.newaxis, :, :] has shape (1, N, D)
    # Subtraction yields (M, N, D) difference tensor
    diff = A[:, np.newaxis, :] - B[np.newaxis, :, :]
    # Sum squares along feature axis D (axis=2) and take sqrt
    return np.sqrt(np.sum(diff ** 2, axis=2))

def pairwise_distances_algebraic(A: np.ndarray, B: np.ndarray) -> np.ndarray:
    """Computes pairwise Euclidean distance using algebraic expansion: ||a - b||^2 = ||a||^2 + ||b||^2 - 2(a . b)."""
    # Sum of squares per row
    A_sq = np.sum(A ** 2, axis=1, keepdims=True)  # Shape (M, 1)
    B_sq = np.sum(B ** 2, axis=1, keepdims=True)  # Shape (N, 1)
    # Dot product: A @ B.T has shape (M, N)
    dot_prod = A @ B.T
    # Distance squared: (M, 1) + (1, N) - 2*(M, N)
    dist_sq = np.maximum(A_sq + B_sq.T - 2.0 * dot_prod, 0.0)
    return np.sqrt(dist_sq)

def main():
    print("=" * 70)
    print("PRACTICE PROBLEM 2: PAIRWISE EUCLIDEAN DISTANCE MATRIX (KNN/K-MEANS ENGINE)")
    print("=" * 70)

    # Matrix A: 3 test query points (3, 2)
    A = np.array([
        [0.0, 0.0],
        [3.0, 4.0],
        [1.0, 1.0]
    ])

    # Matrix B: 4 training anchor points (4, 2)
    B = np.array([
        [0.0, 0.0],
        [1.0, 0.0],
        [0.0, 1.0],
        [3.0, 4.0]
    ])

    print("Query Points A (3x2):\n", A)
    print("\nAnchor Points B (4x2):\n", B)

    # Method 1: 3D Broadcasting
    D_broadcast = pairwise_distances_broadcasting(A, B)
    # Method 2: Algebraic Expansion (Optimized for Large Datasets)
    D_algebraic = pairwise_distances_algebraic(A, B)

    print(f"\nDistance Matrix Shape: {D_broadcast.shape} (3 query rows x 4 anchor cols)")
    print("Pairwise Distances (Broadcasting):\n", np.round(D_broadcast, 3))
    print("\nPairwise Distances (Algebraic):\n", np.round(D_algebraic, 3))

    assert np.allclose(D_broadcast, D_algebraic)
    print("\n-> Both fully vectorized implementations match with 0.0 error!")

if __name__ == "__main__":
    main()
