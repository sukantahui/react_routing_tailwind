# topic13_files/enterprise_payroll_and_tax_abc_system.py
# Module: 003_001_object-oriented-python
# Topic: Abstract Base Classes (abc module)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 13 - File 4: Enterprise Institutional Payroll & Tax System (Production Case Study)
Demonstrates:
  1. Abstract Base Class enforcing abstract methods and abstract properties
  2. Template Method Pattern: Concrete workflow method orchestrating abstract calculations
  3. Concrete implementations: FullTimeFaculty, VisitingAdjunctLecturer, ConsultantStaff
"""

from abc import ABC, abstractmethod
from typing import Dict, Any

# =====================================================================
# ABSTRACT BASE CLASS: PAYROLL CONTRACT & TEMPLATE METHOD
# =====================================================================
class BaseEmployeePayroll(ABC):
    """Abstract payroll contract and template processor for institutional staff."""
    institute = "Coder & AccoTax"

    def __init__(self, emp_id: str, full_name: str, pan_number: str):
        self.emp_id = emp_id
        self.full_name = full_name
        self.pan_number = pan_number

    # =================================================================
    # 1. ABSTRACT METHODS & PROPERTIES (Must be implemented by subclasses)
    # =================================================================
    @property
    @abstractmethod
    def employment_tier(self) -> str:
        """Abstract Property: Full-Time, Visiting, or Consultant."""
        pass

    @property
    @abstractmethod
    def income_tax_rate(self) -> float:
        """Abstract Property: TDS income tax percentage."""
        pass

    @abstractmethod
    def calculate_gross_earnings(self) -> float:
        """Abstract Method: Computes monthly gross earnings before deductions."""
        pass

    # =================================================================
    # 2. TEMPLATE METHOD (Concrete algorithm workflow)
    # =================================================================
    def generate_monthly_payslip(self) -> Dict[str, Any]:
        """Template Method: Orchestrates salary calculation and TDS tax deductions."""
        gross = self.calculate_gross_earnings()
        tax_deduction = gross * self.income_tax_rate
        net_payable = gross - tax_deduction

        return {
            "emp_id": self.emp_id,
            "full_name": self.full_name,
            "pan": self.pan_number,
            "tier": self.employment_tier,
            "gross_salary": gross,
            "tax_rate": f"{self.income_tax_rate * 100:.1f}%",
            "tds_deducted": tax_deduction,
            "net_payable": net_payable
        }


# =====================================================================
# CONCRETE EMPLOYEE 1: FULL TIME FACULTY
# =====================================================================
class FullTimeFaculty(BaseEmployeePayroll):
    def __init__(self, emp_id: str, full_name: str, pan_number: str, base_salary: float, hra_allowance: float):
        super().__init__(emp_id, full_name, pan_number)
        self.base_salary = float(base_salary)
        self.hra_allowance = float(hra_allowance)

    @property
    def employment_tier(self) -> str:
        return "Permanent Full-Time Faculty"

    @property
    def income_tax_rate(self) -> float:
        return 0.15  # 15% TDS Bracket

    def calculate_gross_earnings(self) -> float:
        return self.base_salary + self.hra_allowance


# =====================================================================
# CONCRETE EMPLOYEE 2: VISITING ADJUNCT LECTURER
# =====================================================================
class VisitingAdjunctLecturer(BaseEmployeePayroll):
    def __init__(self, emp_id: str, full_name: str, pan_number: str, lecture_hours: float, hourly_rate_inr: float):
        super().__init__(emp_id, full_name, pan_number)
        self.lecture_hours = float(lecture_hours)
        self.hourly_rate = float(hourly_rate_inr)

    @property
    def employment_tier(self) -> str:
        return "Visiting Adjunct Lecturer"

    @property
    def income_tax_rate(self) -> float:
        return 0.10  # 10% Professional TDS

    def calculate_gross_earnings(self) -> float:
        return self.lecture_hours * self.hourly_rate


def run_payroll_case_study():
    print("=" * 70)
    print("CODER & ACCOTAX - ENTERPRISE PAYROLL & TAX ABC ENGINE")
    print("=" * 70)

    staff_roster = [
        FullTimeFaculty("FAC-001", "Sukanta Hui", "ABCDE1234F", base_salary=85000.0, hra_allowance=15000.0),
        VisitingAdjunctLecturer("VIS-042", "Dr. Amitava Roy", "WXYZP9988K", lecture_hours=32.0, hourly_rate_inr=1500.0)
    ]

    for staff in staff_roster:
        slip = staff.generate_monthly_payslip()
        print(f"--- PAYSLIP: {slip['full_name']} [{slip['tier']}] ---")
        print(f"  * PAN Number     : {slip['pan']}")
        print(f"  * Gross Salary   : INR {slip['gross_salary']:,.2f}")
        print(f"  * Tax Rate (TDS) : {slip['tax_rate']} (-INR {slip['tds_deducted']:,.2f})")
        print(f"  * NET DISBURSED  : INR {slip['net_payable']:,.2f}\n")

    print("[PASSED] Enterprise Payroll ABC System Completed Successfully.")


if __name__ == "__main__":
    run_payroll_case_study()
