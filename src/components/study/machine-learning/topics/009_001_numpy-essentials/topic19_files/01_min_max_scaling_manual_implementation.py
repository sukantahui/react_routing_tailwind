"""
01_min_max_scaling_manual_implementation.py
===========================================
Worked Example 3: Manual Min-Max Normalization into [0, 1] Range
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def min_max_scale(X: np.ndarray, feature_range=(0.0, 1.0)) -> np.ndarray:
    """Manually scales features to specified range: X_scaled = (X - X_min) / (X_max - X_min)."""
    # 1. Compute column-wise min and max: axis=0
    x_min = np.min(X, axis=0)  # Shape: (D,)
    x_max = np.max(X, axis=0)  # Shape: (D,)
    
    # 2. Prevent division by zero if all elements in a column are identical
    range_span = x_max - x_min
    range_span[range_span == 0.0] = 1.0
    
    # 3. Scale to [0, 1]
    x_std = (X - x_min) / range_span
    
    # 4. Scale to custom target range [min_target, max_target]
    low, high = feature_range
    x_scaled = x_std * (high - low) + low
    return x_scaled

def main():
    print("=" * 70)
    print("WORKED EXAMPLE 3: MANUAL MIN-MAX SCALING PIPELINE")
    print("=" * 70)

    # Dataset: 4 students with features [Age, Income_INR, Exam_Score]
    # Huge variance in feature scales: Age (~20), Income (~45,000), Exam (~85)
    X = np.array([
        [20.0, 25000.0, 85.0],  # Debangshu
        [22.0, 48000.0, 92.0],  # Susmita
        [19.0, 15000.0, 65.0],  # Swadeep
        [24.0, 60000.0, 88.0]   # Tuhina
    ])

    print("1. Raw Features X:\n", X)
    print("   Column Minima:", np.min(X, axis=0))
    print("   Column Maxima:", np.max(X, axis=0))

    # Scale to [0, 1]
    X_scaled_0_1 = min_max_scale(X, feature_range=(0.0, 1.0))
    print("\n2. Scaled to [0, 1] Range:\n", np.round(X_scaled_0_1, 4))
    assert np.all(X_scaled_0_1 >= 0.0) and np.all(X_scaled_0_1 <= 1.0)

    # Scale to [-1, 1] for neural network tanh inputs
    X_scaled_neg1_1 = min_max_scale(X, feature_range=(-1.0, 1.0))
    print("\n3. Scaled to [-1, 1] Range:\n", np.round(X_scaled_neg1_1, 4))

if __name__ == "__main__":
    main()
