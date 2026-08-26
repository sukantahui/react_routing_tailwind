"""
# Module: 004_004_capstone-projects
# Topic 3: Writing complete documentation (README.md, docstrings, typing hints)
# File: pep484_static_typing_and_mypy_annotations.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating PEP 484 / PEP 585 static typing, Generics, Protocols,
#              Literal, TypedDict, and Self.
"""

from typing import Protocol, TypeVar, Literal, TypedDict, Self
from dataclasses import dataclass

# 1. LITERAL TYPES & TYPED DICTS
CampusCode = Literal["BP", "CC", "IC", "JU"]

class StudentJSONPayload(TypedDict):
    sid: str
    name: str
    campus: CampusCode
    balance: float

# 2. PROTOCOL (Static Duck Typing / Structural Subtyping)
class Serializable(Protocol):
    def to_json(self) -> str:
        ...

# 3. GENERICS WITH TYPEVAR
T = TypeVar("T")

class RepositoryContainer(list[T]):
    """Generic in-memory repository container."""
    def find_first(self) -> T | None:
        return self[0] if self else None

# 4. FLUENT BUILDER USING 'Self' (Python 3.11+)
@dataclass
class StudentProfile:
    sid: str
    name: str
    campus: CampusCode
    balance: float = 0.0

    def with_name(self, new_name: str) -> Self:
        self.name = new_name
        return self

    def with_balance(self, new_balance: float) -> Self:
        self.balance = new_balance
        return self

    def to_dict(self) -> StudentJSONPayload:
        return {
            "sid": self.sid,
            "name": self.name,
            "campus": self.campus,
            "balance": self.balance
        }

def test_static_typing():
    print("   [...] Testing Static Typing Contracts & Generics...")

    # 1. Fluent builder typing
    student = StudentProfile("STU_BP_01", "Mamata", "BP")
    student.with_name("Mamata Banerjee").with_balance(15000.0)
    assert student.name == "Mamata Banerjee"
    assert student.balance == 15000.0
    print("   [PASS] 1. Fluent builder with Self type annotations validated")

    # 2. Generic Container
    repo: RepositoryContainer[StudentProfile] = RepositoryContainer()
    repo.append(student)
    first_item = repo.find_first()
    assert first_item is not None and first_item.sid == "STU_BP_01"
    print(f"   [PASS] 2. Generic RepositoryContainer[T] fetched: {first_item.name} ({first_item.campus})")

    # 3. TypedDict Payload
    payload: StudentJSONPayload = student.to_dict()
    assert payload["campus"] == "BP"
    print(f"   [PASS] 3. Strongly-typed TypedDict generated: {payload}")

def main():
    print("=" * 75)
    print("[PEP 484 STATIC TYPING] Protocols, Generics, Literal & TypedDict")
    print("=" * 75)

    test_static_typing()

    print("=" * 75)
    print("[TAKEAWAY] Comprehensive static typing annotations turn Python into a")
    print("           robust, self-verifying language with zero runtime performance cost.")
    print("=" * 75)

if __name__ == "__main__":
    main()
