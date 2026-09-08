"""
Topic 2: Linear Algebra Comparison: numpy.linalg vs scipy.linalg
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
import scipy.linalg as la

# scipy.linalg always compiles with full LAPACK/BLAS acceleration and offers 
# broader matrix decompositions (LU, Schur, Cholesky, QR, Hessenberg).

A = np.array([[4, 3], [6, 3]], dtype=float)

# 1. Solving linear system Ax = b
b = np.array([20, 36], dtype=float)
x = la.solve(A, b)
print(f"Matrix A:\n{A}")
print(f"Vector b: {b}")
print(f"Solution x via scipy.linalg.solve: {x}")

# 2. LU Decomposition: A = P * L * U
P, L, U = la.lu(A)
print("\n--- LU Decomposition (scipy.linalg.lu) ---")
print("Permutation P:\n", P)
print("Lower L:\n", L)
print("Upper U:\n", U)
