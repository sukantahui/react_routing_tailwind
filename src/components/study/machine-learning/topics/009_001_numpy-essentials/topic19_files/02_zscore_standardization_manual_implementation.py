"""
02_zscore_standardization_manual_implementation.py
==================================================
Worked Example 3: Manual Z-Score Standardization (StandardScaler: mu=0, sigma=1)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

class ManualStandardScaler:
    """Production-grade manual implementation of sklearn StandardScaler using NumPy."""
    def __init__(self, eps: float = 1e-8):
        self.eps = eps
        self.mean_ = None
        self.std_ = None

    def fit(self, X: np.ndarray):
        """Learns column-wise mean and standard deviation from training set."""
        self.mean_ = np.mean(X, axis=0)
        self.std_ = np.std(X, axis=0)
        return self

    def transform(self, X: np.ndarray) -> np.ndarray:
        """Transforms data using stored training statistics: Z = (X - mu) / sigma."""
        if self.mean_ is None or self.std_ is None:
            raise ValueError("StandardScaler must be fit before transforming data!")
        # Epsilon stabilization prevents division by zero for constant columns
        return (X - self.mean_) / (self.std_ + self.eps)

    def fit_transform(self, X: np.ndarray) -> np.ndarray:
        return self.fit(X).transform(X)

def main():
    print("=" * 70)
    print("WORKED EXAMPLE 3: MANUAL Z-SCORE STANDARDIZATION")
    print("=" * 70)

    # 4 students with features [Age, Income_INR, Exam_Score]
    X_train = np.array([
        [20.0, 25000.0, 85.0],  # Debangshu
        [22.0, 48000.0, 92.0],  # Susmita
        [19.0, 15000.0, 65.0],  # Swadeep
        [24.0, 60000.0, 88.0]   # Tuhina
    ])

    scaler = ManualStandardScaler()
    X_scaled = scaler.fit_transform(X_train)

    print("1. Learned Training Statistics:")
    print("   Mean Vector (mu)  :", np.round(scaler.mean_, 2))
    print("   Std Vector (sigma):", np.round(scaler.std_, 2))

    print("\n2. Z-Score Standardized Matrix Z:\n", np.round(X_scaled, 4))

    # Verify: Resulting columns have mean ≈ 0.0 and std ≈ 1.0
    print("\n3. Verification of Standardized Matrix:")
    print("   Column Means:", np.round(np.mean(X_scaled, axis=0), 4))
    print("   Column Stds :", np.round(np.std(X_scaled, axis=0), 4))
    assert np.allclose(np.mean(X_scaled, axis=0), 0.0)
    assert np.allclose(np.std(X_scaled, axis=0), 1.0)

if __name__ == "__main__":
    main()
