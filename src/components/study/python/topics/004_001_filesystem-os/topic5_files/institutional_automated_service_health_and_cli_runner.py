# topic5_files/institutional_automated_service_health_and_cli_runner.py
# Module: 004_001_filesystem-os
# Topic: Running external shell commands using subprocess module (run, Popen, pipes)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 4: Institutional Service Health Inspector & Command Runner (Case Study)
Demonstrates:
  1. Production external command runner and system health audit engine
  2. Safe parameterized list execution for Git, Python runtime, and host system checks
  3. Defensive timeout mitigation, returncode evaluation, and JSON compliance reporting
"""

import sys
import json
import subprocess
from typing import Dict, Any, List

class InstitutionalServiceHealthInspector:
    """Production external command executor and system health diagnostics engine."""

    def __init__(self):
        self.diagnostics: List[Dict[str, Any]] = []

    def execute_safe_command(self, cmd_args: List[str], label: str, timeout: float = 3.0) -> Dict[str, Any]:
        """Executes an external binary safely using subprocess.run with timeout protection."""
        try:
            res = subprocess.run(
                cmd_args,
                capture_output=True,
                text=True,
                timeout=timeout
            )
            success = (res.returncode == 0)
            record = {
                "label": label,
                "command": " ".join(cmd_args),
                "success": success,
                "exit_code": res.returncode,
                "stdout": res.stdout.strip(),
                "stderr": res.stderr.strip()
            }
        except subprocess.TimeoutExpired as e:
            record = {
                "label": label,
                "command": " ".join(cmd_args),
                "success": False,
                "exit_code": -1,
                "stdout": "",
                "stderr": f"Command timed out after {timeout}s"
            }
        except FileNotFoundError:
            record = {
                "label": label,
                "command": " ".join(cmd_args),
                "success": False,
                "exit_code": -1,
                "stdout": "",
                "stderr": f"Executable '{cmd_args[0]}' not found in system PATH"
            }

        self.diagnostics.append(record)
        return record

    def run_full_system_diagnostic_suite(self) -> Dict[str, Any]:
        """Executes full diagnostic suite across runtime, git repository, and internal APIs."""
        # 1. Python Runtime Check
        self.execute_safe_command(
            [sys.executable, "-V"],
            label="Python Runtime Version"
        )

        # 2. Python Environment Architecture
        self.execute_safe_command(
            [sys.executable, "-c", "import platform; print(f'{platform.system()} {platform.machine()} - {platform.python_implementation()}')"],
            label="Host OS & Architecture"
        )

        # 3. Simulated Microservice Heartbeat Process
        self.execute_safe_command(
            [sys.executable, "-c", "print('ACCOTAX_MICROSERVICE_NODE_01_HEALTHY_STATUS_200')"],
            label="Accounting Gateway API Heartbeat"
        )

        # 4. Git Repository Working Tree Status
        self.execute_safe_command(
            ["git", "rev-parse", "--short", "HEAD"],
            label="Git Repository Commit Hash"
        )

        total_checks = len(self.diagnostics)
        passed_checks = sum(1 for d in self.diagnostics if d["success"])
        is_healthy = (passed_checks == total_checks)

        return {
            "is_system_healthy": is_healthy,
            "total_checks": total_checks,
            "passed_checks": passed_checks,
            "compliance_percentage": (passed_checks / total_checks) * 100 if total_checks else 0,
            "diagnostic_records": self.diagnostics
        }


def demonstrate_health_runner():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL SERVICE HEALTH INSPECTOR")
    print("=" * 70)

    inspector = InstitutionalServiceHealthInspector()
    report = inspector.run_full_system_diagnostic_suite()

    print("1. System Health Diagnostic Summary:")
    print(f"   * Overall System Health  : {'[HEALTHY]' if report['is_system_healthy'] else '[DEGRADED]'}")
    print(f"   * Diagnostics Passed     : {report['passed_checks']} / {report['total_checks']} ({report['compliance_percentage']:.1f}%)\n")

    print("2. Individual Diagnostic Check Records:")
    for record in report["diagnostic_records"]:
        status_tag = "[PASS]" if record["success"] else "[FAIL]"
        print(f"   * {status_tag} {record['label']:<34} (Exit: {record['exit_code']})")
        if record["stdout"]:
            print(f"          Output: {record['stdout']}")
        if record["stderr"]:
            print(f"          Error : {record['stderr']}")

    print("\n[PASSED] Institutional Service Health Inspector Verified.")


if __name__ == "__main__":
    demonstrate_health_runner()
