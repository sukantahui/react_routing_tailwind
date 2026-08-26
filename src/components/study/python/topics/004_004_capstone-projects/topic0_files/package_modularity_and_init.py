"""
# Module: 004_004_capstone-projects
# Topic 0: End-to-End project architecture & clean directory layout
# File: package_modularity_and_init.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating package modularity, __init__.py, __all__ exports,
#              and one-directional dependency flows.
"""

from enum import Enum
from dataclasses import dataclass

# 1. MODELS LAYER (No dependencies on other application layers)
class CampusBranch(Enum):
    BARRACKPORE = "Barrackpore"
    KOLKATA = "Kolkata"
    ICHAPUR = "Ichapur"
    JADAVPUR = "Jadavpur"

@dataclass
class StudentDossier:
    sid: str
    name: str
    campus: CampusBranch
    base_tuition: float
    is_active: bool = True

# 2. SERVICES LAYER (Depends only on Models)
class AdmissionFeeService:
    DISCOUNT_RATES = {
        CampusBranch.BARRACKPORE: 0.15,
        CampusBranch.ICHAPUR: 0.10,
        CampusBranch.KOLKATA: 0.05,
        CampusBranch.JADAVPUR: 0.00
    }

    @classmethod
    def calculate_net_fee(cls, student: StudentDossier, merit_score: float) -> float:
        merit_pct = 0.20 if merit_score >= 90.0 else 0.0
        regional_pct = cls.DISCOUNT_RATES.get(student.campus, 0.0)
        total_discount = min(0.35, merit_pct + regional_pct)
        return round(student.base_tuition * (1.0 - total_discount), 2)

# 3. PUBLIC API EXPORTS (__init__.py simulation)
__all__ = [
    "CampusBranch",
    "StudentDossier",
    "AdmissionFeeService"
]

def test_package_layering():
    print("   [...] Testing Clean Layered Architecture & Exports...")
    
    # Instantiate domain entity
    student = StudentDossier("STU_BP_01", "Mamata", CampusBranch.BARRACKPORE, 20000.0)
    
    # Execute service computation
    net = AdmissionFeeService.calculate_net_fee(student, merit_score=95.0)
    
    # 20% merit + 15% Barrackpore = 35% discount -> 13,000.0
    assert net == 13000.0
    print(f"   [PASS] Student: {student.name} ({student.campus.value}) -> Net Fee: Rs. {net:,.2f}")
    print(f"   [PASS] Package public __all__ exports: {__all__}")

def main():
    print("=" * 75)
    print("[PACKAGE MODULARITY] Clean Tiered Architecture & __all__ Exports")
    print("=" * 75)

    test_package_layering()

    print("=" * 75)
    print("[TAKEAWAY] Strict one-directional dependency flows (Models -> Repositories ->")
    print("           Services -> CLI) eliminate circular imports and keep packages clean.")
    print("=" * 75)

if __name__ == "__main__":
    main()
