# topic7_files/pip_command_lifecycle_and_pypi.py
# Module: 002_009_modules-packages
# Topic: Third-party packages and pip package manager
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 1: Pip Command Lifecycle, PyPI Ecosystem & Interpreter Binding
Demonstrates:
  1. What is PyPI (Python Package Index) and how pip downloads wheels
  2. Essential pip CLI operations (install, upgrade, uninstall, list, show)
  3. Why 'python -m pip install' is vastly superior to bare 'pip install'
  4. Programmatically inspecting installed packages using importlib.metadata
"""

import sys
import importlib.metadata
from typing import List, Dict

def explain_pip_and_pypi_fundamentals():
    print("=" * 65)
    print("1. THE PIP & PyPI ECOSYSTEM")
    print("=" * 65)
    print(r"""
What is PyPI (Python Package Index)?
  - PyPI (pypi.org) is the official public repository storing over 500,000+
    open-source Python packages (e.g. requests, pandas, fastapi, numpy).

What is pip?
  - `pip` is the standard package installer for Python, included with CPython 3.4+.

Essential Pip Commands Cheatsheet:
  ----------------------------------------------------------------------
  Command                               Purpose
  ----------------------------------------------------------------------
  python -m pip install <package>       Installs latest compatible release
  python -m pip install <package>==2.0  Installs exact pinned version
  python -m pip install --upgrade <pkg> Upgrades package to latest release
  python -m pip uninstall <package> -y  Removes package cleanly
  python -m pip list                    Lists all installed packages
  python -m pip show <package>          Shows metadata, license, & location
  python -m pip freeze                  Dumps pinned dependencies format
""")


def explain_python_m_pip_advantage():
    print("=" * 65)
    print("2. WHY 'python -m pip' PREVENTS ENVIRONMENT DISASTERS")
    print("=" * 65)
    print(f"Current Python Executable: '{sys.executable}'\n")
    print("""
The Problem with bare `pip install`:
  - If you have multiple Python versions installed (e.g. Python 3.11 and 3.13),
    typing `pip install requests` might invoke Python 3.11's pip!
  - When you then run `python my_app.py` (which runs Python 3.13),
    you crash with `ModuleNotFoundError: No module named 'requests'`!

The Golden Solution (`python -m pip`):
  - Typing `python -m pip install requests` guarantees that pip installs
    into the EXACT Python environment currently mapped to `python`!
""")


def inspect_installed_distributions():
    print("=" * 65)
    print("3. PROGRAMMATIC INSPECTION OF INSTALLED PACKAGES")
    print("=" * 65)

    # Retrieve top 5 installed packages using standard library importlib.metadata
    dists = list(importlib.metadata.distributions())[:5]
    print(f"Total Installed Distributions Sample (First {len(dists)}):")
    for d in dists:
        print(f"  * {d.metadata['Name']:<20} -> Version {d.version}")


if __name__ == "__main__":
    explain_pip_and_pypi_fundamentals()
    explain_python_m_pip_advantage()
    inspect_installed_distributions()
