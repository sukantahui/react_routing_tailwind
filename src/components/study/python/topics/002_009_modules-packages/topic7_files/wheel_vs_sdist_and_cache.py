# topic7_files/wheel_vs_sdist_and_cache.py
# Module: 002_009_modules-packages
# Topic: Third-party packages and pip package manager
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 2: Wheels (.whl) vs Source Distributions (.tar.gz) & Pip Cache
Demonstrates:
  1. Source Distributions (sdist) vs Pre-compiled Built Distributions (Wheels)
  2. Anatomy of a Wheel Filename (Python tag, ABI tag, Platform tag)
  3. Pure Python Wheels vs Native C-Extension Binary Wheels
  4. The Pip Download Cache mechanism for offline installations
"""

def explain_wheels_vs_sdist():
    print("=" * 65)
    print("1. WHEEL (.whl) VS SOURCE DISTRIBUTION (.tar.gz)")
    print("=" * 65)
    print(r"""
Package Distribution Types on PyPI:

A. Source Distribution (.tar.gz / .zip):
   - Contains raw source code and setup scripts.
   - If the package contains C/C++ code (like NumPy, Cryptography, or Psycopg2),
     the consumer's machine MUST have a C compiler (Visual C++ / GCC) installed.
   - Slow installation (often minutes of local compilation).

B. Built Distribution / Wheel (.whl) (MODERN STANDARD):
   - A standardized ZIP archive containing pre-compiled binaries and ready-to-copy files.
   - Requires NO compiler on the consumer's machine.
   - Installs in milliseconds via direct extraction into site-packages.
""")


def dissect_wheel_filenames():
    print("=" * 65)
    print("2. ANATOMY OF A WHEEL FILENAME (PEP 427)")
    print("=" * 65)
    print(r"""
Example 1: Pure Python Package (Cross-Platform)
  requests-2.31.0-py3-none-any.whl
  |-- Distribution Name : requests
  |-- Version           : 2.31.0
  |-- Python Tag        : py3 (Works on any Python 3.x)
  |-- ABI Tag           : none (No C-ABI dependency)
  \-- Platform Tag      : any (Runs on Windows, Linux, macOS)

Example 2: Pre-compiled C Extension (Platform-Specific)
  numpy-2.1.0-cp313-cp313-win_amd64.whl
  |-- Distribution Name : numpy
  |-- Version           : 2.1.0
  |-- Python Tag        : cp313 (CPython 3.13)
  |-- ABI Tag           : cp313 (Compiled for CPython 3.13 C-API)
  \-- Platform Tag      : win_amd64 (Windows 64-bit only!)
""")


def explain_pip_cache():
    print("=" * 65)
    print("3. PIP WHEEL CACHE")
    print("=" * 65)
    print("""
When you run `pip install`, pip automatically caches the downloaded .whl file.
If you install the same package again into a new virtual environment:
  - Pip skips downloading over the internet!
  - It copies the cached wheel from local disk in 0.1 seconds.

Useful Pip Cache Commands:
  - `python -m pip cache dir`   -> Shows cache folder location on disk
  - `python -m pip cache list`  -> Lists all cached wheel files
  - `python -m pip cache purge` -> Frees disk space by deleting cached wheels
""")


if __name__ == "__main__":
    explain_wheels_vs_sdist()
    dissect_wheel_filenames()
    explain_pip_cache()
