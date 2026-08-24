# topic8_files/generator_return_and_stopiteration_values.py
# Module: 003_003_decorators-generators
# Topic: Generators & the yield statement
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 3: Generator Return Values & `StopIteration.value`
Demonstrates:
  1. Using `return value` inside generator functions (Python 3.3+ PEP 380)
  2. How `return value` is encapsulated inside `StopIteration.value`
  3. Extracting metadata summaries upon generator completion
"""

from typing import Generator, Dict, Any

def audit_batch_admission_fees(students: list) -> Generator[Dict[str, Any], None, Dict[str, Any]]:
    """Yields processed fee records and returns an audit summary dictionary upon completion."""
    total_collected = 0.0
    processed_count = 0

    for s in students:
        fee = s["gross_fee"] * (1.0 - s.get("discount", 0.0))
        total_collected += fee
        processed_count += 1

        yield {
            "student_id": s["id"],
            "name": s["name"],
            "net_payable": fee
        }

    # Returning final settlement summary payload (Sets StopIteration.value!):
    return {
        "total_students": processed_count,
        "total_revenue": total_collected,
        "average_fee": total_collected / processed_count if processed_count > 0 else 0.0,
        "status": "BATCH_SETTLEMENT_COMPLETE"
    }


def demonstrate_generator_returns():
    print("=" * 70)
    print("CODER & ACCOTAX - GENERATOR RETURNS & `StopIteration.value`")
    print("=" * 70)

    batch = [
        {"id": "STU-101", "name": "Sourav Mukherjee", "gross_fee": 25000.0, "discount": 0.15},
        {"id": "STU-102", "name": "Priyanka Sen", "gross_fee": 30000.0, "discount": 0.10},
        {"id": "STU-103", "name": "Rahul Verma", "gross_fee": 18000.0, "discount": 0.00},
    ]

    print("1. Driving Generator Manually to Capture `StopIteration.value`:")
    gen = audit_batch_admission_fees(batch)

    # Manual Consumption Loop:
    while True:
        try:
            record = next(gen)
            print(f"   * Yielded Record: {record['name']:<18} ({record['student_id']}) -> Net: INR {record['net_payable']:,.2f}")
        except StopIteration as exc:
            # The returned payload is stored on `exc.value`:
            summary = exc.value
            print(f"\n2. Extracted Generator Return Value (`StopIteration.value`):")
            print(f"   * Total Students : {summary['total_students']}")
            print(f"   * Total Revenue  : INR {summary['total_revenue']:,.2f}")
            print(f"   * Average Fee    : INR {summary['average_fee']:,.2f}")
            print(f"   * Batch Status   : {summary['status']}")
            break

    print(r"""
The Generator Return Rule:
  In Python 3.3+ (PEP 380):
  - `return result` in a generator does NOT yield a value.
  - Instead, it raises `StopIteration(result)`.
  - When used with `yield from sub_gen()`, the return value is returned as the expression result:
    `final_summary = yield from audit_batch_admission_fees(batch)`
""")
    print("[PASSED] Generator Return Values & StopIteration.value Verified.")


if __name__ == "__main__":
    demonstrate_generator_returns()
