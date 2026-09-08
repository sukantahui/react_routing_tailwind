"""
================================================================================
Topic 5 - Script 02: Demystifying (N,) 1D Vectors vs (N, 1) Column Matrices
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- The difference between rank-1 vector (4,), row matrix (1, 4), and column matrix (4, 1)
- Why calling .T (transpose) does NOTHING on a 1D array of shape (N,)
- Why Scikit-learn models crash with Expected 2D array, got 1D array instead
================================================================================
"""

import numpy as np

def compare_vector_shapes():
    print("=" * 65)
    print("THE 1D vs 2D SHAPE PARADOX IN MACHINE LEARNING")
    print("=" * 65)

    # 1. 1D Rank-1 array
    a_1d = np.array([10, 20, 30, 40])
    print("1. 1D Array:")
    print("   Array   :", a_1d)
    print("   Shape   :", a_1d.shape, " (1 axis, length 4)")
    print("   Transpose a_1d.T:", a_1d.T, "Shape after transpose:", a_1d.T.shape, "(UNCHANGED!)")

    # 2. 2D Row Vector (1, 4)
    row_2d = a_1d.reshape(1, 4)
    print("\n2. 2D Row Vector:")
    print("   Array   :\n", row_2d)
    print("   Shape   :", row_2d.shape, " (2 axes: 1 row, 4 cols)")
    print("   Transpose row_2d.T:\n", row_2d.T)
    print("   Shape after transpose:", row_2d.T.shape, " (Became Column Vector!)")

    # 3. 2D Column Vector (4, 1)
    col_2d = a_1d.reshape(4, 1)
    print("\n3. 2D Column Vector:")
    print("   Array   :\n", col_2d)
    print("   Shape   :", col_2d.shape, " (2 axes: 4 rows, 1 col)")

if __name__ == "__main__":
    compare_vector_shapes()
