# topic6_files/absolute_vs_relative_imports_syntax.py
# Module: 002_009_modules-packages
# Topic: Relative vs absolute imports in packages
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 1: Absolute Imports vs Explicit Relative Imports Syntax
Demonstrates:
  1. Absolute Imports: PEP 8 recommended standard (from app.services.billing import TaxEngine)
  2. Explicit Relative Imports:
     - '.'   -> Current package folder (from . import sibling)
     - '..'  -> Parent package folder (from ..auth import verify_token)
     - '...' -> Grandparent folder (from ...core import config)
  3. Why implicit relative imports (e.g. 'import sibling') were banned in Python 3
"""

def explain_import_syntax_rules():
    print("=" * 65)
    print("1. ABSOLUTE VS RELATIVE IMPORT SYNTAX RULES")
    print("=" * 65)
    print(r"""
Package Directory Layout:
  coder_app/
  |-- __init__.py
  |-- core/
  |   |-- __init__.py
  |   \-- config.py           (Contains: APP_NAME, GST_RATE)
  \-- services/
      |-- __init__.py
      |-- auth/
      |   |-- __init__.py
      |   \-- tokens.py       (Contains: generate_jwt)
      \-- billing/
          |-- __init__.py
          |-- calculator.py   (Target File We Are Editing)
          \-- receipt.py      (Sibling in same folder)

Inside `services/billing/calculator.py`:

A. Absolute Imports (Full path from sys.path root):
   from coder_app.core.config import GST_RATE
   from coder_app.services.auth.tokens import generate_jwt
   from coder_app.services.billing.receipt import print_receipt

B. Explicit Relative Imports (Relative dot navigation):
   from .receipt import print_receipt             # '.' = current folder (billing)
   from ..auth.tokens import generate_jwt         # '..' = parent folder (services)
   from ...core.config import GST_RATE            # '...' = grandparent folder (coder_app)
""")


def demonstrate_relative_import_mechanics():
    print("=" * 65)
    print("2. DOT NAVIGATION SUMMARY")
    print("=" * 65)
    print("Dot Token    Target Location          Example Inside services/billing/")
    print("-" * 65)
    print(".            Current Directory        from . import receipt")
    print("..           Parent Directory         from ..auth import tokens")
    print("...          Grandparent Directory    from ...core import config")
    print("....         Great-Grandparent Dir    from ....shared import models")


if __name__ == "__main__":
    explain_import_syntax_rules()
    demonstrate_relative_import_mechanics()
