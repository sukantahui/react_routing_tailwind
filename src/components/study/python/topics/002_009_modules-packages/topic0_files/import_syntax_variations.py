# topic0_files/import_syntax_variations.py
# Module: 002_009_modules-packages
# Topic: import & from-import syntax variations
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 1: Python Import Syntax Variations & Namespace Isolation
Demonstrates:
  1. Direct module import: import module_name
  2. Module aliasing: import module_name as alias
  3. Specific symbol import: from module import symbol1, symbol2
  4. Symbol aliasing: from module import symbol as alias
  5. The Wildcard Import Anti-Pattern: from module import * (Namespace pollution)
"""

# 1. Direct Module Import (Cleanest & Most Explicit)
import math

# 2. Module Aliasing (Standard in Data Science: np, pd, plt)
import datetime as dt

# 3. Specific Symbol Import (Direct access without module prefix)
from decimal import Decimal, ROUND_HALF_UP

# 4. Symbol Aliasing (Resolves local name collisions)
from statistics import mean as calculate_average


def demonstrate_import_syntaxes():
    print("=" * 65)
    print("1. DIRECT MODULE IMPORT (import math)")
    print("=" * 65)

    # Qualified access via namespace prefix: math.<symbol>
    radius = 7.0
    area = math.pi * (radius ** 2)
    print(f"math.pi             : {math.pi}")
    print(f"math.sqrt(144)      : {math.sqrt(144)}")
    print(f"Calculated Area     : {area:.2f} sq.units\n")


def demonstrate_aliased_import():
    print("=" * 65)
    print("2. MODULE ALIASING (import datetime as dt)")
    print("=" * 65)

    # Qualified access via compact alias: dt.<symbol>
    current_time = dt.datetime(2026, 8, 24, 18, 30, 0)
    today = dt.date(2026, 8, 24)
    print(f"dt.datetime.now()   : {current_time:%d-%b-%Y %I:%M %p}")
    print(f"dt.date.today()     : {today}\n")


def demonstrate_specific_symbol_import():
    print("=" * 65)
    print("3. SPECIFIC SYMBOL IMPORT & ALIASING (from ... import ...)")
    print("=" * 65)

    # Direct access to Decimal without decimal. prefix
    course_fee = Decimal("4500.555")
    rounded_fee = course_fee.quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    print(f"Exact Decimal Fee   : INR {rounded_fee} (Zero Floating-point drift)")

    # Aliased function call
    scores = [95, 88, 92, 96, 90]
    avg_score = calculate_average(scores)
    print(f"calculate_average() : {avg_score:.1f}%\n")


def demonstrate_wildcard_import_danger():
    print("=" * 65)
    print("4. THE WILDCARD IMPORT ANTI-PATTERN (from module import *)")
    print("=" * 65)
    print("""
Why 'from module import *' is DANGEROUS in Production:
  1. Namespace Pollution: Floods the local namespace with hundreds of symbols.
  2. Silent Shadowing: If module_a and module_b both define 'connect()',
     the second wildcard import silently overwrites the first without warning!
  3. Code Opacity: Linters, IDEs, and code reviewers cannot trace where a function
     originated (e.g. is 'pi' coming from math, numpy, or a custom file?).
  4. Tooling Breakdown: Autocomplete and static analysis tools become sluggish.
""")


if __name__ == "__main__":
    demonstrate_import_syntaxes()
    demonstrate_aliased_import()
    demonstrate_specific_symbol_import()
    demonstrate_wildcard_import_danger()
