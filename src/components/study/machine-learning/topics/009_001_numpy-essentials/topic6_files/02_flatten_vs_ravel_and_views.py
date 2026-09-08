"""
================================================================================
Topic 6 - Script 02: flatten() vs ravel() - Memory Allocation and Zero-Copy Views
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- .flatten(): Always allocates a new independent 1D array in RAM
- .ravel(): Returns a zero-copy 1D View whenever memory layout permits
- Base pointer inspection (.base) to verify memory sharing
- Mutation side-effects and performance benchmarking
================================================================================
"""

import numpy as np

def compare_flatten_and_ravel():
    print("=" * 65)
    print("MEMORY VIEW vs NEW COPY: ravel() vs flatten()")
    print("=" * 65)

    original = np.array([[10, 20, 30], [40, 50, 60]])
    print("Original 2D Array:\n", original)

    # Calling .ravel() vs .flatten()
    view_1d = original.ravel()
    copy_1d = original.flatten()

    print("\nMemory Base Inspection:")
    print("view_1d.base is original :", view_1d.base is original, "(Shares memory buffer!)")
    print("copy_1d.base is None     :", copy_1d.base is None, "(Allocated independent memory!)")

    # Mutate the view
    print("\n--- Mutating view_1d[0] = 999 ---")
    view_1d[0] = 999
    print("Original array [0,0] is now:", original[0, 0], "<- MUTATED IN-PLACE!")

    # Mutate the flatten copy
    print("\n--- Mutating copy_1d[1] = 888 ---")
    copy_1d[1] = 888
    print("Original array [0,1] is still:", original[0, 1], "<- UNCHANGED (Safe copy)")

    print("\n[PERFORMANCE TAKEAWAY]:")
    print("Use .ravel() for high-performance zero-copy pipelines when you won't mutate data.")
    print("Use .flatten() or .ravel().copy() when you need a defensive independent copy.")

if __name__ == "__main__":
    compare_flatten_and_ravel()
