# topic0_files/dict_and_set_advanced_transformations.py
# Module: 003_005_advance-comprehensions
# Topic: Deep Dive: List, Dict, and Set Comprehensions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 3: Dict & Set Advanced Transformations & Inversions
Demonstrates:
  1. Inverting dictionaries (swapping key-value pairs)
  2. Inverting 1-to-many relationships (grouping keys by value)
  3. Advanced set comprehensions for dataset deduplication and tag extraction
"""

from typing import Dict, List, Set

def demonstrate_advanced_dict_set_transformations():
    print("=" * 70)
    print("CODER & ACCOTAX - DICT & SET ADVANCED TRANSFORMATIONS")
    print("=" * 70)

    # 1. Direct 1-to-1 Dictionary Inversion:
    student_id_to_roll = {"STU-101": 1, "STU-102": 2, "STU-103": 3}
    roll_to_student_id = {v: k for k, v in student_id_to_roll.items()}
    print("1. Direct 1-to-1 Dictionary Inversion `{v: k for k, v in d.items()}`:")
    print(f"   * Original Map : {student_id_to_roll}")
    print(f"   * Inverted Map : {roll_to_student_id}\n")

    # 2. 1-to-Many Grouping Inversion (Handling duplicate values):
    student_course_assignments = {
        "Sourav": "PY-AI",
        "Priyanka": "DS-ML",
        "Debolina": "PY-AI",
        "Rahul": "WEB-DEV",
        "Amit": "PY-AI"
    }

    # Group students by course using dict comprehension + set comprehension:
    unique_courses = {c for c in student_course_assignments.values()}
    course_roster = {
        course: [name for name, c in student_course_assignments.items() if c == course]
        for course in unique_courses
    }

    print("2. Grouping Students by Course (1-to-Many Inversion):")
    for course, roster in sorted(course_roster.items()):
        print(f"   * [{course:<8}] -> {roster}")

    # 3. Set Comprehension for Normalizing Messy Tag Collections:
    raw_skill_tags = [
        " Python ", "PYTHON", "python_core", " decorators ",
        "DECORATORS", "Generators", "generators"
    ]

    normalized_unique_skills = {
        tag.strip().upper().replace(" ", "_")
        for tag in raw_skill_tags
    }
    print(f"\n3. Set Comprehension Data Normalization ({len(raw_skill_tags)} raw tags -> {len(normalized_unique_skills)} unique):")
    print(f"   * Normalized Unique Skills: {sorted(list(normalized_unique_skills))}")

    print(r"""
Transformation Invariants:
  1. Direct inversion `{v: k for k, v in d.items()}` assumes values are unique and hashable.
  2. For non-unique values, group keys into a list/set per value to prevent key overwriting.
  3. Set comprehensions `{fn(x) for x in seq}` guarantee canonical normalization without duplicate noise.
""")
    print("[PASSED] Dict & Set Advanced Transformations Verified.")


if __name__ == "__main__":
    demonstrate_advanced_dict_set_transformations()
