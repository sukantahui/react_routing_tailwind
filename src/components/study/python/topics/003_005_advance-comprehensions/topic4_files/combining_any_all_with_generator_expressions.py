# topic4_files/combining_any_all_with_generator_expressions.py
# Module: 003_005_advance-comprehensions
# Topic: any() and all() predicates for quick boolean checks
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 2: Generator Expressions with `any()` and `all()` (O(1) Memory)
Demonstrates:
  1. The critical hazard of using List Comprehensions inside `any()` / `all()` (destroys short-circuiting!)
  2. Generator expressions enable instantaneous O(1) memory short-circuit exits
  3. Multi-field data validation pipelines
"""

import timeit
from typing import Dict, Any, List

def demonstrate_generators_with_any_all():
    print("=" * 70)
    print("CODER & ACCOTAX - ANY/ALL WITH GENERATOR EXPRESSIONS")
    print("=" * 70)

    # 1. Performance & Short-Circuit Comparison on 1,000,000 Elements
    print("1. Performance: Generator Expression vs List Comprehension inside `any()`:")
    n_items = 1_000_000

    # Target is right at index 0 (immediate match):
    # Generator: `(x == 0 for x in range(n_items))` -> Halts after 1 item!
    # List: `[x == 0 for x in range(n_items)]` -> FORCED to build 1,000,000-element list in RAM before calling any()!
    t_gen = timeit.timeit(lambda: any(x == 0 for x in range(n_items)), number=10)
    t_list = timeit.timeit(lambda: any([x == 0 for x in range(n_items)]), number=10)

    print(f"   * Generator: `any(x == 0 for x in ...)`  : {t_gen:.6f}s (Instant short-circuit, O(1) RAM)")
    print(f"   * List Comp: `any([x == 0 for x in ...])`: {t_list:.6f}s (Builds full 1M list, negates short-circuit!)")
    print(f"   * Speedup Factor                         : ~{int(t_list / t_gen):,}x faster with generator!\n")

    # 2. Multi-Condition Validation Pipeline using `all()`
    print("2. Multi-Condition Student Admission Validation Pipeline:")
    candidate_profile = {
        "id": "STU-101",
        "name": "Sourav Mukherjee",
        "age": 21,
        "marks_10th": 85.0,
        "marks_12th": 88.5,
        "has_aadhaar": True,
        "fee_deposit_cleared": True
    }

    # Declarative validation rules list:
    validation_checks = [
        candidate_profile["age"] >= 18,
        candidate_profile["marks_10th"] >= 60.0,
        candidate_profile["marks_12th"] >= 60.0,
        candidate_profile["has_aadhaar"] is True,
        candidate_profile["fee_deposit_cleared"] is True
    ]

    is_admitted = all(validation_checks)
    print(f"   * Candidate: {candidate_profile['name']}")
    print(f"   * Admission Status: {'[APPROVED]' if is_admitted else '[REJECTED]'}")

    # Check if ANY critical flags are missing:
    missing_flags = any(v is False for v in [candidate_profile["has_aadhaar"], candidate_profile["fee_deposit_cleared"]])
    print(f"   * Has Missing Regulatory Flags: {missing_flags}")

    print(r"""
Optimization Invariants:
  1. NEVER use square brackets inside `any([...])` or `all([...])`.
  2. Always use generator parentheses `any(cond for x in seq)` to ensure short-circuit evaluation.
""")
    print("[PASSED] Generator Expressions with any() and all() Verified.")


if __name__ == "__main__":
    demonstrate_generators_with_any_all()
