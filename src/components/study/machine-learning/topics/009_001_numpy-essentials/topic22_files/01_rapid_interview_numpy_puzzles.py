"""
01_rapid_interview_numpy_puzzles.py
===================================
Topic: Rapid-Fire ML Interview Code Puzzles & Tricky Edge Cases
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
Target: Machine Learning & Python Foundations
"""

import numpy as np

def main():
    print("=" * 70)
    print("RAPID-FIRE NUMPY INTERVIEW CODE PUZZLES")
    print("=" * 70)

    # Puzzle 1: View vs Copy in Slicing vs Fancy Indexing
    print("1. PUZZLE: View vs Copy Mutation")
    arr = np.array([10, 20, 30, 40, 50])
    
    # Slicing creates a VIEW
    slice_view = arr[1:3]
    slice_view[0] = 999
    print("   After slice_view[0] = 999 -> Original arr:", arr)
    assert arr[1] == 999, "Slices share memory!"

    # Fancy Indexing creates a COPY
    arr = np.array([10, 20, 30, 40, 50])
    fancy_copy = arr[[1, 2]]
    fancy_copy[0] = 888
    print("   After fancy_copy[0] = 888 -> Original arr:", arr)
    assert arr[1] == 20, "Fancy indexing creates an independent copy!"

    # Puzzle 2: Comparing with NaN
    print("\n2. PUZZLE: NaN Identity & Masking")
    arr_with_nan = np.array([1.0, np.nan, 3.0])
    print("   np.nan == np.nan              :", np.nan == np.nan, "(IEEE 754 standard: False!)")
    print("   arr == np.nan (WRONG)         :", arr_with_nan == np.nan)
    print("   np.isnan(arr) (CORRECT)       :", np.isnan(arr_with_nan))
    print("   np.nanmean(arr)               :", np.nanmean(arr_with_nan), "(Ignores NaN)")

    # Puzzle 3: In-place += vs a = a + b
    print("\n3. PUZZLE: Memory Mutation via In-Place Operators")
    x = np.array([1, 2, 3])
    x_ref = x
    x += 5  # Mutates the existing buffer in-place
    print("   After x += 5 -> x_ref:", x_ref)
    assert x_ref[0] == 6

if __name__ == "__main__":
    main()
