# topic0_files/import_internals_and_bytecode.py
# Module: 002_009_modules-packages
# Topic: import & from-import syntax variations
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 2: Python Import Execution Lifecycle & Bytecode Compilation
Demonstrates:
  1. The 4-step import lifecycle (sys.modules -> sys.path -> __pycache__ -> exec)
  2. Inspecting loaded modules in sys.modules cache
  3. Dynamic programmatic imports using importlib.import_module()
  4. Module reloading at runtime using importlib.reload()
"""

import sys
import importlib
import math

def explain_import_lifecycle():
    print("=" * 65)
    print("1. THE 4-STEP CPYTHON IMPORT LIFECYCLE")
    print("=" * 65)
    print("""
When you execute `import my_module`, Python executes 4 sequential steps:

  Step 1: Cache Inspection (sys.modules)
    Checks the global dictionary `sys.modules`. If `my_module` is already loaded,
    it returns the cached reference immediately (zero disk I/O, lightning fast).

  Step 2: Finder Search (sys.path)
    If not cached, Python's import finders search the directories listed in `sys.path`
    (current working directory, PYTHONPATH, standard library, and site-packages).

  Step 3: Loader & Bytecode Compilation (__pycache__)
    Compiles the `.py` source into Python bytecode (`.pyc`) stored in `__pycache__/`.
    If the `.pyc` exists and has a timestamp newer than the `.py` file, it skips compilation.

  Step 4: Module Execution & Namespace Binding
    Creates a new empty module object, executes all top-level statements in that
    module's namespace, registers it in `sys.modules`, and binds the name locally.
""")


def inspect_sys_modules_cache():
    print("=" * 65)
    print("2. INSPECTING sys.modules IN-MEMORY CACHE")
    print("=" * 65)

    print(f"Total Loaded Modules in Cache : {len(sys.modules)}")
    print(f"Is 'math' in sys.modules?     : {'math' in sys.modules}")
    print(f"Is 'json' in sys.modules?     : {'json' in sys.modules}\n")

    # Accessing module object from cache
    cached_math = sys.modules["math"]
    print(f"Module Object from Cache      : {cached_math}")
    print(f"cached_math.sqrt(64)          : {cached_math.sqrt(64)}")


def demonstrate_dynamic_import():
    print("\n" + "=" * 65)
    print("3. DYNAMIC PROGRAMMATIC IMPORTS (importlib.import_module)")
    print("=" * 65)

    # Useful for plugin architectures or loading modules based on config strings
    module_name = "json"
    dynamic_mod = importlib.import_module(module_name)

    sample_dict = {"course": "Python Pro", "institute": "Coder & AccoTax", "center": "Barrackpore"}
    json_str = dynamic_mod.dumps(sample_dict, indent=2)

    print(f"Dynamically Loaded Module     : {dynamic_mod.__name__}")
    print(f"Executed json.dumps() Output  :\n{json_str}")


if __name__ == "__main__":
    explain_import_lifecycle()
    inspect_sys_modules_cache()
    demonstrate_dynamic_import()
