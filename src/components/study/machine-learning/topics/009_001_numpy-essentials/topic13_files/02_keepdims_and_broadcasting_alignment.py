"""
================================================================================
Topic 13 - Script 02: keepdims=True and Dimensional Alignment for Broadcasting
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- The dimension-dropping behavior of default reductions (ndim decreases by 1)
- Why keepdims=True preserves singleton dimensions: shape (1, p) or (N, 1)
- Eliminating broadcasting ambiguity in Feature Mean Centering & Sample Normalization
================================================================================
"""

import numpy as np

def demonstrate_keepdims():
    print("=" * 65)
    print("THE CRUCIAL ROLE OF keepdims=True IN DATA PREPROCESSING")
    print("=" * 65)

    # 4 students x 3 exam features
    X = np.array([
        [10.0, 20.0, 30.0],
        [40.0, 50.0, 60.0],
        [70.0, 80.0, 90.0],
        [100.0, 110.0, 120.0]
    ])
    print(f"Feature Matrix X Shape: {X.shape} (N_samples=4, N_features=3)")

    print("\n" + "-" * 50)
    print("1. FEATURE-WISE REDUCTION (axis=0):")
    print("-" * 50)
    mu_dropped = np.mean(X, axis=0) # Shape (3,)
    mu_kept    = np.mean(X, axis=0, keepdims=True) # Shape (1, 3)
    
    print("Without keepdims shape :", mu_dropped.shape)
    print("With keepdims=True shape:", mu_kept.shape)
    print("Centered X (X - mu_kept) Shape:", (X - mu_kept).shape)

    print("\n" + "-" * 50)
    print("2. SAMPLE-WISE REDUCTION (axis=1) - WHERE BUGS HAPPEN WITHOUT keepdims!")
    print("-" * 50)
    row_sum_dropped = np.sum(X, axis=1) # Shape (4,)
    row_sum_kept    = np.sum(X, axis=1, keepdims=True) # Shape (4, 1)

    print("Without keepdims shape :", row_sum_dropped.shape, "<- (4,) matches trailing dimension 3 incorrectly!")
    print("With keepdims=True shape:", row_sum_kept.shape, "<- (4, 1) cleanly broadcasts across (4, 3)!")

    # Attempting row-wise proportion normalization: X / row_sum
    # Without keepdims: (4, 3) / (4,) causes ValueError: operands could not be broadcast together with shapes (4,3) (4,)!
    try:
        norm_fail = X / row_sum_dropped
    except ValueError as e:
        print(f"[CAUGHT ERROR WITHOUT keepdims]: {e}")

    # With keepdims: (4, 3) / (4, 1) works flawlessly!
    norm_success = X / row_sum_kept
    print("\nNormalized Row Matrix (X / row_sum_kept):\n", np.round(norm_success, 3))
    print("Row sums verify to 1.0:", np.sum(norm_success, axis=1))

if __name__ == "__main__":
    demonstrate_keepdims()
