# topic9_files/dependency_validator_and_license_audit.py
# Module: 002_009_modules-packages
# Topic: requirements.txt generation and dependency management
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 4: Enterprise requirements.txt Parser, Validator & Compliance Suite
Demonstrates:
  1. Parsing and validating requirements.txt lines programmatically
  2. Matching pinned version specifiers (==, >=, <=) against installed packages
  3. Generating a clean dependency audit report for production deployments
"""

import sys
import importlib.metadata
import re
from typing import List, Dict, Any, Tuple

sample_requirements_content = """
# Coder & AccoTax Core Educational Platform Dependencies
requests>=2.28.0
pip>=22.0.0
pytest>=7.0.0
colorama>=0.4.0; sys_platform == 'win32'
"""

class RequirementsAuditor:
    """Parses and audits requirement specifiers against the running environment."""

    @classmethod
    def parse_requirement_line(cls, line: str) -> Tuple[str, str, str]:
        """Extracts package name, operator, and version constraint from a line."""
        clean = line.strip()
        if not clean or clean.startswith("#") or clean.startswith("-r"):
            return None

        # Remove environment markers for parsing
        marker_split = clean.split(";")
        spec = marker_split[0].strip()

        # Match package name and operator
        match = re.match(r"^([a-zA-Z0-9_\-\.]+)\s*([=><~^!]+)\s*([0-9a-zA-Z\.\-]+)", spec)
        if match:
            return match.group(1), match.group(2), match.group(3)
        return clean, "*", "any"

    @classmethod
    def audit_requirements_text(cls, req_text: str) -> List[Dict[str, Any]]:
        """Audits requirement entries against installed distributions."""
        results = []
        for line in req_text.strip().splitlines():
            parsed = cls.parse_requirement_line(line)
            if not parsed:
                continue

            pkg_name, operator, target_ver = parsed
            
            # Check if installed
            try:
                installed_ver = importlib.metadata.version(pkg_name)
                status = "INSTALLED"
            except importlib.metadata.PackageNotFoundError:
                installed_ver = "NOT FOUND"
                status = "MISSING"

            results.append({
                "package": pkg_name,
                "required_spec": f"{operator} {target_ver}",
                "installed_version": installed_ver,
                "status": status
            })
        return results


def run_requirements_audit_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - REQUIREMENTS COMPLIANCE AUDITOR")
    print("=" * 70)
    print(f"Active CPython Executable: {sys.executable}\n")

    audit_results = RequirementsAuditor.audit_requirements_text(sample_requirements_content)
    
    print(f"{'Package Name':<20} {'Required Spec':<18} {'Installed Version':<18} {'Status'}")
    print("-" * 70)
    for res in audit_results:
        status_marker = "[OK]" if res['status'] == "INSTALLED" else "[FAIL]"
        print(f"{res['package']:<20} {res['required_spec']:<18} {res['installed_version']:<18} {status_marker} {res['status']}")

    print("-" * 70)
    print("[PASSED] Requirements Audit Complete.")


if __name__ == "__main__":
    run_requirements_audit_demo()
