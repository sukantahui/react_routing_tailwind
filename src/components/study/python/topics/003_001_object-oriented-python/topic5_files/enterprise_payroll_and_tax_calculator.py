# topic5_files/enterprise_payroll_and_tax_calculator.py
# Module: 003_001_object-oriented-python
# Topic: Class methods (@classmethod) & Static methods (@staticmethod)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 4: Enterprise Payroll & TDS Tax Calculator (Production Case Study)
Demonstrates:
  1. Instance Methods: Personal salary calculations and slip generation
  2. Class Methods: Alternative constructors parsing HR JSON payloads
  3. Static Methods: Universal Indian Income Tax TDS bracket calculations
"""

import json
from typing import Dict, Any

class EnterprisePayrollEmployee:
    """Enterprise Employee Payroll Model integrating all 3 method types."""
    organization = "Coder & AccoTax Consulting"
    standard_monthly_days = 30

    def __init__(self, emp_id: str, name: str, base_salary: float, department: str):
        self.emp_id = emp_id
        self.name = name
        self.base_salary = float(base_salary)
        self.department = department
        self.present_days = self.standard_monthly_days

    # =================================================================
    # CLASS METHOD FACTORY (Constructs from HR JSON Payload)
    # =================================================================
    @classmethod
    def from_hr_json(cls, json_str: str) -> 'EnterprisePayrollEmployee':
        """Constructs an employee instance from a serialized HR JSON string."""
        payload = json.loads(json_str)
        return cls(
            emp_id=payload["employee_id"],
            name=payload["full_name"],
            base_salary=float(payload["ctc_monthly"]),
            department=payload.get("dept", "General")
        )

    # =================================================================
    # STATIC METHOD (TDS Income Tax Bracket Calculation)
    # =================================================================
    @staticmethod
    def calculate_tds_tax(monthly_taxable_income: float) -> float:
        """Computes estimated monthly Tax Deducted at Source (TDS)."""
        annual_est = monthly_taxable_income * 12
        if annual_est <= 500000.0:
            return 0.0
        elif annual_est <= 1000000.0:
            taxable_slab = annual_est - 500000.0
            return (taxable_slab * 0.10) / 12  # 10% slab
        else:
            tax_first_slab = 500000.0 * 0.10
            tax_second_slab = (annual_est - 1000000.0) * 0.20
            return (tax_first_slab + tax_second_slab) / 12

    # =================================================================
    # INSTANCE METHOD (Computes Monthly Pay Slip)
    # =================================================================
    def generate_salary_slip(self, days_worked: int) -> str:
        self.present_days = days_worked
        prorated_salary = (self.base_salary / self.standard_monthly_days) * self.present_days
        
        # Call static method utility for tax deduction
        tds_tax = self.calculate_tds_tax(prorated_salary)
        net_payable = prorated_salary - tds_tax

        return (
            f"======================================================================\n"
            f"CODER & ACCOTAX - MONTHLY PAYSLIP\n"
            f"Employee      : {self.name} [{self.emp_id}] | Dept: {self.department}\n"
            f"Base Salary   : INR {self.base_salary:,.2f} (30 Days)\n"
            f"Days Worked   : {self.present_days} / {self.standard_monthly_days} days\n"
            f"Gross Earned  : INR {prorated_salary:,.2f}\n"
            f"TDS Deducted  : -INR {tds_tax:,.2f}\n"
            f"Net Disbursed : INR {net_payable:,.2f}\n"
            f"======================================================================"
        )


def run_payroll_case_study():
    print("=" * 70)
    print("CODER & ACCOTAX - ENTERPRISE PAYROLL CASE STUDY")
    print("=" * 70)

    # 1. Instantiate via Class Method Factory
    hr_payload = json.dumps({
        "employee_id": "EMP-2026-99",
        "full_name": "Debolina Mukherjee",
        "ctc_monthly": 65000.0,
        "dept": "AI & Software Engineering"
    })

    emp = EnterprisePayrollEmployee.from_hr_json(hr_payload)
    print(f"Instantiated Employee: {emp.name} via @classmethod factory.\n")

    # 2. Generate Payslip via Instance Method (which delegates to @staticmethod TDS)
    payslip = emp.generate_salary_slip(days_worked=28)
    print(payslip)

    print("\n[PASSED] Enterprise Payroll Suite Completed Successfully.")


if __name__ == "__main__":
    run_payroll_case_study()
