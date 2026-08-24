# topic8_files/virtualenv_detection_and_isolation_audit.py
# Module: 002_009_modules-packages
# Topic: Creating and managing Virtual Environments (venv)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 3: Programmatic Virtual Environment Detection & Isolation Audit
Demonstrates:
  1. Programmatically detecting whether code is running inside a virtualenv
  2. Inspecting sys.prefix, sys.base_prefix, and $VIRTUAL_ENV
  3. Verifying isolation from system-wide packages
"""

import sys
import os
import site

def audit_runtime_environment():
    print("=" * 65)
    print("1. RUNTIME VIRTUAL ENVIRONMENT DIAGNOSTIC")
    print("=" * 65)

    is_in_venv = sys.prefix != sys.base_prefix
    virtual_env_var = os.environ.get("VIRTUAL_ENV", None)

    print(f"CPython Executable       : '{sys.executable}'")
    print(f"Active sys.prefix        : '{sys.prefix}'")
    print(f"Base sys.base_prefix     : '{sys.base_prefix}'")
    print(f"VIRTUAL_ENV Env Variable : {virtual_env_var}")
    print(f"Is Isolated in venv?     : {is_in_venv}\n")

    if is_in_venv:
        print("[STATUS] Running in an ISOLATED Virtual Environment.")
    else:
        print("[STATUS] Running in the GLOBAL/SYSTEM Python Environment.")


def inspect_site_packages_isolation():
    print("\n" + "=" * 65)
    print("2. SITE-PACKAGES LOCATIONS ON sys.path")
    print("=" * 65)

    site_pkgs = [p for p in sys.path if "site-packages" in p]
    print(f"Total site-packages registered: {len(site_pkgs)}")
    for p in site_pkgs:
        print(f"  * '{p}'")


if __name__ == "__main__":
    audit_runtime_environment()
    inspect_site_packages_isolation()
