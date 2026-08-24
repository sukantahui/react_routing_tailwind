# topic1_files/module_namespace_and_globals.py
# Module: 002_009_modules-packages
# Topic: Module search path (sys.path) and module namespace
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 2: Module Namespace Anatomy, Dunder Attributes & globals()
Demonstrates:
  1. Every module owns an isolated dictionary namespace (module.__dict__)
  2. Standard module dunder metadata (__name__, __file__, __doc__, __package__, __spec__)
  3. Dynamic inspection using dir(), vars(), and getattr()
  4. Difference between module-level globals() and local function locals()
"""

import math
import types

# Module-level variable in this script's global namespace
INSTITUTE_NAME = "Coder & AccoTax"
LOCATION = "Barrackpore, West Bengal"

def inspect_module_namespace():
    print("=" * 65)
    print("1. MODULE OBJECT & NAMESPACE DICTIONARY (__dict__)")
    print("=" * 65)

    print(f"Type of math module       : {type(math)}")
    print(f"Is instance of ModuleType : {isinstance(math, types.ModuleType)}\n")

    # Accessing symbols directly from math's internal __dict__
    math_dict = math.__dict__
    print(f"Total attributes in math  : {len(math_dict)}")
    print(f"math.__dict__['pi']       : {math_dict['pi']}")
    print(f"math.__dict__['sqrt']     : {math_dict['sqrt']}\n")


def inspect_module_dunder_attributes():
    print("=" * 65)
    print("2. ESSENTIAL MODULE DUNDER METADATA ATTRIBUTES")
    print("=" * 65)

    print(f"__name__    : {__name__} (Execution Mode Identifier)")
    print(f"__file__    : {__file__} (Source File on Disk)")
    print(f"__doc__     : {__doc__[:50]}... (Docstring)")
    print(f"__package__ : {__package__} (Parent Package Path)")


def inspect_globals_vs_locals():
    print("\n" + "=" * 65)
    print("3. globals() VS locals() IN MODULE EXECUTION")
    print("=" * 65)

    def sample_calculator(rate: float) -> float:
        # Local function namespace
        tax = 18.0
        calculated = rate * (1 + tax / 100)
        print(f"  [Inside function] locals() keys : {list(locals().keys())}")
        return calculated

    print(f"Module globals() keys (Sample):")
    sample_globals = [k for k in globals().keys() if not k.startswith("__")]
    print(f"  -> {sample_globals}\n")

    print("Calling sample_calculator():")
    res = sample_calculator(100.0)
    print(f"  Result: INR {res:.2f}")


if __name__ == "__main__":
    inspect_module_namespace()
    inspect_module_dunder_attributes()
    inspect_globals_vs_locals()
