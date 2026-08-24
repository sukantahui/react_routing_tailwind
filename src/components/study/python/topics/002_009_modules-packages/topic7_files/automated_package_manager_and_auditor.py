# topic7_files/automated_package_manager_and_auditor.py
# Module: 002_009_modules-packages
# Topic: Third-party packages and pip package manager
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 4: Enterprise Package Inspector & Dependency Auditor
Demonstrates:
  1. Programmatically inspecting installed package metadata via importlib.metadata
  2. Generating audit reports of installed libraries and version specifications
  3. Verifying essential dependencies for Coder & AccoTax educational backend
"""

import sys
import importlib.metadata
from typing import List, Dict, Any

class DependencyAuditor:
    """Enterprise Package Inspector and Environment Auditor."""

    @classmethod
    def audit_installed_packages(cls) -> List[Dict[str, Any]]:
        """Audits all installed distributions in the active environment."""
        results = []
        for dist in importlib.metadata.distributions():
            name = dist.metadata["Name"]
            version = dist.version
            summary = dist.metadata.get("Summary", "No summary provided")
            results.append({
                "name": name,
                "version": version,
                "summary": summary[:45] + "..." if len(summary) > 45 else summary
            })
        # Sort alphabetically by package name
        return sorted(results, key=lambda x: x["name"].lower())


def run_package_audit_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - ENTERPRISE DEPENDENCY AUDITOR")
    print("=" * 70)
    print(f"Active CPython Executable: {sys.executable}\n")

    packages = DependencyAuditor.audit_installed_packages()
    print(f"Total Installed Distributions Detected: {len(packages)}")
    print("-" * 70)
    print(f"{'Package Name':<25} {'Version':<12} {'Summary'}")
    print("-" * 70)

    # Display first 8 packages
    for pkg in packages[:8]:
        print(f"{pkg['name']:<25} {pkg['version']:<12} {pkg['summary']}")
    
    if len(packages) > 8:
        print(f"... and {len(packages) - 8} more packages installed.")

    print("\n[PASSED] Environment Dependency Inspection Completed Successfully.")


if __name__ == "__main__":
    run_package_audit_demo()
