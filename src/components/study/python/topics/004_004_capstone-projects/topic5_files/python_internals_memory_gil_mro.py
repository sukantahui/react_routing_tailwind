"""
# Module: 004_004_capstone-projects
# Topic 5: Top Python Technical Interview Questions & Coding Challenges
# File: python_internals_memory_gil_mro.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Deep dive into CPython runtime internals: Reference Counting, Cyclic GC,
#              C3 Linearization MRO, Mutable Defaults, and __slots__.
"""

import sys
import gc

# 1. C3 LINEARIZATION / METHOD RESOLUTION ORDER (MRO)
class BaseService:
    def execute(self) -> str:
        return "BaseService"

class AuditService(BaseService):
    def execute(self) -> str:
        return f"Audit -> {super().execute()}"

class AdmissionService(BaseService):
    def execute(self) -> str:
        return f"Admission -> {super().execute()}"

class MultiCampusCoordinator(AuditService, AdmissionService):
    """Multiple inheritance MRO resolution order."""
    def execute(self) -> str:
        return f"Coordinator -> {super().execute()}"

# 2. MUTABLE DEFAULT ARGUMENT TRAP & FIX
def buggy_append_enrollment(student: str, registry: list[str] = []) -> list[str]:
    registry.append(student)
    return registry

def safe_append_enrollment(student: str, registry: list[str] | None = None) -> list[str]:
    if registry is None:
        registry = []
    registry.append(student)
    return registry

# 3. __slots__ MEMORY OPTIMIZATION
class RegularStudent:
    def __init__(self, sid: str, name: str):
        self.sid = sid
        self.name = name

class SlottedStudent:
    __slots__ = ("sid", "name")
    def __init__(self, sid: str, name: str):
        self.sid = sid
        self.name = name

def test_internals():
    print("   [...] Testing CPython Memory, MRO & Slots Internals...")

    # 1. MRO Verification (C3 Linearization)
    mro_names = [cls.__name__ for cls in MultiCampusCoordinator.__mro__]
    assert mro_names == ["MultiCampusCoordinator", "AuditService", "AdmissionService", "BaseService", "object"]
    print(f"   [PASS] 1. C3 Linearization MRO Order: {' -> '.join(mro_names)}")

    # 2. Mutable Defaults Trap Verification
    b1 = buggy_append_enrollment("Mamata")
    b2 = buggy_append_enrollment("Mahima")
    assert b1 is b2 and len(b1) == 2, "Buggy function mutated shared default list"
    print("   [PASS] 2. Mutable default trap demonstrated (shared heap list instance)")

    s1 = safe_append_enrollment("Mamata")
    s2 = safe_append_enrollment("Mahima")
    assert s1 is not s2 and len(s1) == 1 and len(s2) == 1
    print("   [PASS] 3. Safe default (target=None) verified with independent instances")

    # 3. Memory Slots Check
    regular = RegularStudent("STU_BP_01", "Mamata")
    slotted = SlottedStudent("STU_BP_01", "Mamata")
    assert hasattr(regular, "__dict__")
    assert not hasattr(slotted, "__dict__")
    print("   [PASS] 4. __slots__ eliminated dynamic __dict__ heap overhead")

def main():
    print("=" * 75)
    print("[CPYTHON INTERNALS] Memory, MRO, GIL & Slots Mastery")
    print("=" * 75)

    test_internals()

    print("=" * 75)
    print("[TAKEAWAY] Mastering CPython reference counting, C3 linearization, and")
    print("           memory layouts separates senior engineers from juniors in interviews.")
    print("=" * 75)

if __name__ == "__main__":
    main()
