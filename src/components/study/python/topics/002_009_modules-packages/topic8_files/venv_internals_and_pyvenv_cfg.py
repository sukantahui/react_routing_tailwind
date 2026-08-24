# topic8_files/venv_internals_and_pyvenv_cfg.py
# Module: 002_009_modules-packages
# Topic: Creating and managing Virtual Environments (venv)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 1: Virtual Environment Anatomy, pyvenv.cfg & sys.prefix Mechanics
Demonstrates:
  1. What 'python -m venv .venv' generates on disk
  2. The role of pyvenv.cfg in redirecting standard library lookups
  3. How CPython differentiates base Python (sys.base_prefix) from virtualenv (sys.prefix)
  4. Complete directory layout across Windows vs Linux/macOS
"""

import sys
import os

def explain_venv_directory_layout():
    print("=" * 65)
    print("1. VIRTUAL ENVIRONMENT DIRECTORY ANATOMY")
    print("=" * 65)
    print(r"""
Created via: $ python -m venv .venv

Windows Layout:
  .venv/
  |-- pyvenv.cfg                  <- Configuration pointer
  |-- Scripts/                    <- Binaries & Activation Scripts
  |   |-- python.exe
  |   |-- pip.exe
  |   |-- Activate.ps1            <- PowerShell activation script
  |   \-- activate.bat            <- Command Prompt activation script
  |-- Lib/
  |   \-- site-packages/          <- Isolated 3rd-party packages
  \-- Include/

Linux / macOS Layout:
  .venv/
  |-- pyvenv.cfg
  |-- bin/
  |   |-- python -> /usr/bin/python3
  |   |-- pip
  |   \-- activate                <- Bash/Zsh activation script
  |-- lib/python3.13/site-packages/
  \-- include/
""")


def explain_pyvenv_cfg_and_prefixes():
    print("=" * 65)
    print("2. pyvenv.cfg & CPYTHON PREFIX REDIRECTION")
    print("=" * 65)

    is_in_venv = sys.prefix != sys.base_prefix

    print("Current Runtime Isolation Status:")
    print(f"  * sys.base_prefix (Global Base): '{sys.base_prefix}'")
    print(f"  * sys.prefix      (Active Env) : '{sys.prefix}'")
    print(f"  * Inside Virtual Environment?  : {is_in_venv}\n")

    print(r"""
Sample pyvenv.cfg Content:
  home = C:\Users\sukan\AppData\Local\Programs\Python\Python313
  include-system-site-packages = false
  version = 3.13.2
  executable = C:\Users\sukan\AppData\Local\Programs\Python\Python313\python.exe
  command = python -m venv .venv

How CPython Boots:
  1. python.exe looks for `pyvenv.cfg` in its directory or parent folder.
  2. If found, CPython sets `sys.prefix` to the folder containing `pyvenv.cfg`.
  3. It points `site-packages` to `.venv/Lib/site-packages`.
  4. It keeps `sys.base_prefix` pointing to the real standard library installation!
""")


if __name__ == "__main__":
    explain_venv_directory_layout()
    explain_pyvenv_cfg_and_prefixes()
