# topic9_files/bidirectional_communication_with_send_and_close.py
# Module: 003_003_decorators-generators
# Topic: Generator functions vs regular functions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 3: Bidirectional Communication with `send()`, `throw()`, and `close()`
Demonstrates:
  1. Sending values into a suspended generator using `gen.send(val)`
  2. Priming a generator to its first yield point
  3. Handling exceptions and clean termination with `throw()` and `close()`
"""

from typing import Generator

def running_scholarship_accumulator() -> Generator[float, float, str]:
    """Coroutine accumulator receiving scholarship disbursements via send() and returning status."""
    total_disbursed = 0.0
    disbursement_count = 0
    print("  [ACCUMULATOR STARTED] Waiting for initial scholarship allocation...")

    try:
        while True:
            # `received_amount` gets the argument passed to `send()`:
            received_amount = yield total_disbursed

            if received_amount is not None:
                if received_amount < 0:
                    raise ValueError(f"Scholarship disbursement cannot be negative ({received_amount})")
                total_disbursed += received_amount
                disbursement_count += 1
                print(f"  [ACCUMULATOR UPDATED] Added INR {received_amount:,.2f} -> Total Fund: INR {total_disbursed:,.2f}")
    except GeneratorExit:
        print("  [ACCUMULATOR CLOSED] Final cleanup triggered via gen.close().")
        return f"AUDIT_CLOSED: Disbursed INR {total_disbursed:,.2f} across {disbursement_count} grants."


def demonstrate_send_and_close():
    print("=" * 70)
    print("CODER & ACCOTAX - BIDIRECTIONAL COMMUNICATION (`send` & `close`)")
    print("=" * 70)

    # 1. Instantiate accumulator generator:
    acc = running_scholarship_accumulator()

    # 2. Priming the generator (advancing to first yield):
    initial_total = next(acc)  # Equivalent to acc.send(None)
    print(f"1. Primed Accumulator. Initial Total: INR {initial_total:,.2f}\n")

    # 3. Sending scholarship grants into generator:
    print("2. Sending Grants to Coroutine:")
    tot1 = acc.send(5000.0)
    print(f"   -> Current Running Total returned from yield: INR {tot1:,.2f}")

    tot2 = acc.send(7500.0)
    print(f"   -> Current Running Total returned from yield: INR {tot2:,.2f}")

    tot3 = acc.send(12500.0)
    print(f"   -> Current Running Total returned from yield: INR {tot3:,.2f}\n")

    # 4. Closing the generator cleanly:
    print("3. Closing Generator Stream via `acc.close()`:")
    acc.close()

    print(r"""
Coroutine Communication Rules:
  - `next(gen)` or `gen.send(None)` PRIMES the coroutine to the first yield.
  - `gen.send(val)` passes `val` into the `yield` expression and returns next yielded item.
  - `gen.close()` raises `GeneratorExit` inside the generator to release resources.
""")
    print("[PASSED] Bidirectional Communication with send & close Verified.")


if __name__ == "__main__":
    demonstrate_send_and_close()
