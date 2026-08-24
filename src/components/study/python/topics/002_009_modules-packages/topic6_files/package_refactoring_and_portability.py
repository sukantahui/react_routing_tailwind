# topic6_files/package_refactoring_and_portability.py
# Module: 002_009_modules-packages
# Topic: Relative vs absolute imports in packages
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 3: Refactoring Safety, Library Portability & PEP 8 Guidelines
Demonstrates:
  1. Why reusable library packages prefer explicit relative imports
  2. Why application entry points and web backends prefer absolute imports
  3. The "Climbing the Tree" anti-pattern (avoiding ....deep.dot.madness)
  4. Decision matrix for choosing between absolute and relative imports
"""

def explain_portability_tradeoffs():
    print("=" * 65)
    print("1. LIBRARY PORTABILITY VS REFACTORING SAFETY")
    print("=" * 65)
    print("""
Scenario: You maintain a popular Python library called `tax_engine_v1`.
You decide to rename the top-level package to `tax_engine_v2`.

A. If you used ABSOLUTE imports internally:
   In 50 internal files, you wrote:
     `from tax_engine_v1.core.calculator import GSTCalculator`
   Result: You must find-and-replace all 50 files to rename them!

B. If you used RELATIVE imports internally:
   In 50 internal files, you wrote:
     `from ..core.calculator import GSTCalculator`
   Result: Renaming the top-level package requires ZERO internal code changes!
   The library is completely portable and self-contained!
""")


def explain_pep8_recommendations():
    print("=" * 65)
    print("2. PEP 8 IMPORT CONVENTIONS & THE 'DOT MADNESS' ANTI-PATTERN")
    print("=" * 65)
    print("""
PEP 8 Recommendation:
  - "Absolute imports are recommended, as they are usually more readable and
     give better error messages if the imported package is incorrectly configured."
  - "However, explicit relative imports are an acceptable alternative when
     dealing with complex package layouts where using absolute imports would
     be unnecessarily verbose."

Anti-Pattern: Excessive Dot Climbing:
  - Writing `from .....services.auth import user` is an anti-pattern.
  - Counting dots (5 levels up) is fragile and confusing.
  - Rule: If you need to go more than 2 levels up (.. or ...), prefer an ABSOLUTE import!
""")


if __name__ == "__main__":
    explain_portability_tradeoffs()
    explain_pep8_recommendations()
