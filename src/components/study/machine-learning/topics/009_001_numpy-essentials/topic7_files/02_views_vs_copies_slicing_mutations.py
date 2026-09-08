"""
================================================================================
Topic 7 - Script 02: Slicing Views vs Copies & In-Place Mutation Trap
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Fundamental NumPy Rule: Basic Slicing ALWAYS returns a VIEW, never a copy
- How mutating a slice modifies the underlying master dataset
- Verifying memory sharing with arr.base
- Using .copy() for defensive isolation in preprocessing pipelines
================================================================================
"""

import numpy as np

def demonstrate_slice_views():
    print("=" * 65)
    print("DEMO: The Slice View In-Place Mutation Trap")
    print("=" * 65)

    dataset = np.array([
        [10, 20, 30],
        [40, 50, 60],
        [70, 80, 90]
    ])
    print("Original Dataset:\n", dataset)

    # Extract a 2x2 slice (Top Left corner)
    sub_view = dataset[0:2, 0:2]
    print("\nExtracted Slice sub_view = dataset[0:2, 0:2]:\n", sub_view)
    print("sub_view.base is dataset:", sub_view.base is dataset, "(Exact memory shared!)")

    # Modifying the slice
    print("\n--- Performing sub_view[:] = 0 ---")
    sub_view[:] = 0
    print("Modified sub_view:\n", sub_view)
    print("Original Master Dataset is now:\n", dataset, "<- MASTER DATA CORRUPTED!")

    print("\n" + "=" * 65)
    print("DEFENSIVE SOLUTION: Always call .copy() when isolating features")
    print("=" * 65)
    safe_data = np.array([[10, 20], [30, 40]])
    safe_slice = safe_data[0:2, 0:1].copy()
    safe_slice[:] = 999

    print("Safe Slice:\n", safe_slice)
    print("Safe Data (Unchanged):\n", safe_data)

if __name__ == "__main__":
    demonstrate_slice_views()
