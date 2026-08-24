# topic5_files/enterprise_payroll_package_simulator.py
# Module: 002_009_modules-packages
# Topic: Concept of packages & __init__.py files
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 4: Enterprise Payroll & Taxation Multi-Tier Package Simulator
Demonstrates:
  1. Complete simulated multi-tier corporate package layout
  2. Subpackages for payroll, taxation, and ASCII receipt reporting
  3. High-level package __init__.py facade unifying the public API
"""

import sys
import types
import datetime as dt
from typing import Dict, Any, List

class EnterprisePayrollSuite:
    """Simulated Enterprise Package Environment."""

    @classmethod
    def setup_package_environment(cls) -> types.ModuleType:
        """Constructs an in-memory package with subpackages and elevated facade."""
        
        # 1. Main Package Root
        pkg = types.ModuleType("accotax_suite")
        pkg.__version__ = "4.2.0"
        pkg.__path__ = ["/simulated/accotax_suite"]

        # 2. Subpackage: taxation
        tax_subpkg = types.ModuleType("accotax_suite.taxation")
        tax_subpkg.calculate_gst = lambda amt: {"cgst": amt * 0.09, "sgst": amt * 0.09, "total": amt * 0.18}
        tax_subpkg.calculate_tds = lambda salary: salary * 0.10 if salary > 50000 else 0.0

        # 3. Subpackage: payroll
        payroll_subpkg = types.ModuleType("accotax_suite.payroll")
        
        def compute_payslip(emp_name: str, base_salary: float) -> Dict[str, Any]:
            tds = tax_subpkg.calculate_tds(base_salary)
            pf = base_salary * 0.12
            net_salary = base_salary - tds - pf
            return {
                "name": emp_name,
                "gross": base_salary,
                "tds": tds,
                "pf": pf,
                "net": net_salary,
                "date": dt.datetime.now()
            }
        payroll_subpkg.compute_payslip = compute_payslip

        # 4. API Elevation inside main package __init__.py
        # Elevate functions from subpackages directly to accotax_suite.*
        pkg.taxation = tax_subpkg
        pkg.payroll = payroll_subpkg
        pkg.compute_payslip = payroll_subpkg.compute_payslip
        pkg.calculate_gst = tax_subpkg.calculate_gst

        return pkg


def run_payroll_package_demo():
    print("=" * 75)
    print("CODER & ACCOTAX - ENTERPRISE PAYROLL PACKAGE SIMULATOR")
    print("=" * 75)

    # Initialize package
    accotax_suite = EnterprisePayrollSuite.setup_package_environment()
    print(f"Loaded Package   : '{accotax_suite.__name__}' (Version {accotax_suite.__version__})")
    print(f"Elevated Facade  : accotax_suite.compute_payslip & accotax_suite.calculate_gst\n")

    # Generate employee payslip using elevated facade import
    employee_record = {"name": "Susmita Mukherjee", "role": "Senior Python Instructor", "salary": 65000.0}
    
    print("--- 1. GENERATING SALARY PAYSLIP (via elevated facade) ---")
    slip = accotax_suite.compute_payslip(employee_record["name"], employee_record["salary"])

    print(f"Employee Name    : {slip['name']} ({employee_record['role']})")
    print(f"Pay Period       : {slip['date']:%B %Y}")
    print(f"Gross Salary     : INR {slip['gross']:>10.2f}")
    print(f"TDS Tax (10%)    : -INR {slip['tds']:>9.2f}")
    print(f"Provident Fund   : -INR {slip['pf']:>9.2f} (12% PF)")
    print("-" * 45)
    print(f"NET TAKE-HOME    : INR {slip['net']:>10.2f}")
    print("-" * 45)

    # Test taxation subpackage
    print("\n--- 2. TESTING TAXATION SUBPACKAGE (via accotax_suite.calculate_gst) ---")
    course_fee = 15000.0
    gst_res = accotax_suite.calculate_gst(course_fee)
    print(f"Course Tuition   : INR {course_fee:,.2f}")
    print(f"CGST (9%)        : INR {gst_res['cgst']:,.2f}")
    print(f"SGST (9%)        : INR {gst_res['sgst']:,.2f}")
    print(f"Total GST (18%)  : INR {gst_res['total']:,.2f}")


if __name__ == "__main__":
    run_payroll_package_demo()
