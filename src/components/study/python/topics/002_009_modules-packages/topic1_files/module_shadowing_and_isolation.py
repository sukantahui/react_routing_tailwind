# topic1_files/module_shadowing_and_isolation.py
# Module: 002_009_modules-packages
# Topic: Module search path (sys.path) and module namespace
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 3: Module Shadowing Disasters, Diagnosis & Defensive Coding
Demonstrates:
  1. The Module Shadowing mechanism (sys.path[0] overriding Python standard library)
  2. Catastrophic real-world examples: creating math.py, random.py, csv.py, or email.py
  3. Programmatic shadowing audit engine to detect local namespace conflicts
  4. Best practices for file naming and package isolation
"""

import sys
import os
import importlib.util

# Dangerous names that novice programmers often accidentally use for script files
CRITICAL_STDLIB_MODULES = [
    "math", "random", "json", "csv", "sys", "os", "datetime",
    "email", "string", "types", "logging", "typing", "collections"
]

def explain_module_shadowing_mechanics():
    print("=" * 65)
    print("1. WHY MODULE SHADOWING HAPPENS (sys.path[0] PRECEDENCE)")
    print("=" * 65)
    print("""
How Shadowing Occurs:
  1. A developer creates a script named `random.py` to practice random numbers.
  2. In `random.py`, they write: `import random; print(random.randint(1, 10))`.
  3. Python checks `sys.path[0]` (the current directory) FIRST.
  4. It finds their local `random.py` instead of Python's standard `random.py`.
  5. The local file imports ITSELF (a partially initialized circular import)!
  6. CRASH: AttributeError: partially initialized module 'random' has no attribute 'randint'!

Even worse: Any third-party library that relies on 'random' (like numpy or faker)
will also crash mysteriously across your entire project!
""")


def audit_local_directory_for_shadowing(target_dir: str = ".") -> list:
    """Scans a directory to detect files that dangerously shadow standard library modules."""
    conflicts = []
    local_files = [f for f in os.listdir(target_dir) if f.endswith(".py")]

    for f in local_files:
        base_name = f[:-3] # Strip .py
        if base_name in CRITICAL_STDLIB_MODULES:
            conflicts.append((f, base_name))

    return conflicts


def run_shadowing_audit_demo():
    print("=" * 65)
    print("2. RUNNING AUTOMATED SHADOWING AUDIT")
    print("=" * 65)

    current_dir = os.path.abspath(".")
    print(f"Auditing Working Directory: '{current_dir}'\n")

    conflicts = audit_local_directory_for_shadowing(".")
    if conflicts:
        print("CRITICAL WARNING: Found standard library shadowing files:")
        for fname, std_mod in conflicts:
            print(f"  [DANGER] Local file '{fname}' shadows standard library '{std_mod}'!")
    else:
        print("[PASSED] AUDIT PASSED: No standard library module names shadowed in current directory.")


if __name__ == "__main__":
    explain_module_shadowing_mechanics()
    run_shadowing_audit_demo()
