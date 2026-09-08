"""
================================================================================
Topic 5 - Script 01: Inspecting Shape, Dimensions (ndim), and Size
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- .shape: Tuple of dimension lengths
- .ndim : Rank / number of axes (len(shape))
- .size : Total elements (product of shape)
- .nbytes: Total memory bytes (size * itemsize)
================================================================================
"""

import numpy as np

def inspect_shapes_and_dimensions():
    print("=" * 65)
    print("INSPECTING TENSORS ACROSS RANKS 1, 2, 3, AND 4")
    print("=" * 65)

    # Rank 1: Feature vector (5 items)
    v1 = np.array([10, 20, 30, 40, 50], dtype=np.float32)
    
    # Rank 2: 3 students x 4 subjects
    m2 = np.array([
        [85, 90, 78, 92],
        [88, 76, 95, 89],
        [90, 92, 85, 94]
    ], dtype=np.int32)
    
    # Rank 3: 2 Batches of 3 Students x 4 Subjects
    t3 = np.zeros((2, 3, 4), dtype=np.float64)
    
    # Rank 4: 16 Images x 3 Channels x 64 Height x 64 Width
    t4 = np.zeros((16, 3, 64, 64), dtype=np.uint8)

    tensors = [("1D Vector", v1), ("2D Matrix", m2), ("3D Tensor", t3), ("4D Image Batch", t4)]

    for name, t in tensors:
        print(f"\n[{name}]")
        print(f"  Shape (.shape)      : {t.shape}")
        print(f"  Dimensions (.ndim)  : {t.ndim}")
        print(f"  Total Elements (.size): {t.size:,}")
        print(f"  Element Type (.dtype): {t.dtype}")
        print(f"  Memory Footprint    : {t.nbytes:,} bytes")

if __name__ == "__main__":
    inspect_shapes_and_dimensions()
