"""
Topic 9: Matrix Inverses and Solving Linear Systems via scipy.linalg
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import linalg

# System of Linear Equations:
# 3x + 2y = 18
# 1x + 4y = 16

A = np.array([[3.0, 2.0], [1.0, 4.0]])
b = np.array([18.0, 16.0])

# 1. Solving Ax = b directly via LAPACK solve (preferred over inv(A) @ b)
x = linalg.solve(A, b)

# 2. Matrix Inversion: A^{-1}
A_inv = linalg.inv(A)

print("--- System of Linear Equations ---")
print(f"Matrix A:\n{A}")
print(f"Vector b: {b}\n")
print(f"Exact Solution x: {x}  (x = {x[0]:.2f}, y = {x[1]:.2f})")
print(f"\nMatrix Inverse A^(-1):\n{A_inv}")

# Verification: A @ A_inv = Identity matrix I
I = A @ A_inv
print(f"\nVerification A @ A_inv:\n{np.round(I, 4)}")
