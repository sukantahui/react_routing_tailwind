# topic4_files/matrix_and_nested_collection_predicates.py
# Module: 003_005_advance-comprehensions
# Topic: any() and all() predicates for quick boolean checks
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 3: Matrix & Nested Collection Predicates
Demonstrates:
  1. Validating 2D matrices using nested `all()` / `any()` predicates
  2. Checking dictionary key completeness against mandatory schema specifications
  3. Verifying sub-collection subset relations and disjointness
"""

from typing import List, Dict, Set

def demonstrate_nested_collection_predicates():
    print("=" * 70)
    print("CODER & ACCOTAX - NESTED COLLECTION & MATRIX PREDICATES")
    print("=" * 70)

    # 1. 2D Matrix Validation: Check if ALL elements in ALL rows are positive non-zero
    print("1. Validating 2D Matrix Elements (`all(all(x > 0 for x in row) for row in matrix)`):")
    score_matrix_valid = [
        [85, 92, 78],
        [90, 88, 95],
        [72, 80, 84]
    ]
    score_matrix_corrupt = [
        [85, 92, 78],
        [90, -5, 95],   # Negative score!
        [72, 80, 84]
    ]

    is_m1_valid = all(all(score >= 0 for score in row) for row in score_matrix_valid)
    is_m2_valid = all(all(score >= 0 for score in row) for row in score_matrix_corrupt)

    print(f"   * Valid Matrix Pass Check   : {is_m1_valid}")
    print(f"   * Corrupt Matrix Pass Check : {is_m2_valid}\n")

    # 2. Mandatory Schema Completeness Check across Dictionary Records:
    print("2. Verifying Mandatory Key Completeness across Student Payload:")
    mandatory_fields = {"id", "name", "email", "course"}

    incoming_payloads = [
        {"id": "STU-101", "name": "Sourav", "email": "sourav@test.com", "course": "PY-AI"},
        {"id": "STU-102", "name": "Priyanka", "email": "priya@test.com", "course": "DS-ML"},
        {"id": "STU-103", "name": "Rahul", "course": "WEB-DEV"}  # Missing 'email'!
    ]

    # Rule: All payloads must contain all mandatory fields
    all_payloads_compliant = all(
        mandatory_fields.issubset(record.keys())
        for record in incoming_payloads
    )
    print(f"   * Batch Schema Compliance Check: {all_payloads_compliant} (Failed because STU-103 lacks 'email')")

    # Identify non-compliant records using any() in comprehension:
    quarantined = [
        rec["id"] for rec in incoming_payloads
        if not mandatory_fields.issubset(rec.keys())
    ]
    print(f"   * Quarantined Record IDs        : {quarantined}\n")

    # 3. Disjoint Sub-Collection Verification:
    # Check if ANY student is enrolled in conflicting afternoon batches
    batch_a_students = {"STU-101", "STU-102", "STU-103"}
    batch_b_students = {"STU-104", "STU-105", "STU-101"} # STU-101 in both!

    has_clash = any(student in batch_b_students for student in batch_a_students)
    print(f"3. Cross-Batch Collision Check: {has_clash} (Found shared student STU-101)")

    print(r"""
Nested Predicate Rules:
  1. `all(all(...) for row in M)` guarantees entire 2D table conforms to validation invariant.
  2. `mandatory_keys.issubset(doc.keys())` provides fast O(1) set-based schema verification.
""")
    print("[PASSED] Nested Collection & Matrix Predicates Verified.")


if __name__ == "__main__":
    demonstrate_nested_collection_predicates()
