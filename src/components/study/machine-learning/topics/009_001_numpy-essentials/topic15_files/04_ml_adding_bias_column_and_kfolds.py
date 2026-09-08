"""
04_ml_adding_bias_column_and_kfolds.py
======================================
Topic: ML Practical Workflows: Augmented Bias Column (Design Matrix) & K-Fold Splitter
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def add_bias_term(X: np.ndarray) -> np.ndarray:
    """Prepends a column of ones (bias term x_0 = 1) to feature matrix X."""
    N = X.shape[0]
    ones = np.ones((N, 1), dtype=X.dtype)
    # Using np.hstack to join (N, 1) and (N, D) => (N, D+1)
    return np.hstack((ones, X))

def k_fold_cross_validation_splits(X: np.ndarray, y: np.ndarray, k: int = 3):
    """Generates train and validation folds using np.array_split and np.vstack."""
    N = len(X)
    indices = np.arange(N)
    # Split index array into k folds
    fold_indices = np.array_split(indices, k)
    
    splits = []
    for i in range(k):
        val_idx = fold_indices[i]
        # Train indices are all folds except fold i
        train_idx = np.hstack([fold_indices[j] for j in range(k) if j != i])
        
        X_train, y_train = X[train_idx], y[train_idx]
        X_val, y_val = X[val_idx], y[val_idx]
        splits.append((X_train, y_train, X_val, y_val))
    return splits

def main():
    print("=" * 70)
    print("ML WORKFLOWS: BIAS COLUMN AUGMENTATION & K-FOLD SPLITTING")
    print("=" * 70)

    # Raw features: 6 students, 2 features (Study Hours, Attendance Rate)
    X = np.array([
        [2.0, 75.0],
        [4.0, 85.0],
        [6.0, 90.0],
        [8.0, 95.0],
        [3.0, 80.0],
        [7.0, 92.0]
    ])
    y = np.array([55.0, 70.0, 85.0, 96.0, 62.0, 91.0])

    print("1. Raw Features X shape:", X.shape)

    # 1. Bias Column Augmentation
    X_augmented = add_bias_term(X)
    print("\n2. Augmented Design Matrix [1 | X] shape:", X_augmented.shape)
    print("   Augmented Matrix Preview:\n", X_augmented)

    # 2. K-Fold Cross Validation Generation
    print("\n3. Generating 3-Fold Cross-Validation Sets:")
    folds = k_fold_cross_validation_splits(X_augmented, y, k=3)

    for fold_num, (X_tr, y_tr, X_va, y_va) in enumerate(folds, 1):
        print(f"\n   --- Fold {fold_num} ---")
        print(f"   Train samples: {len(X_tr)} (Shapes: X_tr={X_tr.shape}, y_tr={y_tr.shape})")
        print(f"   Val samples  : {len(X_va)} (Shapes: X_va={X_va.shape}, y_va={y_va.shape})")

if __name__ == "__main__":
    main()
