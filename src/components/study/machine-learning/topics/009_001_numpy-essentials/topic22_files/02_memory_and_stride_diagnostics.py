"""
02_memory_and_stride_diagnostics.py
===================================
Topic: Memory Strides, Array Flags, and Base Pointer Diagnostics
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("NUMPY MEMORY & STRIDE DIAGNOSTICS")
    print("=" * 70)

    # 1. Base Array
    a = np.arange(12, dtype=np.int32).reshape(3, 4)
    print("Base Array (3x4 int32):\n", a)
    print(f"  Shape   : {a.shape}")
    print(f"  Itemsize: {a.itemsize} bytes per int32")
    print(f"  Strides : {a.strides} (16 bytes per row step, 4 bytes per col step)")
    print(f"  Base ptr: {a.base} (Shares memory with the 1D arange)")

    # 2. Transposition changes Strides without copying data
    a_T = a.T  # Shape: (4, 3)
    print("\nTransposed Array a.T (4x3):")
    print(f"  Shape   : {a_T.shape}")
    print(f"  Strides : {a_T.strides} (4 bytes per row step, 16 bytes per col step)")
    print(f"  Flags   :\n    C_CONTIGUOUS: {a_T.flags.c_contiguous}\n    F_CONTIGUOUS: {a_T.flags.f_contiguous}")

    # 3. Flatten vs Ravel
    # ravel returns a view when possible; flatten always allocates a copy
    r = a.ravel()
    f = a.flatten()
    print("\nFlatten vs Ravel:")
    print(f"  a.ravel().base is a.base : {r.base is a.base} (Shared Memory View)")
    print(f"  a.flatten().base is None : {f.base is None} (Independent Allocated Copy)")

if __name__ == "__main__":
    main()
