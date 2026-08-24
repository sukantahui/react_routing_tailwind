# topic0_files/os_environment_and_process_management.py
# Module: 004_001_filesystem-os
# Topic: os module: environment variables, cwd, file system queries
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 1: `os` Environment Variables & Process Management
Demonstrates:
  1. Reading and setting environment variables: `os.environ`, `os.getenv()`, `os.environ.setdefault()`
  2. Safe fallback configurations for production secrets and database URLs
  3. Process runtime introspection: `os.getpid()`, `os.name`, `os.cpu_count()`
"""

import os
import sys

def demonstrate_os_environment_and_process():
    print("=" * 70)
    print("CODER & ACCOTAX - OS ENVIRONMENT & PROCESS MANAGEMENT")
    print("=" * 70)

    # 1. Process Metadata & Operating System Detection:
    print("1. Process & Operating System Introspection:")
    current_pid = os.getpid()
    parent_pid = os.getppid() if hasattr(os, "getppid") else "N/A"
    os_kernel_type = os.name  # 'nt' for Windows, 'posix' for Linux/macOS
    cpu_cores = os.cpu_count() or 1

    print(f"   * Current Process ID (PID)  : {current_pid}")
    print(f"   * Parent Process ID (PPID)   : {parent_pid}")
    print(f"   * OS Kernel Family (`os.name`): {os_kernel_type} ({'Windows NT' if os_kernel_type == 'nt' else 'POSIX/Unix'})")
    print(f"   * Available CPU Core Count   : {cpu_cores}\n")

    # 2. Reading Environment Variables with Fallbacks:
    print("2. Environment Variable Management (`os.getenv` vs `os.environ`):")
    # Setting institutional environment variables for demonstration:
    os.environ["ACCOTAX_CAMPUS"] = "Barrackpore Main Campus"
    os.environ["ACCOTAX_PORT"] = "8080"

    campus = os.getenv("ACCOTAX_CAMPUS", "Default Campus")
    port = int(os.getenv("ACCOTAX_PORT", "5000"))
    db_secret = os.getenv("ACCOTAX_DB_SECRET", "DEMO_SECRET_KEY_DEV_ONLY")

    print(f"   * ACCOTAX_CAMPUS (Read) : {campus}")
    print(f"   * ACCOTAX_PORT (Parsed) : {port}")
    print(f"   * ACCOTAX_DB_SECRET     : {db_secret} (Fallback loaded)\n")

    # 3. Defensive KeyError Handling:
    print("3. Defensive Lookup vs Direct Indexing:")
    # Direct access raises KeyError if missing:
    try:
        missing_val = os.environ["NON_EXISTENT_SECRET_TOKEN"]
    except KeyError:
        print("   * [DEFENSIVE ERROR CAUGHT] KeyError: 'NON_EXISTENT_SECRET_TOKEN' was not set.")
        print("   -> `os.getenv('KEY', default)` is safer than direct `os.environ['KEY']`.")

    # 4. Modifying Environment Variables safely:
    os.environ.setdefault("ACCOTAX_LOG_LEVEL", "INFO")
    print(f"\n4. Default Set: ACCOTAX_LOG_LEVEL = {os.environ['ACCOTAX_LOG_LEVEL']}")

    print(r"""
OS Environment Invariants:
  1. `os.environ` represents the environment variables inherited from the parent process.
  2. Modifying `os.environ` affects only the current Python process and child subprocesses it spawns.
  3. Always use `os.getenv("VAR_NAME", fallback)` to prevent fatal KeyErrors in production.
""")
    print("[PASSED] os Environment & Process Management Verified.")


if __name__ == "__main__":
    demonstrate_os_environment_and_process()
