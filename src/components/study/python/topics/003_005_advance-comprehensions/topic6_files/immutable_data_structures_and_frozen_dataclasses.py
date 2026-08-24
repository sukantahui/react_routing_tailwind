# topic6_files/immutable_data_structures_and_frozen_dataclasses.py
# Module: 003_005_advance-comprehensions
# Topic: Pure functions & immutable programming principles in Python
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 2: Immutable Data Structures & `@dataclass(frozen=True)`
Demonstrates:
  1. Built-in immutable types: `tuple`, `frozenset`, `bytes`
  2. Read-only dictionary views with `types.MappingProxyType`
  3. Enforcing strict schema immutability using `@dataclass(frozen=True)`
"""

from dataclasses import dataclass, replace
from types import MappingProxyType
from typing import Set, Tuple

# 1. Strict Immutable Data Container using frozen=True
@dataclass(frozen=True)
class ImmutableStudentRecord:
    student_id: str
    name: str
    course: str
    tuition_fee: float
    badges: Tuple[str, ...] = ()  # Must use immutable tuple, NOT mutable list!

    def with_fee_discount(self, discount_inr: float) -> "ImmutableStudentRecord":
        """Pure Copy-on-Write transformation returning new frozen instance."""
        return replace(self, tuition_fee=self.tuition_fee - discount_inr)

    def with_new_badge(self, badge: str) -> "ImmutableStudentRecord":
        """Pure Copy-on-Write adding badge to tuple."""
        return replace(self, badges=(*self.badges, badge))


def demonstrate_immutable_structures():
    print("=" * 70)
    print("CODER & ACCOTAX - IMMUTABLE STRUCTURES & FROZEN DATACLASSES")
    print("=" * 70)

    # 1. Frozen Dataclass Instantiation:
    student = ImmutableStudentRecord(
        student_id="STU-101",
        name="Sourav Mukherjee",
        course="Python Full-Stack & AI",
        tuition_fee=35000.0,
        badges=("PYTHON_CORE", "DECORATORS")
    )

    print("1. Inspecting Initial Frozen Dataclass:")
    print(f"   * Student ID : {student.student_id}")
    print(f"   * Name       : {student.name}")
    print(f"   * Fee        : INR {student.tuition_fee:,.2f}")
    print(f"   * Badges     : {student.badges}\n")

    # 2. Attempting Illegal In-Place Mutation:
    print("2. Attempting Direct Mutation (`student.tuition_fee = 20000.0`):")
    try:
        student.tuition_fee = 20000.0  # type: ignore
    except Exception as exc:
        print(f"   * [MUTATION PREVENTED] {type(exc).__name__}: {exc}")
        print("   -> Frozen dataclasses reject in-place attribute assignment!\n")

    # 3. Pure Copy-on-Write Transformation using dataclasses.replace:
    print("3. Pure Copy-on-Write Transformation (`replace()` / `with_fee_discount()`):")
    discounted_student = student.with_fee_discount(5000.0).with_new_badge("ADVANCED_COMPREHENSIONS")

    print(f"   * Original Student (Still INR 35,000) : INR {student.tuition_fee:,.2f} | Badges: {student.badges}")
    print(f"   * New Student Copy (INR 30,000 + Badge): INR {discounted_student.tuition_fee:,.2f} | Badges: {discounted_student.badges}\n")

    # 4. Read-Only Dictionary Views with MappingProxyType:
    print("4. Read-Only Dictionary View with `types.MappingProxyType`:")
    internal_config = {"institution": "Coder & AccoTax", "city": "Barrackpore"}
    read_only_view = MappingProxyType(internal_config)

    print(f"   * Read-Only Config View: {read_only_view['institution']} @ {read_only_view['city']}")
    try:
        read_only_view["city"] = "Kolkata"  # type: ignore
    except TypeError as exc:
        print(f"   * [MUTATION PREVENTED] TypeError: {exc}")

    print(r"""
Immutability Invariants:
  1. Use `@dataclass(frozen=True)` for domain models to prevent accidental mutations.
  2. Use `dataclasses.replace(instance, **changes)` for pure copy-on-write updates.
  3. Wrap mutable dictionaries in `MappingProxyType` before exposing them to external consumers.
""")
    print("[PASSED] Immutable Data Structures & Frozen Dataclasses Verified.")


if __name__ == "__main__":
    demonstrate_immutable_structures()
