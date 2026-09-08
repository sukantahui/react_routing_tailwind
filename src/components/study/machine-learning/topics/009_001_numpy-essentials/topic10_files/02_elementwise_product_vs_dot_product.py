"""
================================================================================
Topic 10 - Script 02: Element-Wise (Hadamard) Product vs Matrix Dot Product
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Hadamard Product: A * B (Element-wise multiplication, requires identical shapes)
- Matrix Product  : A @ B or np.dot(A, B) (Linear algebra matrix multiplication)
- Inner dimension matching rule: (M, K) @ (K, N) -> (M, N)
================================================================================
"""

import numpy as np

def compare_multiplication_types():
    print("=" * 65)
    print("HADAMARD PRODUCT (*) vs MATRIX MULTIPLICATION (@)")
    print("=" * 65)

    A = np.array([
        [1, 2],
        [3, 4]
    ])

    B = np.array([
        [5, 6],
        [7, 8]
    ])

    print("Matrix A:\n", A)
    print("\nMatrix B:\n", B)

    # 1. Element-wise product (A * B)
    hadamard = A * B
    print("\n1. Element-wise Product (A * B):\n", hadamard)
    print("   Calculation: [1*5, 2*6] = [5, 12]; [3*7, 4*8] = [21, 32]")

    # 2. Matrix Dot product (A @ B)
    mat_mul = A @ B
    print("\n2. Matrix Dot Product (A @ B or np.dot(A, B)):\n", mat_mul)
    print("   Calculation: Row 0 . Col 0 = 1*5 + 2*7 = 19; Row 0 . Col 1 = 1*6 + 2*8 = 22")
    print("                Row 1 . Col 0 = 3*5 + 4*7 = 43; Row 1 . Col 1 = 3*6 + 4*8 = 50")

    print("\n[CRITICAL ML DISTINCTION]:")
    print("Use '*' for feature scaling, dropout masks, and loss calculations.")
    print("Use '@' or np.dot() for linear layer forward passes (X @ W + b).")

if __name__ == "__main__":
    compare_multiplication_types()
