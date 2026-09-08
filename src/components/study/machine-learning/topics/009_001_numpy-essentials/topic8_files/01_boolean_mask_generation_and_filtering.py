"""
================================================================================
Topic 8 - Script 01: Boolean Mask Generation & 1D/2D Filtering
================================================================================
Instructor: Sukanta Hui (Coder & AccoTax, Barrackpore)
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila

Key Concepts Covered:
- Creating boolean masks via relational operators (>, <, ==, !=, >=, <=)
- Passing boolean masks as indices: arr[mask]
- Fundamental rule: Boolean indexing collapses multidimensional arrays into a 1D copy
- Counting matching elements with np.sum(mask) or np.count_nonzero(mask)
================================================================================
"""

import numpy as np

def demonstrate_boolean_filtering():
    print("=" * 65)
    print("1. 1D BOOLEAN MASKING & ELEMENT FILTERING")
    print("=" * 65)

    scores = np.array([45, 88, 72, 35, 91, 58, 80])
    print("Original Scores:", scores)

    # Generate boolean mask for passing grades (>= 60)
    pass_mask = scores >= 60
    print("Pass Mask (scores >= 60):", pass_mask)
    print(f"Total Passing Students   : {np.sum(pass_mask)} out of {len(scores)}")

    # Apply mask
    passing_scores = scores[pass_mask]
    print("Filtered Passing Scores  :", passing_scores)

    print("\n" + "=" * 65)
    print("2. 2D MATRIX MASKING & 1D FLATTENING BEHAVIOR")
    print("=" * 65)
    
    # 3 students x 3 exam marks
    marks_matrix = np.array([
        [75, 82, 55],
        [92, 48, 89],
        [60, 78, 85]
    ])
    print("Marks Matrix (3x3):\n", marks_matrix)

    # Filter all exam scores >= 80 across the entire table
    high_score_mask = marks_matrix >= 80
    print("\nHigh Score Mask (>= 80):\n", high_score_mask)

    extracted_elements = marks_matrix[high_score_mask]
    print("\nResult of marks_matrix[marks_matrix >= 80]:")
    print(extracted_elements)
    print("Shape:", extracted_elements.shape, "<- Notice: Always collapses to 1D copy!")

if __name__ == "__main__":
    demonstrate_boolean_filtering()
