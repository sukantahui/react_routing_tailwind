"""
================================================================================
Topic 12 - Script 03: The `out=` Parameter for Zero-Allocation Pipelines
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- The `out=` parameter supported by all NumPy ufuncs
- Reusing existing memory buffers to prevent memory allocation in tight training loops
- Comparing memory addresses of output vs input buffers
================================================================================
"""

import numpy as np

def demonstrate_out_parameter():
    print("=" * 65)
    print("ZERO ALLOCATION PIPELINE WITH `out=`")
    print("=" * 65)

    # 1. Standard creation allocates a new array
    x = np.array([1.0, 2.0, 3.0, 4.0])
    orig_addr = x.ctypes.data
    print("Original x address:", hex(orig_addr))

    # Standard exponentiation
    y_new = np.exp(x)
    print("y_new address     :", hex(y_new.ctypes.data), "(Brand new memory allocated!)")

    # In-place write using out=x
    np.exp(x, out=x)
    print("x address after `np.exp(x, out=x)`:", hex(x.ctypes.data), "(Exact same buffer reused!)")
    print("x values updated in-place         :", x)

    # 2. Writing to a pre-allocated output buffer
    buffer = np.empty(4, dtype=np.float64)
    a = np.array([10.0, 20.0, 30.0, 40.0])
    b = np.array([1.0, 2.0, 3.0, 4.0])

    np.multiply(a, b, out=buffer)
    print("\nPre-allocated buffer result of np.multiply(a, b, out=buffer):", buffer)

if __name__ == "__main__":
    demonstrate_out_parameter()
