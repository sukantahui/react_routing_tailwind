"""
================================================================================
Topic 9 - Script 02: Paired Coordinates vs Rectangular Subgrids (np.ix_)
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- The Paired Coordinates Rule: arr[[r1, r2], [c1, c2]] extracts (r1, c1) and (r2, c2)
- Common beginner pitfall: expecting a 2x2 matrix instead of a 1D vector of pairs
- Using np.ix_(rows, cols) to properly extract rectangular sub-matrices
================================================================================
"""

import numpy as np

def demonstrate_paired_vs_mesh():
    print("=" * 65)
    print("1. THE PAIRED COORDINATES BEHAVIOR (ZIP MATCHING)")
    print("=" * 65)

    # 4x4 matrix
    matrix = np.array([
        [10, 11, 12, 13],
        [20, 21, 22, 23],
        [30, 31, 32, 33],
        [40, 41, 42, 43]
    ])
    print("Master Matrix (4x4):\n", matrix)

    # When passing two index arrays [0, 2] and [1, 3]:
    # NumPy pairs them as points: (row 0, col 1) -> 11, and (row 2, col 3) -> 33
    paired_result = matrix[[0, 2], [1, 3]]
    print("\nmatrix[[0, 2], [1, 3]]:", paired_result)
    print("Notice: Shape is (2,) because it extracted coordinates (0,1) and (2,3)!")

    print("\n" + "=" * 65)
    print("2. RECTANGULAR SUB-MATRIX EXTRACTION WITH np.ix_()")
    print("=" * 65)
    
    # What if Debangshu wants the full 2x2 sub-matrix at rows (0, 2) and cols (1, 3)?
    # We use np.ix_() to create an open 2D mesh!
    sub_matrix = matrix[np.ix_([0, 2], [1, 3])]
    print("matrix[np.ix_([0, 2], [1, 3])]:\n", sub_matrix)
    print("Shape:", sub_matrix.shape, "<- Proper 2x2 rectangular sub-matrix!")

if __name__ == "__main__":
    demonstrate_paired_vs_mesh()
