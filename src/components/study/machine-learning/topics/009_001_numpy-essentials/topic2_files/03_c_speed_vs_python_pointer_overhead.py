"""
================================================================================
Topic 2 - Script 03: Why ndarrays Outperform Python Lists (Pointer Chasing vs SIMD)
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Python List architecture: Array of 8-byte PyObject pointers scattered across heap
- ndarray architecture: Single contiguous C-style memory block
- CPU L1/L2 cache prefetching & SIMD vectorization benefits
================================================================================
"""

import sys
import numpy as np

def explain_memory_difference():
    print("=" * 65)
    print("MEMORY OVERHEAD: Python List vs NumPy ndarray")
    print("=" * 65)

    n = 1000
    py_list = list(range(n))
    np_arr_64 = np.arange(n, dtype=np.int64)
    np_arr_32 = np.arange(n, dtype=np.int32)
    np_arr_8 = np.arange(n, dtype=np.int8)

    # In Python, each integer object itself takes 28 bytes on 64-bit CPython,
    # plus 8 bytes per pointer in the list = ~36 bytes per integer!
    py_elem_size = sys.getsizeof(py_list[0])
    py_list_pointer_overhead = sys.getsizeof(py_list)
    total_py_mem = py_list_pointer_overhead + sum(sys.getsizeof(x) for x in py_list)

    print(f"Elements: {n:,}")
    print("-" * 65)
    print(f"Python List (Pointers + PyObjects) : ~{total_py_mem:,} bytes (~{total_py_mem/1024:.1f} KB)")
    print(f"NumPy ndarray (int64 - 8 bytes/item): {np_arr_64.nbytes:,} bytes ({np_arr_64.nbytes/1024:.1f} KB)")
    print(f"NumPy ndarray (int32 - 4 bytes/item): {np_arr_32.nbytes:,} bytes ({np_arr_32.nbytes/1024:.1f} KB)")
    print(f"NumPy ndarray (int8  - 1 byte/item) : {np_arr_8.nbytes:,} bytes  ({np_arr_8.nbytes/1024:.2f} KB)")
    print("-" * 65)
    print("Conclusion: ndarray uses up to 36x less RAM and loads directly into CPU L1 cache!")

if __name__ == "__main__":
    explain_memory_difference()
