# 01_scalar_and_row_broadcasting.py
# NumPy Essentials — Topic 11: Broadcasting Concept (Part 1)
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
DESCRIPTION:
Demonstrates basic scalar-to-array broadcasting and 1D row vector broadcasting
across a 2D matrix:
  - Adding a scalar to a 1D vector (shape () to (4,))
  - Adding a 1D row vector of bonus marks (shape (4,)) across all rows of
    a 2D marks matrix (shape (3, 4))
  - Shape padding: (4,) automatically prepends 1 to become (1, 4)
"""

import numpy as np

print("=" * 68)
print("  PART 1: Scalar & 1D Row Vector Broadcasting")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 68)

# 1. Scalar to Array Broadcasting
scores_1d = np.array([75, 82, 90, 68])
print(f"\n[1] Original 1D Scores (shape {scores_1d.shape}): {scores_1d}")

# Scalar 5 is treated as shape () and broadcast to all 4 elements
scores_with_grace = scores_1d + 5
print(f"    scores_1d + 5 (Grace Marks): {scores_with_grace}")

# 2. 2D Matrix (3, 4) + 1D Row Vector (4,)
# 3 students (Debangshu, Susmita, Swadeep) x 4 subject marks
marks_3x4 = np.array([
    [70, 80, 85, 90],
    [65, 75, 80, 85],
    [88, 92, 95, 90]
])

# Subject bonus marks: [5, 2, 0, 1] (shape (4,))
bonus_row = np.array([5, 2, 0, 1])

print(f"\n[2] Base Student Marks Matrix (shape {marks_3x4.shape}):\n{marks_3x4}")
print(f"    Bonus Marks Row Vector (shape {bonus_row.shape}): {bonus_row}")

# Broadcasting Rule: (4,) -> prepended to (1, 4) -> stretched to (3, 4)
total_marks = marks_3x4 + bonus_row
print(f"\n    Resulting Marks (marks_3x4 + bonus_row, shape {total_marks.shape}):\n{total_marks}")
print("    -> Notice how [5, 2, 0, 1] was added to every single student row!")
