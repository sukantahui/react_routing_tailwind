# topic8_files/automated_project_environment_bootstrap.py
# Module: 002_009_modules-packages
# Topic: Creating and managing Virtual Environments (venv)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 4: Automated Project Environment Initializer & Health Check Suite
Demonstrates:
  1. Automated environment verification for enterprise Python projects
  2. Enforcing minimum Python version requirements (Python >= 3.10)
  3. Generating a health report before deploying or running tests
"""

import sys
import os
import datetime as dt
from typing import Dict, Any

class EnvironmentBootstrapper:
    """Enterprise Environment Verifier & Project Guard."""

    MINIMUM_PYTHON = (3, 10)

    @classmethod
    def verify_runtime_health(cls) -> Dict[str, Any]:
        """Runs full health diagnostic on the current Python process."""
        current_version = sys.version_info[:2]
        version_ok = current_version >= cls.MINIMUM_PYTHON
        is_virtual = sys.prefix != sys.base_prefix

        return {
            "timestamp": dt.datetime.now(),
            "python_version": f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}",
            "version_compatible": version_ok,
            "is_virtual_env": is_virtual,
            "executable": sys.executable,
            "prefix": sys.prefix,
            "platform": sys.platform,
        }


def run_bootstrap_diagnostic():
    print("=" * 70)
    print("CODER & ACCOTAX - PROJECT ENVIRONMENT BOOTSTRAP DIAGNOSTIC")
    print("=" * 70)

    report = EnvironmentBootstrapper.verify_runtime_health()

    print(f"Diagnostic Date    : {report['timestamp']:%d-%b-%Y %I:%M %p}")
    print(f"CPython Version    : {report['python_version']} (Compatible: {report['version_compatible']})")
    print(f"Host Platform      : {report['platform']}")
    print(f"Active Executable  : {report['executable']}")
    print(f"Environment Prefix : {report['prefix']}")
    print(f"Is Isolated (venv) : {report['is_virtual_env']}")
    print("-" * 70)

    if not report["version_compatible"]:
        print("[WARNING] Python 3.10+ is required for modern typing features!")
    else:
        print("[PASSED] Python Runtime meets enterprise requirements.")


if __name__ == "__main__":
    run_bootstrap_diagnostic()
