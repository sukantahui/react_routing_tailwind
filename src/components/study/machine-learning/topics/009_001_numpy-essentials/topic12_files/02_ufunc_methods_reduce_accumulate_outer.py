"""
================================================================================
Topic 12 - Script 02: Special ufunc Methods (.reduce, .accumulate, .outer)
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- ufunc.reduce(arr): Collapsing dimensions with repetitive operations
- ufunc.accumulate(arr): Storing cumulative intermediate results (prefix sums)
- ufunc.outer(A, B): Computing pairwise operations for all pairs
================================================================================
"""

import numpy as np

def demonstrate_ufunc_methods():
    print("=" * 65)
    print("1. .reduce(): DIMENSION COLLAPSING")
    print("=" * 65)

    arr = np.array([1, 2, 3, 4, 5])
    print("Array:", arr)
    print("np.add.reduce(arr)      :", np.add.reduce(arr), "(1+2+3+4+5 = 15)")
    print("np.multiply.reduce(arr) :", np.multiply.reduce(arr), "(1*2*3*4*5 = 120)")

    print("\n" + "=" * 65)
    print("2. .accumulate(): CUMULATIVE PREFIX SUMS")
    print("=" * 65)
    
    # Cumulative student attendance hours over 5 days
    daily_hours = np.array([2.5, 3.0, 1.5, 4.0, 2.0])
    print("Daily Study Hours           :", daily_hours)
    print("np.add.accumulate(daily_hrs):", np.add.accumulate(daily_hours))

    print("\n" + "=" * 65)
    print("3. .outer(): PAIRWISE OPERATION MATRICES")
    print("=" * 65)
    
    x = np.array([1, 2, 3])
    y = np.array([10, 20, 30])
    print("x:", x)
    print("y:", y)
    print("\nnp.multiply.outer(x, y):\n", np.multiply.outer(x, y))
    print("\nnp.subtract.outer(x, y) (Pairwise Difference Matrix):\n", np.subtract.outer(x, y))

if __name__ == "__main__":
    demonstrate_ufunc_methods()
