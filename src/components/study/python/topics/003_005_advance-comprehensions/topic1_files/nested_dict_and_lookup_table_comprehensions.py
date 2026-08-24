# topic1_files/nested_dict_and_lookup_table_comprehensions.py
# Module: 003_005_advance-comprehensions
# Topic: Nested and Multi-variable Comprehensions with filtering
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 3: Nested Dict Comprehensions & Composite Lookup Tables
Demonstrates:
  1. Constructing nested dictionary hierarchies using nested dict comprehensions
  2. Building composite multi-key indexing tables: `{(campus, course): [student_ids]}`
  3. Filtering nested dictionary values without mutating originals
"""

from typing import Dict, Any, List, Tuple

def demonstrate_nested_dict_comprehensions():
    print("=" * 70)
    print("CODER & ACCOTAX - NESTED DICT COMPREHENSIONS & COMPOSITE LOOKUPS")
    print("=" * 70)

    students = [
        {"id": "STU-101", "name": "Sourav", "dept": "AI", "campus": "BP", "score": 95},
        {"id": "STU-102", "name": "Priyanka", "dept": "DS", "campus": "KL", "score": 88},
        {"id": "STU-103", "name": "Debolina", "dept": "AI", "campus": "BP", "score": 96},
        {"id": "STU-104", "name": "Rahul", "dept": "WEB", "campus": "KL", "score": 78},
        {"id": "STU-105", "name": "Amit", "dept": "AI", "campus": "KL", "score": 91}
    ]

    # 1. Nested Dict Comprehension: {Dept -> {Student ID -> Score}}
    departments = sorted(list({s["dept"] for s in students}))
    nested_dept_scores: Dict[str, Dict[str, int]] = {
        dept: {
            s["id"]: s["score"]
            for s in students
            if s["dept"] == dept
        }
        for dept in departments
    }

    print("1. Nested Dict Comprehension `{dept: {id: score for s in students if s['dept'] == dept}}`:")
    for dept, score_map in nested_dept_scores.items():
        print(f"   * [{dept:<3}] -> {score_map}")

    # 2. Composite Key Lookup Index: {(Campus, Dept) -> List of Student Names}
    campuses = sorted(list({s["campus"] for s in students}))
    composite_index: Dict[Tuple[str, str], List[str]] = {
        (camp, dept): [
            s["name"] for s in students
            if s["campus"] == camp and s["dept"] == dept
        ]
        for camp in campuses
        for dept in departments
        if any(s["campus"] == camp and s["dept"] == dept for s in students)  # Filter empty slots
    }

    print("\n2. Composite Multi-Key Lookup Index `{(Campus, Dept): [students]}`:")
    for (camp, dept), roster in sorted(composite_index.items()):
        print(f"   * Campus: {camp} | Dept: {dept:<3} -> {roster}")

    print(r"""
Nested Dict Principles:
  1. Outer comprehension iterates categories; inner comprehension builds sub-dictionaries.
  2. Tuples `(key1, key2)` can serve as composite dictionary keys for multi-dimensional lookups.
""")
    print("\n[PASSED] Nested Dict & Lookup Table Comprehensions Verified.")


if __name__ == "__main__":
    demonstrate_nested_dict_comprehensions()
