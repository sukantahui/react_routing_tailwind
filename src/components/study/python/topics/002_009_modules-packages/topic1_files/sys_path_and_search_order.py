# topic1_files/sys_path_and_search_order.py
# Module: 002_009_modules-packages
# Topic: Module search path (sys.path) and module namespace
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 1: Python Module Search Path (sys.path) & Resolution Order
Demonstrates:
  1. Anatomy of sys.path list and resolution precedence:
     - sys.path[0]: Current script directory / working directory
     - PYTHONPATH environment variable paths
     - Standard library installation directory
     - site-packages third-party directory
  2. Programmatic sys.path manipulation (sys.path.insert vs sys.path.append)
  3. Inspecting resolved module file locations with __file__
"""

import sys
import os

def demonstrate_sys_path_anatomy():
    print("=" * 65)
    print("1. sys.path RESOLUTION PRECEDENCE ORDER")
    print("=" * 65)

    print(f"Total Search Directories in sys.path: {len(sys.path)}\n")

    # The 4 fundamental tiers of Python's search path
    print("Tier 1: Current Script Directory (sys.path[0]):")
    print(f"  -> '{sys.path[0]}'\n")

    print("Tier 2: Standard Library & Built-in Modules:")
    for p in sys.path[1:]:
        if "site-packages" not in p and os.path.exists(p):
            print(f"  -> '{p}'")
            break

    print("\nTier 3: Third-Party Libraries (site-packages):")
    for p in sys.path:
        if "site-packages" in p:
            print(f"  -> '{p}'")
            break


def demonstrate_programmatic_path_manipulation():
    print("\n" + "=" * 65)
    print("2. PROGRAMMATIC PATH INJECTION (sys.path.insert)")
    print("=" * 65)

    custom_lib_dir = os.path.abspath("./custom_libs")

    print(f"Original sys.path length: {len(sys.path)}")
    
    # Inserting at index 0 gives highest priority for custom packages
    if custom_lib_dir not in sys.path:
        sys.path.insert(0, custom_lib_dir)
        print(f"Injected custom path at index 0: '{custom_lib_dir}'")
        print(f"New sys.path[0]: '{sys.path[0]}'")

    # Clean up
    if custom_lib_dir in sys.path:
        sys.path.remove(custom_lib_dir)
        print(f"Safely removed custom path from sys.path.")


def demonstrate_module_location_inspection():
    print("\n" + "=" * 65)
    print("3. INSPECTING RESOLVED MODULE FILE PATHS (__file__)")
    print("=" * 65)

    import json
    import statistics

    print(f"json module path       : '{json.__file__}'")
    print(f"statistics module path : '{statistics.__file__}'")
    print(f"sys (Built-in C) path  : {getattr(sys, '__file__', 'None (Compiled into CPython binary)')}")


if __name__ == "__main__":
    demonstrate_sys_path_anatomy()
    demonstrate_programmatic_path_manipulation()
    demonstrate_module_location_inspection()
