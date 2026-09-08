"""
================================================================================
Topic 13 - Script 04: Standard Scaler (Z-Score) & Root Mean Squared Error (RMSE)
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Manual Z-score Standardization: z = (X - mu) / sigma using axis=0 & keepdims=True
- Root Mean Squared Error (RMSE): sqrt(mean((y_pred - y_true)**2))
- Handling degrees of freedom (ddof=0 for population std vs ddof=1 for sample std)
================================================================================
"""

import numpy as np

def demonstrate_ml_statistics():
    print("=" * 65)
    print("1. MANUAL Z-SCORE STANDARDIZATION (SCIKIT-LEARN STANDARDSCALER)")
    print("=" * 65)

    # 5 students with 2 features: Study Hours (0-10) and Family Income (20,000 - 80,000)
    X = np.array([
        [2.5, 25000.0],
        [4.0, 42000.0],
        [6.5, 65000.0],
        [1.5, 22000.0],
        [8.0, 78000.0]
    ])
    print("Raw Unscaled Feature Matrix X:\n", X)

    # Calculate column-wise mean and standard deviation with keepdims=True
    mu = np.mean(X, axis=0, keepdims=True)
    sigma = np.std(X, axis=0, keepdims=True)

    print("\nFeature Means (mu)    :", mu)
    print("Feature Stds  (sigma) :", sigma)

    # Vectorized Standardization: Z = (X - mu) / sigma
    X_scaled = (X - mu) / sigma
    print("\nZ-Score Standardized Matrix X_scaled:\n", np.round(X_scaled, 3))
    print("Verification - Scaled Means (should be ~0.0):", np.round(np.mean(X_scaled, axis=0), 4))
    print("Verification - Scaled Stds  (should be 1.0) :", np.round(np.std(X_scaled, axis=0), 4))

    print("\n" + "=" * 65)
    print("2. ROOT MEAN SQUARED ERROR (RMSE) METRIC")
    print("=" * 65)
    
    y_true = np.array([85.0, 92.0, 78.0, 90.0, 65.0])
    y_pred = np.array([82.0, 95.0, 74.0, 89.0, 70.0])

    rmse = np.sqrt(np.mean((y_pred - y_true) ** 2))
    print(f"Ground Truth y : {y_true}")
    print(f"Predictions y' : {y_pred}")
    print(f"Calculated RMSE: {rmse:.3f} marks")

if __name__ == "__main__":
    demonstrate_ml_statistics()
