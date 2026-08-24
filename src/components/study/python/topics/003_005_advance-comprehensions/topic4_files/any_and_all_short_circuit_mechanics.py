# topic4_files/any_and_all_short_circuit_mechanics.py
# Module: 003_005_advance-comprehensions
# Topic: any() and all() predicates for quick boolean checks
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 1: `any()` and `all()` Short-Circuit Mechanics & Truthiness Rules
Demonstrates:
  1. Fundamental truth tables for `any(iterable)` and `all(iterable)`
  2. Short-circuit evaluation: halting immediately on first decisive boolean value
  3. The Vacuous Truth rule on empty sequences: `all([]) is True` and `any([]) is False`
"""

def demonstrate_any_all_mechanics():
    print("=" * 70)
    print("CODER & ACCOTAX - ANY() AND ALL() SHORT-CIRCUIT MECHANICS")
    print("=" * 70)

    # 1. Fundamental any() and all() Truth Tables:
    bool_list_1 = [True, True, True]
    bool_list_2 = [True, False, True]
    bool_list_3 = [False, False, False]

    print("1. Truth Table Comparison:")
    print(f"   * [True, True, True]   -> all(): {all(bool_list_1):<5} | any(): {any(bool_list_1)}")
    print(f"   * [True, False, True]  -> all(): {all(bool_list_2):<5} | any(): {any(bool_list_2)}")
    print(f"   * [False, False, False]-> all(): {all(bool_list_3):<5} | any(): {any(bool_list_3)}\n")

    # 2. Short-Circuit Evaluation Demonstration:
    # Generator logging to prove execution halts early
    print("2. Short-Circuiting Proof (Execution Halts on First Decisive Item):")
    eval_log = []

    def check_score(score: int, name: str) -> bool:
        eval_log.append(f"Tested {name} ({score})")
        return score >= 90

    candidates = [
        {"name": "Sourav", "score": 95},   # True (score >= 90) -> any() short-circuits here!
        {"name": "Priyanka", "score": 88},
        {"name": "Debolina", "score": 96}
    ]

    eval_log.clear()
    has_honors = any(check_score(c["score"], c["name"]) for c in candidates)
    print(f"   * any() result: {has_honors}")
    print(f"   * any() Short-circuit trace: {eval_log} (Only 1 item tested, rest skipped!)\n")

    eval_log.clear()
    all_honors = all(check_score(c["score"], c["name"]) for c in candidates)
    print(f"   * all() result: {all_honors}")
    print(f"   * all() Short-circuit trace: {eval_log} (Halts immediately on Priyanka at index 1!)\n")

    # 3. Vacuous Truth on Empty Sequences:
    print("3. Empty Collection Truthiness Invariant (Vacuous Truth):")
    empty_list = []
    print(f"   * all([]) == {all(empty_list)} (Vacuous Truth: all elements in empty set trivially satisfy condition)")
    print(f"   * any([]) == {any(empty_list)} (False: no element exists to satisfy condition)")

    print(r"""
Short-Circuit Invariants:
  1. `any()` halts immediately on the first `True` value.
  2. `all()` halts immediately on the first `False` value.
  3. `all([])` is ALWAYS `True`! Check `if seq and all(...)` if empty lists must fail validation.
""")
    print("[PASSED] any() and all() Mechanics Verified.")


if __name__ == "__main__":
    demonstrate_any_all_mechanics()
