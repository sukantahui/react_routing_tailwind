# topic9_files/explicit_exception_chaining_from.py
# Module: 003_002_basic-exception-handling
# Topic: Exception Chaining (raise ... from ...)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 1: Explicit Exception Chaining (`raise ... from ...`)
Demonstrates:
  1. Explicit chaining using `raise NewException(...) from OriginalException` (PEP 3134)
  2. How Python populates the `__cause__` attribute on the new exception
  3. Outputting clear causal tracebacks: "The above exception was the direct cause of the following exception"
"""

class StudentLedgerStorageError(Exception):
    """High-level domain exception for ledger storage failures."""
    pass


def parse_raw_tuition_record(raw_line: str) -> dict:
    """Parses a comma-separated record and raises chained domain exception on failure."""
    try:
        parts = raw_line.split(",")
        student_id = parts[0].strip()
        fee_amount = float(parts[1].strip())
        return {"id": student_id, "fee": fee_amount}
    except (IndexError, ValueError) as root_cause:
        # EXPLICIT EXCEPTION CHAINING:
        raise StudentLedgerStorageError(
            f"Failed to process tuition record string: '{raw_line}'"
        ) from root_cause


def demonstrate_explicit_chaining():
    print("=" * 70)
    print("CODER & ACCOTAX - EXPLICIT EXCEPTION CHAINING (raise ... from ...)")
    print("=" * 70)

    # 1. Valid Parsing
    print("1. Parsing Valid Tuition Record:")
    res = parse_raw_tuition_record("STU-101, 18000.0")
    print(f"   Parsed Record: {res}\n")

    # 2. Triggering Explicit Chained Exception
    print("2. Parsing Corrupt Record ('STU-102, INVALID_FEE'):")
    try:
        parse_raw_tuition_record("STU-102, INVALID_FEE")
    except StudentLedgerStorageError as domain_err:
        print(f"\n[CAUGHT HIGH-LEVEL DOMAIN EXCEPTION]:\n  {domain_err}")
        
        # Inspecting the __cause__ attribute:
        cause = domain_err.__cause__
        print(f"\n[INSPECTING __cause__ ATTRIBUTE]:")
        print(f"  * Root Cause Type    : {type(cause).__name__}")
        print(f"  * Root Cause Message : {cause}")
        print(f"  * Is Chained Explicitly: {domain_err.__cause__ is not None}")

    print("\n[PASSED] Explicit Exception Chaining Verified.")


if __name__ == "__main__":
    demonstrate_explicit_chaining()
