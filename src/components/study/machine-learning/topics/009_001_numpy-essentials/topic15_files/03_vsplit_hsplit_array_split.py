"""
03_vsplit_hsplit_array_split.py
===============================
Topic: Array Splitting: np.vsplit, np.hsplit, np.split, np.array_split
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("ARRAY SPLITTING (vsplit, hsplit, array_split)")
    print("=" * 70)

    # Master dataset matrix: 6 students, 4 features
    dataset = np.array([
        [85, 90, 88, 1],  # Debangshu
        [92, 95, 91, 1],  # Susmita
        [65, 70, 72, 0],  # Swadeep
        [88, 85, 94, 1],  # Tuhina
        [78, 80, 82, 0],  # Sachin
        [95, 98, 96, 1]   # Mahima
    ])
    print(f"Master Dataset Shape: {dataset.shape} (6 samples, 4 columns)")
    print(dataset)

    # 1. np.vsplit (Vertical Split -> Splits rows along Axis 0)
    # E.g., Train / Test split into 2 equal halves of 3 rows each
    train_split, test_split = np.vsplit(dataset, 2)
    print("\n1. np.vsplit(dataset, 2) -> 2 Sub-arrays of Shape (3, 4):")
    print("   Train Split:\n", train_split)
    print("   Test Split:\n", test_split)

    # 2. np.hsplit (Horizontal Split -> Splits columns along Axis 1)
    # E.g., Separating Features X (first 3 cols) and Target Label y (last col)
    # Using column indices [3] to split at index 3
    X, y = np.hsplit(dataset, [3])
    print("\n2. np.hsplit(dataset, [3]) -> Features X vs Labels y:")
    print(f"   X shape: {X.shape} (Features):\n", X)
    print(f"   y shape: {y.shape} (Target label):\n", y)

    # 3. np.array_split (Handles Unequal Splitting without error)
    # Try splitting 6 rows into 4 chunks (6 is not divisible by 4)
    # np.split would raise ValueError, but np.array_split gracefully handles it
    folds = np.array_split(dataset, 4)
    print("\n3. np.array_split(dataset, 4) -> 4 Folds for Cross-Validation:")
    for i, fold in enumerate(folds):
        print(f"   Fold {i+1} shape: {fold.shape}")

if __name__ == "__main__":
    main()
