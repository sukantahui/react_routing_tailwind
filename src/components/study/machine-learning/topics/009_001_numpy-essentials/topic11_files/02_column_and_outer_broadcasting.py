# 02_column_and_outer_broadcasting.py
# NumPy Essentials — Topic 11: Broadcasting Concept (Part 2)
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
DESCRIPTION:
Demonstrates column vector broadcasting and outer grid product creation:
  - Adding a 2D Column Vector (shape (3, 1)) across a (3, 4) matrix
  - Adding a Column Vector (3, 1) and Row Vector (1, 4) to generate a
    full (3, 4) addition grid table (both vectors broadcast simultaneously)
"""

import numpy as np

print("=" * 68)
print("  PART 2: Column Vector & Outer Grid Broadcasting")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 68)

# 1. 2D Matrix (3, 4) + 2D Column Vector (3, 1)
marks_3x4 = np.array([
    [70, 80, 85, 90],
    [65, 75, 80, 85],
    [88, 92, 95, 90]
])

# Attendance bonus points per student (shape (3, 1))
attendance_bonus = np.array([[2], [5], [1]])

print(f"\n[1] Student Marks (shape {marks_3x4.shape}):\n{marks_3x4}")
print(f"    Student Attendance Bonus (shape {attendance_bonus.shape}):\n{attendance_bonus}")

# Broadcasts across all 4 subject columns
marks_updated = marks_3x4 + attendance_bonus
print(f"\n    Result (marks_3x4 + attendance_bonus, shape {marks_updated.shape}):\n{marks_updated}")
print("    -> Debangshu gets +2 to all 4 subjects, Susmita gets +5, Swadeep gets +1!")

# 2. Outer Addition Grid: (3, 1) + (1, 4) -> (3, 4)
col_vec = np.array([[10], [20], [30]]) # (3, 1)
row_vec = np.array([[1, 2, 3, 4]])     # (1, 4)

grid_sum = col_vec + row_vec
print(f"\n[2] Outer Addition Table: (3, 1) + (1, 4) ➔ (3, 4)")
print(f"    col_vec (3, 1):\n{col_vec}")
print(f"    row_vec (1, 4): {row_vec}")
print(f"    grid_sum:\n{grid_sum}")
