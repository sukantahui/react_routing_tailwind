"""
================================================================================
Topic 7 - Script 01: 1D and 2D Array Slicing Mechanics & Syntax
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Slice notation: arr[start:stop:step] (half-open interval [start, stop))
- 2D multi-axis slicing: arr[row_slice, col_slice]
- Why Python chained indexing arr[row][col] is slow and dangerous compared to arr[row, col]
- Negative step slicing for array reversal (arr[::-1])
================================================================================
"""

import numpy as np

def demonstrate_slicing_basics():
    print("=" * 65)
    print("1. 1D SLICING MECHANICS")
    print("=" * 65)

    arr = np.array([10, 20, 30, 40, 50, 60, 70, 80])
    print("Original Vector:", arr)
    print("arr[1:5]       :", arr[1:5], " (elements at index 1, 2, 3, 4)")
    print("arr[::2]       :", arr[::2], " (every 2nd element)")
    print("arr[::-1]      :", arr[::-1], " (reversed array)")

    print("\n" + "=" * 65)
    print("2. 2D MATRIX SLICING (STUDENT MARKS TABLE)")
    print("=" * 65)
    
    # 4 students (Debangshu, Susmita, Swadeep, Tuhina) x 3 exams (Math, Science, English)
    table = np.array([
        [85, 90, 88],  # Debangshu
        [92, 95, 91],  # Susmita
        [78, 82, 80],  # Swadeep
        [89, 91, 94]   # Tuhina
    ])
    print("Student Marks Table (4x3):\n", table)

    # Extract all exam marks for Susmita (Row index 1)
    susmita_marks = table[1, :]
    print("\ntable[1, :] (Susmita's row):", susmita_marks)

    # Extract Science scores for all students (Column index 1)
    science_col = table[:, 1]
    print("table[:, 1] (Science marks):", science_col)

    # Extract Top-2 students for First 2 subjects:
    top_sub = table[0:2, 0:2]
    print("\ntable[0:2, 0:2] Sub-matrix:\n", top_sub)

if __name__ == "__main__":
    demonstrate_slicing_basics()
