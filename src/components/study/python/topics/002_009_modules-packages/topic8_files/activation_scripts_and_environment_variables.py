# topic8_files/activation_scripts_and_environment_variables.py
# Module: 002_009_modules-packages
# Topic: Creating and managing Virtual Environments (venv)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 2: Activation Scripts, PATH Prepending & PowerShell ExecutionPolicy
Demonstrates:
  1. What activation actually does (prepends to $PATH and sets $VIRTUAL_ENV)
  2. Cross-platform activation commands (PowerShell, CMD, Bash, Zsh)
  3. Resolving the Windows PowerShell ExecutionPolicy security error
  4. Deactivating environments cleanly
"""

import sys
import os

def explain_path_prepending_mechanism():
    print("=" * 65)
    print("1. WHAT 'ACTIVATION' ACTUALLY DOES UNDER THE HOOD")
    print("=" * 65)
    print(r"""
Activation is NOT a magic lock — it is a simple shell script that:
  1. Modifies the OS PATH environment variable:
     - Prepends `.venv/Scripts` (or `.venv/bin`) to the VERY FRONT of your system $PATH.
     - When you type `python` or `pip`, the OS finds the virtualenv's executable first!
  2. Sets the environment variable:
     - `VIRTUAL_ENV = "/path/to/.venv"`
  3. Customizes the terminal prompt string:
     - Adds `(.venv)` in front of your command prompt.

When you type `deactivate`:
  - Restores the original unmodified system $PATH.
  - Removes the `VIRTUAL_ENV` variable.
  - Restores the original terminal prompt.
""")


def explain_cross_platform_commands():
    print("=" * 65)
    print("2. CROSS-PLATFORM ACTIVATION CHEATSHEET")
    print("=" * 65)
    print(r"""
A. Windows PowerShell (Default in VS Code & Modern Windows):
   $ .\.venv\Scripts\Activate.ps1

   * FIXING POWERSHELL SECURITY ERROR:
     If you see: "cannot be loaded because running scripts is disabled on this system":
     Run once in PowerShell:
     $ Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process

B. Windows Command Prompt (cmd.exe):
   > .venv\Scripts\activate.bat

C. Linux / macOS (Bash / Zsh / Fish):
   $ source .venv/bin/activate

D. To Exit Any Virtual Environment:
   $ deactivate
""")


if __name__ == "__main__":
    explain_path_prepending_mechanism()
    explain_cross_platform_commands()
