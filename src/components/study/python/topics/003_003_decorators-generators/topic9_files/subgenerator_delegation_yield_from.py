# topic9_files/subgenerator_delegation_yield_from.py
# Module: 003_003_decorators-generators
# Topic: Generator functions vs regular functions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 2: Sub-Generator Delegation with `yield from` (PEP 380)
Demonstrates:
  1. Delegating iteration to sub-generators using `yield from`
  2. Replacing nested `for item in sub: yield item` loops cleanly
  3. Capturing sub-generator return values: `summary = yield from sub_generator()`
"""

from typing import Generator, List, Dict, Any

def branch_batch_stream(branch_name: str, students: List[str]) -> Generator[str, None, int]:
    """Sub-generator that yields students for a branch and returns total count."""
    count = 0
    for s in students:
        yield f"[{branch_name}] {s}"
        count += 1
    return count  # Subgenerator return value!


def consolidated_institution_pipeline() -> Generator[str, None, Dict[str, int]]:
    """Delegator generator using `yield from` to chain subgenerators seamlessly."""
    print("  [DELEGATOR] Starting Barrackpore Cohort Stream...")
    barrackpore_students = ["Sourav Mukherjee", "Priyanka Sen"]
    # 1. yield from delegates directly to sub-generator and captures its return value:
    bp_count = yield from branch_batch_stream("Barrackpore Campus", barrackpore_students)

    print(f"  [DELEGATOR] Barrackpore Stream Finished (Processed {bp_count} students).")

    print("  [DELEGATOR] Starting Kolkata Cohort Stream...")
    kolkata_students = ["Rahul Verma", "Debolina Roy"]
    kol_count = yield from branch_batch_stream("Kolkata Campus", kolkata_students)

    print(f"  [DELEGATOR] Kolkata Stream Finished (Processed {kol_count} students).")

    # Master pipeline return summary:
    return {
        "barrackpore_total": bp_count,
        "kolkata_total": kol_count,
        "grand_total": bp_count + kol_count
    }


def demonstrate_yield_from():
    print("=" * 70)
    print("CODER & ACCOTAX - `yield from` SUB-GENERATOR DELEGATION")
    print("=" * 70)

    pipeline = consolidated_institution_pipeline()

    # Consuming the delegated pipeline manually to capture the master return value:
    while True:
        try:
            student_entry = next(pipeline)
            print(f"   * Received Student: {student_entry}")
        except StopIteration as exc:
            summary = exc.value
            print("\n2. Master Delegator Return Value (`StopIteration.value`):")
            print(f"   * Barrackpore Total : {summary['barrackpore_total']}")
            print(f"   * Kolkata Total     : {summary['kolkata_total']}")
            print(f"   * Grand Total       : {summary['grand_total']}")
            break

    print(r"""
The `yield from` Superpowers:
  1. Transparent Data Pipeline: Emits items from subgenerator directly to caller.
  2. Automatic Return Capture: `val = yield from subgen()` assigns subgen's return value.
  3. Bidirectional Exception & Signal Passing: Routes `send()`, `throw()`, and `close()`.
""")
    print("[PASSED] Subgenerator Delegation with yield from Verified.")


if __name__ == "__main__":
    demonstrate_yield_from()
