# topic1_files/cartesian_products_and_multi_variable_filtering.py
# Module: 003_005_advance-comprehensions
# Topic: Nested and Multi-variable Comprehensions with filtering
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 2: Cartesian Products, Tuple Unpacking & Matrix Transposition
Demonstrates:
  1. Generating Cartesian cross-products between independent collections
  2. Multi-variable tuple unpacking directly inside comprehension loop headers
  3. Transposing rectangular and square 2D matrices using nested list comprehensions
"""

from typing import List, Tuple

def demonstrate_cartesian_and_transposition():
    print("=" * 70)
    print("CODER & ACCOTAX - CARTESIAN PRODUCTS & MATRIX TRANSPOSITION")
    print("=" * 70)

    instructors = ["Sukanta Hui", "Prabhat Sen"]
    courses = ["Python Full-Stack", "AI Engineering", "Data Science"]
    campuses = ["Barrackpore", "Kolkata"]

    # 1. Cartesian Cross-Product: All possible Teaching Allocations
    # [Instructor x Course x Campus]
    print("1. 3-Way Cartesian Product `[(i, c, cmp) for i in ... for c in ... for cmp in ...]`: ")
    allocation_matrix = [
        {"instructor": inst, "course": crs, "campus": camp}
        for inst in instructors
        for crs in courses
        for camp in campuses
        if not (inst == "Prabhat Sen" and crs == "Python Full-Stack")  # Filter guard
    ]

    print(f"   * Total Generated Allocations ({len(allocation_matrix)} slots):")
    for alloc in allocation_matrix[:5]:
        print(f"     - {alloc['instructor']:<14} -> {alloc['course']:<18} @ {alloc['campus']}")

    # 2. Multi-Variable Tuple Unpacking in Comprehensions:
    print("\n2. Multi-Variable Tuple Unpacking `[(id, name, score) for ...]`: ")
    student_records: List[Tuple[str, str, int]] = [
        ("STU-101", "Sourav Mukherjee", 95),
        ("STU-102", "Priyanka Sen", 88),
        ("STU-103", "Debolina Roy", 96)
    ]

    # Unpack directly in comprehension loop variable:
    formatted_summaries = [
        f"[{sid}] {name.upper()}: Grade A (Score: {score})"
        for sid, name, score in student_records
        if score >= 90
    ]
    for summ in formatted_summaries:
        print(f"   * {summ}")

    # 3. 2D Matrix Transposition (Swapping rows and columns):
    print("\n3. Matrix Transposition via Nested Comprehension (`[[row[i] for row in M] for i in range(cols)]`):")
    # Original 3x2 Matrix (3 rows, 2 columns):
    # [ [10, 20],
    #   [30, 40],
    #   [50, 60] ]
    matrix_3x2 = [
        [10, 20],
        [30, 40],
        [50, 60]
    ]

    n_rows = len(matrix_3x2)
    n_cols = len(matrix_3x2[0])

    transposed_2x3 = [
        [matrix_3x2[row_idx][col_idx] for row_idx in range(n_rows)]
        for col_idx in range(n_cols)
    ]

    print("   * Original 3x2 Matrix:")
    for r in matrix_3x2:
        print(f"     {r}")

    print("   * Transposed 2x3 Matrix (Rows <-> Columns Swapped):")
    for r in transposed_2x3:
        print(f"     {r}")

    print("\n[PASSED] Cartesian Products & Matrix Transposition Verified.")


if __name__ == "__main__":
    demonstrate_cartesian_and_transposition()
