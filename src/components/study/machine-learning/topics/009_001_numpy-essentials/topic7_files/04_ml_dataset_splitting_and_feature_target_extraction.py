"""
================================================================================
Topic 7 - Script 04: ML Dataset Splitting & Feature / Target Extraction
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Separating feature matrix X from label vector y via slicing: data[:, :-1] and data[:, -1]
- Performing Train / Validation / Test dataset splits using index slicing
- Preserving 2D structure when slicing a single feature vs 1D reduction
================================================================================
"""

import numpy as np

def demonstrate_ml_slicing():
    print("=" * 65)
    print("ML PIPELINE: Feature/Label Extraction and Train-Test Split")
    print("=" * 65)

    # Simulated CSV dataset with 10 rows and 4 columns:
    # Col 0: Study Hours, Col 1: Attendance %, Col 2: Previous Marks, Col 3: Final Pass (1/0)
    np.random.seed(42)
    dataset = np.random.uniform(50, 100, size=(10, 4))
    dataset[:, 3] = np.random.choice([0, 1], size=10) # Target labels in last column
    print("Raw Full Dataset (10 samples x 4 cols):\n", np.round(dataset, 1))

    # 1. Separate Feature Matrix X and Target Vector y
    X = dataset[:, :-1]  # All rows, all columns except the last
    y = dataset[:, -1]   # All rows, only the last column

    print(f"\nFeature Matrix X Shape: {X.shape} (Must be 2D)")
    print(f"Target Vector y Shape : {y.shape} (1D vector)")

    # 2. Train / Test Split (80% Train, 20% Test)
    n_samples = len(dataset)
    train_size = int(0.8 * n_samples)

    X_train, X_test = X[:train_size], X[train_size:]
    y_train, y_test = y[:train_size], y[train_size:]

    print("\nDataset Split Summary:")
    print(f"  Training Set   : X_train {X_train.shape}, y_train {y_train.shape}")
    print(f"  Testing Set    : X_test  {X_test.shape}, y_test  {y_test.shape}")

if __name__ == "__main__":
    demonstrate_ml_slicing()
