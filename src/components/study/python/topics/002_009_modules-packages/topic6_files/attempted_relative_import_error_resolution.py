# topic6_files/attempted_relative_import_error_resolution.py
# Module: 002_009_modules-packages
# Topic: Relative vs absolute imports in packages
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 2: Anatomy & Resolution of the 'attempted relative import' Error
Demonstrates:
  1. Why 'ImportError: attempted relative import with no known parent package' occurs
  2. The role of the internal __package__ variable
  3. The 3 professional industry fixes for running package modules
"""

import sys

def explain_the_error_mechanism():
    print("=" * 65)
    print("1. WHY THE 'NO KNOWN PARENT PACKAGE' ERROR HAPPENS")
    print("=" * 65)
    print(f"Current Script Runtime State:")
    print(f"  * sys.argv[0]   : '{sys.argv[0]}'")
    print(f"  * __name__      : '{__name__}'")
    print(f"  * __package__   : '{__package__}'\n")

    print("""
When you execute a file directly via:
  $ python coder_app/services/billing/calculator.py

Python initializes:
  1. `__name__` = '__main__'
  2. `__package__` = None (Python has ZERO knowledge that 'coder_app' is its parent!)
  3. When Python encounters `from ..auth import tokens`, it looks up `__package__`.
  4. Since `__package__` is None, it CRASHES IMMEDIATELY with:
     -> ImportError: attempted relative import with no known parent package!
""")


def explain_the_three_fixes():
    print("=" * 65)
    print("2. THE 3 PROFESSIONAL INDUSTRY RESOLUTIONS")
    print("=" * 65)
    print("""
Fix 1: Run as a Module with `-m` from Project Root (RECOMMENDED):
  Instead of: python coder_app/services/billing/calculator.py
  Run:        python -m coder_app.services.billing.calculator
  Why it works: Python sets `__package__ = 'coder_app.services.billing'` so
  all relative imports resolve perfectly!

Fix 2: Use Absolute Imports Everywhere:
  Change: `from ..auth import tokens`
  To:     `from coder_app.services.auth import tokens`
  (And ensure the project root is in PYTHONPATH / sys.path).

Fix 3: Set PYTHONPATH Environment Variable:
  Windows:    $env:PYTHONPATH = "E:\\react_routing_tailwind"
  Linux/macOS: export PYTHONPATH=/path/to/project_root
""")


if __name__ == "__main__":
    explain_the_error_mechanism()
    explain_the_three_fixes()
