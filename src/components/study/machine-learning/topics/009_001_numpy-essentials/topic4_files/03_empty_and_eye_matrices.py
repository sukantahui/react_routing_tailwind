"""
================================================================================
Topic 4 - Script 03: np.empty() Speedup & Identity / Eye Matrices in ML
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- np.empty(shape): Fast memory allocation without zero-wiping (uninitialized RAM garbage)
- When to use np.empty() (when every element is guaranteed to be overwritten immediately)
- np.eye(N) & np.identity(N): Diagonal identity matrices
- Real ML applications: Ridge regression L2 regularization matrix (lambda * I) and One-Hot Encoding
================================================================================
"""

import time
import numpy as np

def demonstrate_empty_and_eye():
    print("=" * 65)
    print("1. np.empty(): UNINITIALIZED BUFFER ALLOCATION")
    print("=" * 65)
    
    # Fast buffer allocation
    buf = np.empty((3, 3), dtype=np.float64)
    print("Raw np.empty((3,3)) buffer contents (uninitialized RAM garbage):\n", buf)
    
    # Filling buffer immediately:
    buf.fill(42.0)
    print("\nBuffer after buf.fill(42.0):\n", buf)

    print("\n" + "=" * 65)
    print("2. np.eye(): IDENTITY MATRICES IN ML")
    print("=" * 65)
    
    # 4x4 Identity Matrix
    I_4 = np.eye(4, dtype=np.float32)
    print("4x4 Identity Matrix:\n", I_4)

    # ML Case: Ridge Regression L2 regularization penalty matrix: lambda * I
    lambda_reg = 0.01
    reg_matrix = lambda_reg * np.eye(4)
    print(f"\nRidge Regularization Matrix (lambda = {lambda_reg}):\n", reg_matrix)

    # One-Hot Encoding demo using np.eye()
    labels = np.array([0, 2, 1, 3]) # 4 samples, 4 classes
    one_hot = np.eye(4)[labels]
    print("\nOne-Hot Encoded Targets from labels [0, 2, 1, 3]:\n", one_hot)

if __name__ == "__main__":
    demonstrate_empty_and_eye()
