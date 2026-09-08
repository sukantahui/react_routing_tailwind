"""
02_per_sample_baseline_adjustment.py
====================================
Worked Example 2: Per-Sample Row-wise Broadcasting & (N, 1) Reshaping
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("WORKED EXAMPLE 2: ROW-WISE BROADCASTING & DIMENSION ALIGNMENT")
    print("=" * 70)

    # 4 students, 3 subjects
    X = np.array([
        [85.0, 90.0, 88.0],  # Debangshu
        [92.0, 95.0, 91.0],  # Susmita
        [65.0, 70.0, 72.0],  # Swadeep
        [88.0, 85.0, 94.0]   # Tuhina
    ])

    # Suppose we want to subtract each student's personal minimum score across subjects
    # to evaluate subject-specific outperformance.
    # Row minimums: axis=1
    min_scores_1d = np.min(X, axis=1)  # Shape: (4,)
    print("1. Per-student Min Scores (1D):", min_scores_1d, "Shape:", min_scores_1d.shape)

    # Attempting X - min_scores_1d directly:
    # X shape:        (4, 3)
    # min shape:         (4,)
    # Right-aligned: (4, 3) vs ( , 4) -> 3 != 4 => Raises ValueError!
    print("\nAttempting direct subtraction (X - min_scores_1d):")
    try:
        invalid_res = X - min_scores_1d
    except ValueError as e:
        print("  [ERROR CAUGHT]:", e)

    # Correct Fix: Reshape min vector to (4, 1) using keepdims=True or np.newaxis
    min_scores_2d = min_scores_1d[:, np.newaxis]  # Shape: (4, 1)
    print("\n2. Reshaped Min Scores (2D Column Vector):")
    print(min_scores_2d, "Shape:", min_scores_2d.shape)

    # X shape:        (4, 3)
    # min_2d shape:   (4, 1) -> 1 expands to 3 along Axis 1!
    # Result:         (4, 3)
    X_relative = X - min_scores_2d
    print("\n3. Relative Outperformance Matrix (X - min[:, np.newaxis]):\n", X_relative)

if __name__ == "__main__":
    main()
