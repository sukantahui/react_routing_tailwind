# topic0_files/conditional_expressions_in_comprehensions.py
# Module: 003_005_advance-comprehensions
# Topic: Deep Dive: List, Dict, and Set Comprehensions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 2: Filtering `if` vs Ternary `if-else` in Comprehensions
Demonstrates:
  1. The crucial distinction between filtering (`if` at the end) and transformation (`if-else` ternary at the start)
  2. Synthesizing both: `[A if condition else B for x in seq if filter_guard]`
  3. Common syntax pitfalls and readability rules
"""

def demonstrate_conditional_comprehensions():
    print("=" * 70)
    print("CODER & ACCOTAX - FILTERING IF VS TERNARY IF-ELSE MECHANICS")
    print("=" * 70)

    exam_scores = [95, 42, 88, 33, 76, 91, 55, 28, 84]

    # 1. Filtering `if` (At the END): Selects a subset of elements
    print("1. Filtering `if` (At the END - Omits Non-Matching Elements):")
    passing_scores = [s for s in exam_scores if s >= 50]
    print(f"   * Passing Scores (>= 50): {passing_scores} (Length reduced from {len(exam_scores)} to {len(passing_scores)})\n")

    # 2. Ternary `if-else` (At the START): Transforms EVERY element (Length preserved)
    print("2. Ternary `if-else` (At the START - Evaluates Expression per Item):")
    grade_labels = ["PASS" if s >= 50 else "FAIL" for s in exam_scores]
    print(f"   * Grade Labels: {grade_labels} (Length preserved at {len(grade_labels)})\n")

    # 3. Combining Both: Filter THEN Transform
    print("3. Combined Filtering AND Ternary Transformation:")
    # Rule: For students who passed (s >= 50), label honors (>=90: "DISTINCTION", else: "STANDARD_PASS")
    annotated_passes = [
        f"{s} (DISTINCTION)" if s >= 90 else f"{s} (PASS)"
        for s in exam_scores
        if s >= 50  # Filter guard
    ]
    print(f"   * Annotated Passing Scores: {annotated_passes}\n")

    # 4. Dict Comprehension with Ternary Transformation:
    print("4. Dict Comprehension with Tiered Categorization:")
    student_records = {"Sourav": 95, "Priyanka": 88, "Rahul": 42, "Debolina": 91}
    tier_map = {
        name: ("PLATINUM" if score >= 90 else "GOLD" if score >= 75 else "STANDARD")
        for name, score in student_records.items()
    }
    print(f"   * Student Tier Map: {tier_map}")

    print(r"""
Conditional Syntax Rulebook:
  - FILTERING ONLY: `[x for x in seq if filter_condition]` (No 'else' allowed here!)
  - TRANSFORMATION ONLY: `[A if cond else B for x in seq]` ('else' is MANDATORY!)
  - COMBINED: `[A if cond else B for x in seq if filter_condition]`
""")
    print("[PASSED] Conditional Expressions in Comprehensions Verified.")


if __name__ == "__main__":
    demonstrate_conditional_comprehensions()
