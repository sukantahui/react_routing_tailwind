"""
01_feature_centering_mean_subtraction.py
========================================
Worked Example 2: Mean Centering Feature Matrices via NumPy Broadcasting
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("WORKED EXAMPLE 2: FEATURE MEAN CENTERING VIA BROADCASTING")
    print("=" * 70)

    # Problem:
    # A dataset of 4 students across 3 exam subjects (Math, Science, English)
    # Shape: (4, 3)
    X = np.array([
        [85.0, 90.0, 88.0],  # Debangshu
        [92.0, 95.0, 91.0],  # Susmita
        [65.0, 70.0, 72.0],  # Swadeep
        [88.0, 85.0, 94.0]   # Tuhina
    ])

    print("1. Raw Feature Matrix X (4 students x 3 subjects):\n", X)
    print("   Shape of X:", X.shape)

    # 1. Calculate per-feature column mean: axis=0
    # Shape: (3,)
    mean_vec = np.mean(X, axis=0)
    print(f"\n2. Column Means Vector mu: {np.round(mean_vec, 2)}")
    print(f"   Shape of mu: {mean_vec.shape}")

    # 2. Broadcasting Subtraction: X - mu
    # X shape:        (4, 3)
    # mu shape:          (3,) -> Broadcasts along rows to (4, 3)
    # Result shape:   (4, 3)
    X_centered = X - mean_vec
    print("\n3. Centered Feature Matrix (X - mu):\n", np.round(X_centered, 2))

    # Verify that the column means of X_centered are 0.0
    centered_means = np.mean(X_centered, axis=0)
    print(f"\n4. Verification: New Column Means: {np.round(centered_means, 4)}")
    assert np.allclose(centered_means, 0.0)
    print("   -> Success: All features now zero-centered!")

if __name__ == "__main__":
    main()
