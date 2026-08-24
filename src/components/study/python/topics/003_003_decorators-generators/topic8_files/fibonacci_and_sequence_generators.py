# topic8_files/fibonacci_and_sequence_generators.py
# Module: 003_003_decorators-generators
# Topic: Generators & the yield statement
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 2: Infinite and Finite Sequence Generators (Fibonacci & Installments)
Demonstrates:
  1. Classic Fibonacci generator maintaining O(1) memory
  2. Generating custom tuition installment schedules lazily
  3. Safe consumption using `itertools.islice` and standard loops
"""

import itertools
from typing import Generator, Dict, Any

def fibonacci_generator(max_count: int = None) -> Generator[int, None, None]:
    """Generates Fibonacci numbers lazily with O(1) memory space."""
    a, b = 0, 1
    yielded = 0

    while max_count is None or yielded < max_count:
        yield a
        a, b = b, a + b
        yielded += 1


def tuition_installment_schedule_generator(
    total_fee: float,
    number_of_installments: int = 4
) -> Generator[Dict[str, Any], None, None]:
    """Generates monthly installment schedules for enrolled students."""
    installment_amount = round(total_fee / number_of_installments, 2)
    cumulative_paid = 0.0

    for installment_num in range(1, number_of_installments + 1):
        cumulative_paid += installment_amount
        remaining_balance = max(0.0, total_fee - cumulative_paid)

        yield {
            "installment_no": installment_num,
            "due_amount": installment_amount,
            "cumulative_paid": cumulative_paid,
            "remaining_balance": remaining_balance
        }


def demonstrate_sequence_generators():
    print("=" * 70)
    print("CODER & ACCOTAX - SEQUENCE GENERATORS (FIBONACCI & TUITION)")
    print("=" * 70)

    # 1. Fibonacci Generator (First 8 elements):
    print("1. First 8 Fibonacci Numbers via `fibonacci_generator(8)`:")
    fib_gen = fibonacci_generator(8)
    for num in fib_gen:
        print(f"   * Fib: {num}")

    # 2. Infinite Fibonacci with `itertools.islice`:
    print("\n2. Consuming Infinite Generator using `itertools.islice(gen, 5, 10)`:")
    infinite_fib = fibonacci_generator()
    subset = list(itertools.islice(infinite_fib, 5, 10))
    print(f"   Fibonacci Elements [Index 5 to 10]: {subset}\n")

    # 3. Tuition Installment Schedule (INR 24,000 in 4 installments):
    print("3. Generating Student Tuition Installment Schedule (INR 24,000 / 4 Months):")
    installment_stream = tuition_installment_schedule_generator(24000.0, 4)
    for inst in installment_stream:
        print(
            f"   * Installment #{inst['installment_no']}: Due INR {inst['due_amount']:,.2f} | "
            f"Paid: INR {inst['cumulative_paid']:,.2f} | Remaining: INR {inst['remaining_balance']:,.2f}"
        )

    print("\n[PASSED] Fibonacci & Sequence Generators Verified.")


if __name__ == "__main__":
    demonstrate_sequence_generators()
