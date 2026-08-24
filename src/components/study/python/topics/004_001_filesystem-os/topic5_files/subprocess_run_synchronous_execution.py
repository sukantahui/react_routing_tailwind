# topic5_files/subprocess_run_synchronous_execution.py
# Module: 004_001_filesystem-os
# Topic: Running external shell commands using subprocess module (run, Popen, pipes)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 1: `subprocess.run()` Synchronous Command Execution
Demonstrates:
  1. Synchronous execution with `subprocess.run()`: `capture_output=True`, `text=True`
  2. Inspecting `CompletedProcess`: `.returncode`, `.stdout`, `.stderr`, `.args`
  3. Handling `check=True` & `subprocess.CalledProcessError`
  4. Setting execution timeouts (`timeout=5.0`) & `subprocess.TimeoutExpired`
  5. Security invariant: Safe token lists vs dangerous `shell=True` (Command Injection)
"""

import sys
import subprocess
from typing import List

def demonstrate_subprocess_run():
    print("=" * 70)
    print("CODER & ACCOTAX - SUBPROCESS.RUN() SYNCHRONOUS EXECUTION")
    print("=" * 70)

    # 1. Safe Synchronous Command with Output Capture:
    print("1. Safe Command Execution with `capture_output=True, text=True`:")
    python_cmd = [sys.executable, "-c", "import sys; print(f'Python Kernel {sys.version.split()[0]} Online')"]
    
    result = subprocess.run(
        python_cmd,
        capture_output=True,
        text=True,
        check=True
    )

    print(f"   * Executed Command   : {' '.join(result.args)}")
    print(f"   * Process Returncode : {result.returncode} (0 = Success)")
    print(f"   * Standard Output    : {result.stdout.strip()}")
    print(f"   * Standard Error     : {result.stderr.strip() or 'None'}\n")

    # 2. Defensive Error Handling with check=True:
    print("2. Handling Non-Zero Exit Codes with `check=True`:")
    failing_cmd = [sys.executable, "-c", "import sys; sys.exit(42)"]
    try:
        subprocess.run(failing_cmd, check=True, capture_output=True, text=True)
    except subprocess.CalledProcessError as exc:
        print(f"   * [DEFENSIVE ERROR CAUGHT] CalledProcessError: Command failed with exit code {exc.returncode}")
        print(f"   * Failed Command: {' '.join(exc.cmd)}\n")

    # 3. Timeout Protection with timeout parameter:
    print("3. Timeout Protection against Hanging Commands (`timeout=2.0`):")
    hanging_cmd = [sys.executable, "-c", "import time; time.sleep(10)"]
    try:
        subprocess.run(hanging_cmd, timeout=0.5, capture_output=True, text=True)
    except subprocess.TimeoutExpired as exc:
        print(f"   * [TIMEOUT TRIGGERED] Process exceeded limit: {exc.timeout}s")
        print(f"   * Subprocess was automatically killed by Python runtime.\n")

    # 4. Security Critical: Shell Injection Prevention:
    print("4. Security Invariant: Why `shell=True` is Dangerous:")
    print("   * VULNERABLE: `subprocess.run(f'ping {user_input}', shell=True)` -> Injection Risk!")
    print("   * SECURE    : `subprocess.run(['ping', user_input])` -> Parameterized List!")

    print(r"""
subprocess.run Invariants:
  1. Always pass command arguments as a list of strings (`['python', '-V']`) rather than a single raw string with `shell=True`.
  2. `capture_output=True` captures both stdout and stderr; `text=True` decodes bytes into str automatically.
  3. `check=True` raises `CalledProcessError` on non-zero exit codes, preventing silent failures.
  4. Always specify a reasonable `timeout=` when invoking external network or long-running binaries.
""")
    print("[PASSED] subprocess.run Synchronous Execution Verified.")


if __name__ == "__main__":
    demonstrate_subprocess_run()
