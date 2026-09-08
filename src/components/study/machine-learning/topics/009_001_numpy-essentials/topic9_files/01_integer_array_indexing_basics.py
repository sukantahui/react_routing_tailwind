"""
================================================================================
Topic 9 - Script 01: Integer Array (Fancy) Indexing Basics & Copy Proof
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Passing arrays/lists of integer indices: arr[[idx1, idx2, idx3]]
- Arbitrary ordering, repetitions, and negative index wrapping
- Golden NumPy Rule: Fancy Indexing ALWAYS creates a COPY (never a view)
- Verifying memory independence via arr.base is None
================================================================================
"""

import numpy as np

def demonstrate_fancy_basics():
    print("=" * 65)
    print("1. 1D INTEGER ARRAY INDEXING")
    print("=" * 65)

    arr = np.array([10, 20, 30, 40, 50, 60, 70, 80])
    print("Original Vector:", arr)

    # Select specific indices in arbitrary order
    indices = [0, 4, 2, 7]
    selected = arr[indices]
    print(f"arr[{indices}] ->", selected)

    # Duplicated indices
    dup_indices = [1, 1, 3, 3]
    print(f"arr[{dup_indices}] ->", arr[dup_indices])

    print("\n" + "=" * 65)
    print("2. PROOF THAT FANCY INDEXING CREATES A NEW COPY (NOT A VIEW)")
    print("=" * 65)

    extracted_copy = arr[[0, 1, 2]]
    print("extracted_copy.base is None:", extracted_copy.base is None, "(Allocated independent RAM!)")

    # Mutating extracted copy
    extracted_copy[0] = 9999
    print("Mutated copy      :", extracted_copy)
    print("Original Vector   :", arr, " (Safe & Unaltered!)")

if __name__ == "__main__":
    demonstrate_fancy_basics()
