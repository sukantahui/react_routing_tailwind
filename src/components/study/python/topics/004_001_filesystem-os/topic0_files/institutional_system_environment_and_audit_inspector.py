# topic0_files/institutional_system_environment_and_audit_inspector.py
# Module: 004_001_filesystem-os
# Topic: os module: environment variables, cwd, file system queries
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 4: Institutional System Environment & Health Inspector (Case Study)
Demonstrates:
  1. Complete system runtime inspection suite for Coder & AccoTax backend servers
  2. Verifying mandatory environment variables, secret tokens, and database endpoints
  3. Validating logging directories, permission bits, and generating compliance reports
"""

import os
import sys
import shutil
from datetime import datetime
from typing import Dict, Any, List, Tuple

class InstitutionalSystemEnvironmentAuditor:
    """Production runtime environment auditor for Coder & AccoTax servers."""

    MANDATORY_ENV_VARS = [
        ("ACCOTAX_NODE_ENV", "production"),
        ("ACCOTAX_DATABASE_URL", "postgresql://db.accotax.internal:5432/main"),
        ("ACCOTAX_STORAGE_ROOT", "accotax_storage_vault"),
        ("ACCOTAX_API_KEY", "DEMO_KEY_SECRET_789")
    ]

    def __init__(self):
        self.audit_log: List[str] = []

    def setup_mock_environment(self):
        """Sets up institutional environment variables for audit testing."""
        for key, val in self.MANDATORY_ENV_VARS:
            os.environ.setdefault(key, val)

    def run_full_system_audit(self) -> Dict[str, Any]:
        """Runs end-to-end environment, process, and filesystem health audit."""
        # 1. Environment Variables Check
        missing_vars = []
        env_inventory = {}
        for key, default in self.MANDATORY_ENV_VARS:
            val = os.getenv(key)
            if not val:
                missing_vars.append(key)
            else:
                # Mask sensitive secrets
                masked_val = val[:4] + "****" if "KEY" in key or "SECRET" in key else val
                env_inventory[key] = masked_val

        # 2. Process & Runtime Info
        process_info = {
            "pid": os.getpid(),
            "os_name": os.name,
            "platform": sys.platform,
            "python_version": sys.version.split()[0],
            "cwd": os.getcwd(),
            "cpu_cores": os.cpu_count() or 1
        }

        # 3. Storage Vault & Directory Verification
        storage_root = os.getenv("ACCOTAX_STORAGE_ROOT", "accotax_storage_vault")
        log_dir = os.path.join(storage_root, "system_logs")
        os.makedirs(log_dir, exist_ok=True)

        is_readable = os.access(log_dir, os.R_OK)
        is_writable = os.access(log_dir, os.W_OK)

        # Write test health heartbeat
        heartbeat_file = os.path.join(log_dir, "heartbeat.log")
        with open(heartbeat_file, "a", encoding="utf-8") as f:
            f.write(f"[{datetime.now().isoformat()}] AUDIT_HEARTBEAT_OK - PID: {os.getpid()}\n")

        heartbeat_stat = os.stat(heartbeat_file)

        is_healthy = len(missing_vars) == 0 and is_readable and is_writable

        return {
            "is_system_healthy": is_healthy,
            "missing_env_vars": missing_vars,
            "environment_inventory": env_inventory,
            "process_metadata": process_info,
            "storage_audit": {
                "storage_root": os.path.abspath(storage_root),
                "is_readable": is_readable,
                "is_writable": is_writable,
                "heartbeat_log_size": heartbeat_stat.st_size
            }
        }


def demonstrate_system_auditor():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL SYSTEM ENVIRONMENT AUDITOR")
    print("=" * 70)

    auditor = InstitutionalSystemEnvironmentAuditor()
    auditor.setup_mock_environment()
    report = auditor.run_full_system_audit()

    print("1. System Health & Compliance Overview:")
    print(f"   * System Overall Health Status : {'[HEALTHY]' if report['is_system_healthy'] else '[DEGRADED]'}")
    print(f"   * Missing Mandatory Variables : {report['missing_env_vars']}\n")

    print("2. Process Runtime Metadata:")
    proc = report["process_metadata"]
    print(f"   * Process ID (PID)  : {proc['pid']}")
    print(f"   * Python Version    : {proc['python_version']} on {proc['platform']} (`{proc['os_name']}`)")
    print(f"   * Current Working Dir: {proc['cwd']}")
    print(f"   * CPU Cores Online  : {proc['cpu_cores']}\n")

    print("3. Environment Variables Inventory:")
    for k, v in report["environment_inventory"].items():
        print(f"   * {k:<22} = {v}")

    print("\n4. Storage Directory & Permission Audit:")
    storage = report["storage_audit"]
    print(f"   * Storage Vault Path : {storage['storage_root']}")
    print(f"   * Vault Permissions  : Read={storage['is_readable']} | Write={storage['is_writable']}")
    print(f"   * Heartbeat Log Size : {storage['heartbeat_log_size']} bytes")

    # Cleanup mock storage vault
    mock_root = os.getenv("ACCOTAX_STORAGE_ROOT", "accotax_storage_vault")
    if os.path.exists(mock_root):
        shutil.rmtree(mock_root)

    print("\n[PASSED] Institutional System Environment Auditor Verified.")


if __name__ == "__main__":
    demonstrate_system_auditor()
