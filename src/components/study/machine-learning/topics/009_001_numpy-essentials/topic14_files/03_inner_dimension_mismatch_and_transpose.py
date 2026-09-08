"""
03_inner_dimension_mismatch_and_transpose.py
============================================
Topic: Debugging Dimension Mismatches & Utilizing Transposition (.T)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("INNER DIMENSION MISMATCH & TRANSPOSITION (.T)")
    print("=" * 70)

    # Consider two feature matrices from Barrackpore test center
    # X1: 4 students, 3 features (Batch A) -> (4, 3)
    # X2: 5 students, 3 features (Batch B) -> (5, 3)
    X1 = np.array([
        [85, 90, 88],
        [92, 95, 91],
        [65, 70, 72],
        [88, 85, 94]
    ])
    X2 = np.array([
        [80, 82, 85],
        [75, 78, 80],
        [90, 92, 95],
        [60, 65, 70],
        [88, 90, 92]
    ])

    print(f"X1 shape: {X1.shape} (N=4, D=3)")
    print(f"X2 shape: {X2.shape} (M=5, D=3)")

    # 1. Attempting direct matrix multiplication: X1 @ X2
    print("\nAttempting X1 @ X2:")
    try:
        result = X1 @ X2
    except ValueError as e:
        print(f"  [ERROR CAUGHT]: {e}")
        print("  Reason: Inner dimensions (3) and (5) do NOT match!")

    # 2. Fixing via Transpose: X1 @ X2.T -> (4, 3) @ (3, 5) => (4, 5)
    # This computes sample-to-sample similarity (Gram matrix) between Batch A and Batch B
    print("\nCorrect Alignment using Transpose: X1 @ X2.T")
    X2_T = X2.T
    print(f"  X2.T shape: {X2_T.shape}")
    similarity_matrix = X1 @ X2_T
    print(f"  Resulting Gram Matrix shape: {similarity_matrix.shape} (4 students vs 5 students)")
    print("  Similarity Matrix:\n", similarity_matrix)

    # 3. Covariance Feature Cross-Product: X1.T @ X1 -> (3, 4) @ (4, 3) => (3, 3)
    # This computes feature-to-feature unnormalized covariance matrix
    print("\nFeature Interaction Matrix (X1.T @ X1):")
    feat_cov = X1.T @ X1
    print(f"  Shape: {feat_cov.shape} (D=3, D=3 features)")
    print("  Matrix:\n", feat_cov)

if __name__ == "__main__":
    main()
