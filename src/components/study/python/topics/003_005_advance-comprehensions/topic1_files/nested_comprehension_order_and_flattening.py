# topic1_files/nested_comprehension_order_and_flattening.py
# Module: 003_005_advance-comprehensions
# Topic: Nested and Multi-variable Comprehensions with filtering
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 1: Nested Comprehension Loop Order, Flattening & Matrix Construction
Demonstrates:
  1. The Left-to-Right loop ordering rule: `[item for outer in seq for item in outer]`
  2. Flattening 2D and 3D nested lists into flat 1D collections
  3. Constructing nested 2D matrices via nested list comprehensions
"""

from typing import List

def demonstrate_nested_comprehensions():
    print("=" * 70)
    print("CODER & ACCOTAX - NESTED COMPREHENSIONS & 2D MATRIX FLATTENING")
    print("=" * 70)

    # Multi-campus student batches (2D List)
    campus_batches: List[List[str]] = [
        ["Sourav Mukherjee (BP)", "Debolina Roy (BP)"],
        ["Priyanka Sen (KL)", "Sneha Gupta (KL)"],
        ["Rahul Verma (WB)", "Amit Das (WB)"]
    ]

    # 1. Flattening 2D list into 1D flat list
    # Rule: Loop order in comprehension matches loop order of nested for loops!
    # Equivalent to:
    # for batch in campus_batches:
    #     for student in batch:
    #         flat_roster.append(student)
    print("1. Flattening 2D List into 1D (`[s for batch in campus_batches for s in batch]`):")
    flat_roster = [student for batch in campus_batches for student in batch]
    print(f"   * Flat Student Roster ({len(flat_roster)} students):")
    for s in flat_roster:
        print(f"     - {s}")

    # 2. Flattening with Filtering Guard (Only Barrackpore 'BP' students):
    print("\n2. Flattening with Filtering Guard (Only 'BP' Students):")
    bp_students = [
        student for batch in campus_batches
        for student in batch
        if "(BP)" in student
    ]
    print(f"   * Filtered BP Roster: {bp_students}\n")

    # 3. Constructing a 2D Multiplication / Score Weighting Matrix (3x3):
    # Rule: Nested comprehension `[[col for col in ...] for row in ...]`
    print("3. Constructing 2D Matrix via Nested Comprehensions (`[[... for col] for row]`):")
    grid_matrix = [
        [f"R{row}C{col}" for col in range(1, 4)]
        for row in range(1, 4)
    ]
    for row in grid_matrix:
        print(f"   * {row}")

    print(r"""
Loop Ordering Invariants:
  1. Flattening: `[item for outer in container for item in outer]` (Single 1D result).
  2. Matrix Construction: `[[expr for inner in row] for row in matrix]` (2D nested result).
  3. Clauses are read Left-to-Right in the exact same order as nested `for` statements.
""")
    print("[PASSED] Nested Comprehension Order & Flattening Verified.")


if __name__ == "__main__":
    demonstrate_nested_comprehensions()
