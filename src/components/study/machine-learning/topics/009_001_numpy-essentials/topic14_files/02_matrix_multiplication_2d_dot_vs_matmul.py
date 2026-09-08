"""
02_matrix_multiplication_2d_dot_vs_matmul.py
============================================
Topic: 2D Matrix Multiplication, (M, K) @ (K, N) Rules, and Dot vs Matmul
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("2D MATRIX MULTIPLICATION & OPERATOR DIFFERENCES")
    print("=" * 70)

    # Matrix A: (3 x 2) -> 3 students, 2 exam components (Theory, Practical)
    A = np.array([
        [80, 20],  # Debangshu
        [90, 25],  # Susmita
        [70, 15]   # Swadeep
    ])

    # Matrix B: (2 x 4) -> 2 components mapped to 4 weight criteria
    # [Term1, Term2, Final, Grace]
    B = np.array([
        [0.3, 0.3, 0.4, 0.05],
        [0.2, 0.2, 0.6, 0.10]
    ])

    print(f"Matrix A shape (M, K): {A.shape}")
    print(f"Matrix B shape (K, N): {B.shape}")
    print("\nMatrix A (Students x Components):\n", A)
    print("\nMatrix B (Components x Criteria Weights):\n", B)

    # 1. Inner Dimension Rule Check:
    # A has shape (3, 2), B has shape (2, 4)
    # Inner dimensions match: 2 == 2. Output shape = (3, 4)
    assert A.shape[1] == B.shape[0], "Inner dimensions must match!"

    # 2. Multiplication via np.dot, np.matmul, and @ operator
    C_dot = np.dot(A, B)
    C_matmul = np.matmul(A, B)
    C_operator = A @ B

    print(f"\nResulting Matrix C Shape: {C_dot.shape} (M, N = 3, 4)")
    print("\nResult C = A @ B:\n", np.round(C_operator, 2))
    assert np.allclose(C_dot, C_matmul) and np.allclose(C_dot, C_operator)

    # 3. Element-wise Multiplication (*) vs Matrix Multiplication (@)
    print("\nCRITICAL DIFFERENCE: (*) vs (@):")
    Square1 = np.array([[1, 2], [3, 4]])
    Square2 = np.array([[5, 6], [7, 8]])

    elem_prod = Square1 * Square2  # [[1*5, 2*6], [3*7, 4*8]] = [[5, 12], [21, 32]]
    mat_prod = Square1 @ Square2   # [[1*5+2*7, 1*6+2*8], [3*5+4*7, 3*6+4*8]] = [[19, 22], [43, 50]]

    print("  Square1 * Square2 (Hadamard / Element-wise):\n", elem_prod)
    print("  Square1 @ Square2 (Matrix product / Row-dot-Column):\n", mat_prod)

if __name__ == "__main__":
    main()
