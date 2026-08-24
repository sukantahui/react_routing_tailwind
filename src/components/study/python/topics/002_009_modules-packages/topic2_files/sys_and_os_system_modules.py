# topic2_files/sys_and_os_system_modules.py
# Module: 002_009_modules-packages
# Topic: Built-in standard library modules: math, random, datetime, sys, os
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 3: sys & os System & Operating System Bridge Modules
Demonstrates:
  1. sys module: sys.argv, sys.platform, sys.version, sys.getsizeof()
  2. os module: os.getcwd(), os.listdir(), os.environ environment variables
  3. os.path: Cross-platform path construction (os.path.join vs string concat)
  4. Memory footprint inspection for core Python data types
"""

import sys
import os

def demonstrate_sys_module():
    print("=" * 65)
    print("1. sys MODULE: INTERPRETER RUNTIME METADATA")
    print("=" * 65)

    print(f"Python Version       : {sys.version.split()[0]}")
    print(f"Operating Platform   : {sys.platform} (e.g. win32, linux, darwin)")
    print(f"CPython Executable   : '{sys.executable}'")
    print(f"Command-Line argv    : {sys.argv}\n")

    # Object Memory Footprint (sys.getsizeof in bytes)
    sample_int = 42
    sample_str = "Coder & AccoTax Barrackpore"
    sample_list = [1, 2, 3, 4, 5]
    sample_dict = {"a": 1, "b": 2}

    print("Memory Consumption (sys.getsizeof):")
    print(f"  * int (42)         : {sys.getsizeof(sample_int)} bytes")
    print(f"  * str ('{sample_str[:12]}...'): {sys.getsizeof(sample_str)} bytes")
    print(f"  * list (5 items)   : {sys.getsizeof(sample_list)} bytes")
    print(f"  * dict (2 items)   : {sys.getsizeof(sample_dict)} bytes\n")


def demonstrate_os_and_os_path():
    print("=" * 65)
    print("2. os & os.path: FILE SYSTEM & ENVIRONMENT BRIDGE")
    print("=" * 65)

    # Current working directory
    cwd = os.getcwd()
    print(f"Current Working Dir  : '{cwd}'")

    # Safe cross-platform path joining (Handles Windows \\ vs Unix / automatically)
    reports_dir = os.path.join(cwd, "reports", "2026", "august")
    print(f"os.path.join() Path  : '{reports_dir}'")
    print(f"Path Exists?         : {os.path.exists(reports_dir)}\n")

    # Environment variables inspection
    os_name = os.environ.get("OS", "Unknown OS")
    user_name = os.environ.get("USERNAME", os.environ.get("USER", "DefaultUser"))
    print(f"OS Environment       : {os_name}")
    print(f"Active User Account  : {user_name}")

    # Directory contents listing (first 5 files)
    entries = os.listdir(cwd)[:5]
    print(f"Directory Entries (5): {entries}")


if __name__ == "__main__":
    demonstrate_sys_module()
    demonstrate_os_and_os_path()
