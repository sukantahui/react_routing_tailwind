"""
================================================================================
Topic 8 - Script 04: ML Outlier Filtering, NaN Cleaning & Batch Pruning
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Detecting and filtering Missing / NaN values using np.isnan()
- Row-level boolean masking: keeping only rows where all features are valid (~np.isnan(X).any(axis=1))
- Outlier filtering using Z-Score statistical thresholds (|z| <= 3.0)
================================================================================
"""

import numpy as np

def demonstrate_ml_data_cleaning():
    print("=" * 65)
    print("1. CLEANING MISSING VALUES (NaN REMOVAL)")
    print("=" * 65)

    # 5 student records with 2 features (Study Hours, Attendance)
    # Student 1 has NaN hours, Student 3 has NaN attendance
    X_raw = np.array([
        [4.0, 85.0],
        [np.nan, 90.0],
        [6.5, 95.0],
        [3.0, np.nan],
        [8.0, 98.0]
    ])
    y_raw = np.array([1, 1, 1, 0, 1])

    print("Raw Feature Matrix with NaNs:\n", X_raw)

    # Boolean mask: Which rows contain ANY NaN?
    has_nan_row = np.isnan(X_raw).any(axis=1)
    valid_rows_mask = ~has_nan_row

    print("\nValid Rows Mask (~np.isnan(X).any(axis=1)):", valid_rows_mask)
    
    # Filter both X and y synchronously
    X_clean = X_raw[valid_rows_mask]
    y_clean = y_raw[valid_rows_mask]

    print(f"\nCleaned Feature Matrix X (Shape {X_clean.shape}):\n", X_clean)
    print("Cleaned Target Labels y:", y_clean)

    print("\n" + "=" * 65)
    print("2. STATISTICAL OUTLIER FILTERING (Z-SCORE MASK)")
    print("=" * 65)
    # Salary / income features with extreme erroneous sensor reading (e.g. 99999)
    incomes = np.array([25000, 28000, 31000, 27000, 29000, 999999, 26000], dtype=np.float64)
    mu = np.mean(incomes)
    sigma = np.std(incomes)
    
    z_scores = np.abs((incomes - mu) / sigma)
    non_outliers_mask = z_scores < 2.0 # Keep points within 2 standard deviations

    print("Raw Incomes        :", incomes)
    print("Non-Outliers Mask  :", non_outliers_mask)
    print("Pruned Clean Incomes:", incomes[non_outliers_mask])

if __name__ == "__main__":
    demonstrate_ml_data_cleaning()
