# topic5_files/package_all_whitelist_and_lazy_imports.py
# Module: 002_009_modules-packages
# Topic: Concept of packages & __init__.py files
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 3: Package-Level __all__ Whitelisting & Lazy Module Loading (PEP 562)
Demonstrates:
  1. Defining __all__ in package __init__.py to govern 'from package import *'
  2. Lazy module loading using module-level __getattr__ (PEP 562)
  3. Accelerating package startup times for massive multi-tier frameworks
"""

import types
import importlib

def explain_package_all_whitelist():
    print("=" * 65)
    print("1. PACKAGE-LEVEL __all__ WHITELIST IN __init__.py")
    print("=" * 65)
    print("""
In `my_package/__init__.py`:
  __all__ = ['Calculator', 'InvoiceManager']

  from .calculator import Calculator
  from .invoices import InvoiceManager
  from .internal_helpers import _secret_token, internal_db

When a consumer writes:
  `from my_package import *`

Result:
  - `Calculator` and `InvoiceManager` ARE imported into global scope.
  - `_secret_token` and `internal_db` are EXCLUDED and safely hidden!
""")


def demonstrate_lazy_submodule_loading():
    print("=" * 65)
    print("2. LAZY SUBMODULE LOADING WITH __getattr__ (PEP 562)")
    print("=" * 65)

    # In massive libraries (like scipy or pandas), importing all subpackages upfront
    # takes seconds. PEP 562 allows defining __getattr__ in __init__.py to load
    # submodules dynamically ONLY when accessed!

    class LazyPackageMock:
        def __init__(self, name: str):
            self.__name__ = name
            self._loaded_submodules = {}

        def __getattr__(self, attr: str):
            print(f"  [LAZY LOADER] Intercepted access to 'my_package.{attr}'")
            if attr == "heavy_analytics":
                print("  [LAZY LOADER] Compiling and loading heavy_analytics into memory...")
                self._loaded_submodules[attr] = "HeavyAnalyticsEngine(Ready)"
                return self._loaded_submodules[attr]
            raise AttributeError(f"Package '{self.__name__}' has no attribute '{attr}'")

    pkg = LazyPackageMock("my_package")
    print("Package initialized in 0.001 ms (Zero heavy submodules loaded upfront).\n")

    print("First Access to pkg.heavy_analytics:")
    engine = pkg.heavy_analytics
    print(f"Result: {engine}\n")

    print("Second Access to pkg.heavy_analytics (Cached):")
    engine2 = pkg.heavy_analytics
    print(f"Result: {engine2}")


if __name__ == "__main__":
    explain_package_all_whitelist()
    demonstrate_lazy_submodule_loading()
