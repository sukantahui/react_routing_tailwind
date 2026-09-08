"""
================================================================================
Topic 2 - Script 02: Deep Dive into Core ndarray Attributes
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- .ndim    : Number of array dimensions (axes)
- .shape   : Tuple of integers indicating size along each axis
- .size    : Total count of elements across all axes
- .dtype   : Internal data representation
- .itemsize: Bytes per single element
- .nbytes  : Total memory consumed by array buffer (size * itemsize)
================================================================================
"""

import numpy as np

def inspect_ndarray_attributes():
    print("=" * 65)
    print("ATTRIBUTE INSPECTION ACROSS 1D, 2D, AND 3D TENSORS")
    print("=" * 65)

    # 1D Vector (e.g. Student test scores)
    vec = np.array([85.5, 92.0, 78.0, 95.5], dtype=np.float64)
    
    # 2D Matrix (e.g. 3 Students with 4 exam subjects)
    mat = np.array([
        [80, 85, 90, 75],
        [70, 75, 80, 85],
        [95, 90, 92, 88]
    ], dtype=np.int64)
    
    # 3D Tensor (e.g. 2 Batches of 3 Students across 4 Exams)
    tensor = np.ones((2, 3, 4), dtype=np.float32)

    arrays = [("1D Vector", vec), ("2D Matrix", mat), ("3D Tensor", tensor)]
    
    for name, a in arrays:
        print(f"\n--- {name} ---")
        print(f"  Shape (.shape)       : {a.shape}")
        print(f"  Dimensions (.ndim)   : {a.ndim}")
        print(f"  Element Count (.size): {a.size}")
        print(f"  Data Type (.dtype)   : {a.dtype}")
        print(f"  Item Size (.itemsize): {a.itemsize} bytes")
        print(f"  Total Bytes (.nbytes): {a.nbytes} bytes")

if __name__ == "__main__":
    inspect_ndarray_attributes()
