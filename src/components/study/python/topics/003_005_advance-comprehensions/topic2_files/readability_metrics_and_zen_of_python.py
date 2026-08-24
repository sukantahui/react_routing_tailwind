# topic2_files/readability_metrics_and_zen_of_python.py
# Module: 003_005_advance-comprehensions
# Topic: Readability guidelines: When to use comprehensions vs loops
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 1: Readability Guidelines & The Zen of Python
Demonstrates:
  1. The Zen of Python rules: "Readability counts", "Flat is better than nested"
  2. The 2-Clause rule: when comprehensions excel vs when they become cryptic line noise
  3. The Side-Effect Anti-Pattern: why comprehensions should NEVER be used solely for side-effects
"""

from typing import List, Dict, Any

def demonstrate_readability_guidelines():
    print("=" * 70)
    print("CODER & ACCOTAX - COMPREHENSION READABILITY GUIDELINES")
    print("=" * 70)

    students = [
        {"name": "Sourav", "score": 95, "fees_pending": 0},
        {"name": "Priyanka", "score": 88, "fees_pending": 5000},
        {"name": "Rahul", "score": 42, "fees_pending": 0},
        {"name": "Debolina", "score": 96, "fees_pending": 0}
    ]

    # 1. EXCELLENT Comprehension (1 Loop + 1 Filter Guard): Clear, concise, idiomatic
    print("1. [GOOD] Clear, Idiomatic List Comprehension (High Readability):")
    honors_students = [s["name"] for s in students if s["score"] >= 90]
    print(f"   * Honors Students: {honors_students} (Zen: 'Simple is better than complex')\n")

    # 2. ANTI-PATTERN: Side-Effects in Comprehensions
    # DANGEROUS / BAD: [print(f"Audit: {s['name']}") for s in students]
    # Creates an unnecessary temporary list of [None, None, None, None] in RAM!
    print("2. [ANTI-PATTERN] Side-Effects in Comprehensions vs Clean Loop:")
    print("   * Bad Practice : [audit_log(s) for s in students] (Wastes RAM creating list of Nones)")
    print("   * Good Practice: for s in students: audit_log(s) (Clean procedural loop)\n")

    # Correct procedural loop for side-effects:
    print("   * Executing Clean Procedural Audit Loop:")
    for s in students:
        if s["fees_pending"] > 0:
            print(f"     [ALERT] Student {s['name']} has pending balance: INR {s['fees_pending']}")

    # 3. ANTI-PATTERN: Over-Complex Monster Comprehension
    # Cryptic, hard to debug, unmaintainable:
    print("\n3. [ANTI-PATTERN] Cryptic Monster Comprehensions (> 2 loops + nested ternary):")
    raw_matrix = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
    # Overly complex single line:
    cryptic = [val * 2 if val % 2 == 0 else val * 3 for layer in raw_matrix for row in layer for val in row if val > 2]
    print(f"   * Cryptic Result: {cryptic}")
    print("   * Zen Warning: 'If the implementation is hard to explain, it's a bad idea.'")

    print(r"""
Readability Threshold Invariants:
  1. Use Comprehensions when: Creating a new sequence via 1 loop and at most 1 simple filter.
  2. Use Procedural Loops when: Executing side-effects (I/O, logging, database writes),
     handling exceptions (try...except), or when logic exceeds 2 nested loop levels.
""")
    print("[PASSED] Readability Guidelines & Zen of Python Verified.")


if __name__ == "__main__":
    demonstrate_readability_guidelines()
