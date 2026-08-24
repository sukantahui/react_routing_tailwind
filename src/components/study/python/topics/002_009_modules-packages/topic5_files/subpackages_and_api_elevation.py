# topic5_files/subpackages_and_api_elevation.py
# Module: 002_009_modules-packages
# Topic: Concept of packages & __init__.py files
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 2: Hierarchical Subpackages & Multi-Tier API Elevation
Demonstrates:
  1. Structuring nested subpackage hierarchies
  2. The role of subpackage __init__.py files
  3. Preventing identifier collisions across domain teams
  4. Real-world corporate project layout (accounting vs inventory vs payroll)
"""

import types

def explain_subpackage_architecture():
    print("=" * 65)
    print("1. HIERARCHICAL SUBPACKAGE DIRECTORY ARCHITECTURE")
    print("=" * 65)
    print(r"""
Enterprise Project Layout:
  coder_erp/
  |-- __init__.py                    <- Elevates high-level ERP facade
  |-- accounting/                    <- Subpackage 1
  |   |-- __init__.py                <- Elevates accounting API
  |   |-- gst_calculator.py
  |   \-- invoice_generator.py
  |-- students/                      <- Subpackage 2
  |   |-- __init__.py                <- Elevates student API
  |   |-- enrollment.py
  |   \-- attendance.py
  \-- reporting/                     <- Subpackage 3
      |-- __init__.py
      \-- pdf_exporter.py

Clean Consumer Import Syntax:
  from coder_erp.accounting import calculate_gst
  from coder_erp.students import enroll_new_student
  from coder_erp.reporting import export_pdf_report
""")


def demonstrate_subpackage_namespacing():
    print("=" * 65)
    print("2. DOMAIN NAMESPACE ISOLATION")
    print("=" * 65)

    # Both accounting and student domains have a function called "generate_report()"
    # Subpackages ensure they NEVER collide!
    
    # Subpackage 1: Accounting
    acc_subpkg = types.ModuleType("coder_erp.accounting")
    acc_subpkg.generate_report = lambda: "Financial Audit Report (P&L, GST Ledger)"

    # Subpackage 2: Students
    stu_subpkg = types.ModuleType("coder_erp.students")
    stu_subpkg.generate_report = lambda: "Student Academic Report (Attendance, Marks)"

    print("Executing Domain Reports Without Naming Collisions:")
    print(f"  * Accounting Domain: {acc_subpkg.generate_report()}")
    print(f"  * Student Domain   : {stu_subpkg.generate_report()}")


if __name__ == "__main__":
    explain_subpackage_architecture()
    demonstrate_subpackage_namespacing()
