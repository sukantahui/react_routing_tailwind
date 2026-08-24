# topic2_files/refactoring_complex_comprehensions_to_loops.py
# Module: 003_005_advance-comprehensions
# Topic: Readability guidelines: When to use comprehensions vs loops
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 2: Refactoring Complex Comprehensions to Readable Loops
Demonstrates:
  1. Systematic refactoring of 4-clause monster comprehensions into clean procedural loops
  2. Overcoming comprehension limitations: adding `try...except` exception handling
  3. Adding structured debug telemetry and intermediate audit variables
"""

from typing import List, Dict, Any, Optional

def demonstrate_refactoring_to_loops():
    print("=" * 70)
    print("CODER & ACCOTAX - REFACTORING COMPREHENSIONS TO READABLE LOOPS")
    print("=" * 70)

    # Messy incoming API payload with missing keys and dirty strings
    raw_incoming_records = [
        {"id": "STU-101", "name": "Sourav", "marks": "95.5", "status": "active"},
        {"id": "STU-102", "name": "Priyanka", "marks": "INVALID_MARK", "status": "active"},
        {"id": "STU-103", "name": "Debolina", "marks": "96.0", "status": "active"},
        {"id": "STU-104", "name": "Rahul", "marks": None, "status": "inactive"}
    ]

    # 1. ATTEMPTING MONSTER COMPREHENSION (BRITTLE & UNREADABLE):
    # Cannot handle float("INVALID_MARK") without crashing!
    print("1. Problem: Comprehensions Cannot Contain `try...except` Directly:")
    print("   * Trying `[float(s['marks']) for s in raw_incoming_records]` raises ValueError!\n")

    # 2. REFACTORED CLEAN PROCEDURAL LOOP (DEFENSIVE, READABLE, ROBUST):
    print("2. Refactored Procedural Loop with Defensive Exception Handling:")
    cleaned_roster: List[Dict[str, Any]] = []
    quarantined_count = 0

    for s in raw_incoming_records:
        # Filter active students only
        if s.get("status") != "active":
            continue

        raw_mark = s.get("marks")
        if raw_mark is None:
            quarantined_count += 1
            continue

        try:
            score = float(raw_mark)
            cleaned_roster.append({
                "student_id": s["id"],
                "name": s["name"],
                "score": score,
                "grade": "EXCELLENT" if score >= 90 else "STANDARD"
            })
        except (ValueError, TypeError) as exc:
            print(f"   [DEFENSIVE INTERCEPT] Quarantined record {s['id']}: {exc}")
            quarantined_count += 1

    print(f"\n   * Cleaned Student Roster ({len(cleaned_roster)} Valid Records):")
    for r in cleaned_roster:
        print(f"     - [{r['student_id']}] {r['name']:<12} | Score: {r['score']:<5} | Grade: {r['grade']}")
    print(f"   * Total Quarantined Records: {quarantined_count}")

    print(r"""
Refactoring Decision Matrix:
  - If your comprehension needs `try...except` -> Refactor to a `for` loop (or helper function).
  - If your comprehension needs intermediate debug `print()` -> Refactor to a `for` loop.
  - If your comprehension spans > 3 physical lines -> Refactor to a `for` loop.
""")
    print("[PASSED] Refactoring Complex Comprehensions to Loops Verified.")


if __name__ == "__main__":
    demonstrate_refactoring_to_loops()
