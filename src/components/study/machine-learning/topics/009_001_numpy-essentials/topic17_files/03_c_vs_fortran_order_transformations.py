"""
03_c_vs_fortran_order_transformations.py
========================================
Worked Example 1: Memory Strides, C-Contiguous vs Fortran Order in Reshaping
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("WORKED EXAMPLE 1: MEMORY CONTIGUITY & ORDERING IN RESHAPING")
    print("=" * 70)

    # 1. Base 1D Array of student IDs
    arr_1d = np.arange(1, 13)
    print("Base 1D Array (1 to 12):\n", arr_1d)

    # 2. Reshaping with default C-Order (Row-Major: fills row 0, then row 1...)
    c_reshaped = arr_1d.reshape((3, 4), order='C')
    print("\n1. C-Order Reshape (3x4):\n", c_reshaped)
    print("   Row 0:", c_reshaped[0])
    print("   Row 1:", c_reshaped[1])

    # 3. Reshaping with Fortran-Order (Column-Major: fills col 0, then col 1...)
    f_reshaped = arr_1d.reshape((3, 4), order='F')
    print("\n2. Fortran-Order Reshape (3x4):\n", f_reshaped)
    print("   Col 0:", f_reshaped[:, 0])
    print("   Col 1:", f_reshaped[:, 1])

    # 4. Memory Strides Inspection
    print("\n3. Memory Strides Analysis (bytes to jump per axis):")
    print(f"   C-Order strides: {c_reshaped.strides} -> (jump 16 bytes for next row, 4 for next col)")
    print(f"   F-Order strides: {f_reshaped.strides} -> (jump 4 bytes for next row, 12 for next col)")

    # 5. Shared Memory (Views)
    c_reshaped[0, 0] = 999
    print("\n4. Modifying c_reshaped[0, 0] = 999:")
    print("   Base 1D array is modified (Shared View!):", arr_1d[:3])
    assert arr_1d[0] == 999

if __name__ == "__main__":
    main()
