"""
================================================================================
Topic 2 - Script 01: ndarray Memory Layout, Pointers, and Byte Strides
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- The internal structure of ndarray: Data Buffer + Metadata Header
- Memory address inspection via .ctypes.data
- Stride mechanics (bytes to step along each dimension)
- Row-major (C-order) vs Column-major (Fortran-order) layout
================================================================================
"""

import numpy as np

def demonstrate_memory_and_strides():
    print("=" * 65)
    print("DEMO 1: Inspecting Continuous Memory Buffer & Address")
    print("=" * 65)
    
    # 2D Matrix of 32-bit integers (4 bytes each)
    arr = np.array([
        [10, 20, 30, 40],
        [50, 60, 70, 80],
        [90, 100, 110, 120]
    ], dtype=np.int32)

    print("Array:\n", arr)
    print("Data type (dtype) :", arr.dtype)
    print("Shape             :", arr.shape)
    print("Item size (bytes) :", arr.itemsize, "bytes per integer")
    print("Total array bytes :", arr.nbytes, "bytes")
    print("Memory address    :", hex(arr.ctypes.data))
    print("Strides           :", arr.strides)
    print(f"Explanation: To move 1 row down requires {arr.strides[0]} bytes (4 elements * 4 bytes).")
    print(f"             To move 1 column right requires {arr.strides[1]} bytes (1 element * 4 bytes).")

    print("\n" + "=" * 65)
    print("DEMO 2: Memory Flags & Contiguity")
    print("=" * 65)
    print("C_CONTIGUOUS (Row-major) :", arr.flags['C_CONTIGUOUS'])
    print("F_CONTIGUOUS (Col-major) :", arr.flags['F_CONTIGUOUS'])
    print("OWNDATA                  :", arr.flags['OWNDATA'])

if __name__ == "__main__":
    demonstrate_memory_and_strides()
