# topic3_files/export_control_with_all.py
# Module: 002_009_modules-packages
# Topic: Creating and structuring custom user-defined modules
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 2: Public API Control with __all__ & Private Symbol Encapsulation
Demonstrates:
  1. How __all__ specifies the public interface whitelist for wildcard imports
  2. The difference between modules with __all__ vs without __all__
  3. Private symbol conventions (_leading_underscore)
  4. Programmatically inspecting a module's public vs private interface
"""

import types

# Simulating a custom module namespace with __all__
sample_code = """
__all__ = ['public_fee_calculator', 'PUBLIC_DISCOUNT_CODE']

PUBLIC_DISCOUNT_CODE = 'BARRACKPORE2026'
_INTERNAL_API_SECRET = 'super_secret_tax_key_9402'

def public_fee_calculator(amount):
    return amount * 0.9

def _internal_db_sync():
    return 'Database synced privately'

def helper_without_underscore():
    return 'I will NOT be exported because __all__ is defined!'
"""

def demonstrate_all_whitelist_mechanism():
    print("=" * 65)
    print("1. HOW __all__ RESTRICTS PUBLIC EXPORTS")
    print("=" * 65)

    # Dynamically create and execute the module
    mock_module = types.ModuleType("fee_engine")
    exec(sample_code, mock_module.__dict__)

    print(f"Module __all__ whitelist : {mock_module.__all__}\n")

    # Symbols that WOULD be imported on 'from fee_engine import *'
    wildcard_exports = mock_module.__all__
    print(f"Symbols exported by 'from fee_engine import *':")
    for symbol in wildcard_exports:
        print(f"  * [EXPORTED] '{symbol}'")

    # Symbols that are EXCLUDED from wildcard import
    all_keys = [k for k in mock_module.__dict__.keys() if not k.startswith("__")]
    excluded = [k for k in all_keys if k not in wildcard_exports]
    print(f"\nSymbols EXCLUDED by __all__:")
    for symbol in excluded:
        print(f"  * [EXCLUDED] '{symbol}'")


def explain_export_rules():
    print("\n" + "=" * 65)
    print("2. PYTHON MODULE EXPORT INVARIANTS")
    print("=" * 65)
    print("""
Case 1: When __all__ IS defined:
  - `from module import *` imports ONLY the identifiers listed in `__all__`.
  - Any function or constant omitted from `__all__` is completely hidden from wildcard imports.

Case 2: When __all__ is NOT defined:
  - `from module import *` imports ALL symbols in the file EXCEPT those starting with `_`.

Direct Explicit Imports (Always Allowed):
  - Even if `_internal_db_sync` or `helper_without_underscore` are not in `__all__`,
    writing `from module import _internal_db_sync` or `module._internal_db_sync()`
    will still work (Python relies on developer convention: "We are all consenting adults").
""")


if __name__ == "__main__":
    demonstrate_all_whitelist_mechanism()
    explain_export_rules()
