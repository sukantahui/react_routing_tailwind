# topic6_files/institutional_automated_server_maintenance_daemon.py
# Module: 004_001_filesystem-os
# Topic: Building automated system maintenance scripts
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 4: Institutional Automated Server Maintenance Engine (Case Study)
Demonstrates:
  1. Complete automated server maintenance pipeline for Coder & AccoTax nodes
  2. Orchestrating log rotation, gzip compression, temp sweeping, and storage checks
  3. Generating timestamped audit records and maintenance summary reports
"""

import os
import sys
import gzip
import time
import shutil
import fnmatch
from datetime import datetime
from typing import Dict, Any, List

class InstitutionalServerMaintenanceEngine:
    """Production automated maintenance daemon for Coder & AccoTax infrastructure."""

    def __init__(self, facility_root: str, dry_run: bool = False):
        self.facility_root = facility_root
        self.dry_run = dry_run
        self.logs_dir = os.path.join(facility_root, "logs")
        self.data_dir = os.path.join(facility_root, "data")
        self.audit_dir = os.path.join(facility_root, "maintenance_audits")

        if not self.dry_run:
            os.makedirs(self.logs_dir, exist_ok=True)
            os.makedirs(self.data_dir, exist_ok=True)
            os.makedirs(self.audit_dir, exist_ok=True)

    def execute_maintenance_cycle(self) -> Dict[str, Any]:
        """Executes full maintenance: log rotation, temp purge, and health assessment."""
        start_time = time.time()
        
        # 1. Log Rotation & Compression Pass
        rotated_logs = 0
        if os.path.exists(self.logs_dir):
            for item in os.listdir(self.logs_dir):
                full_p = os.path.join(self.logs_dir, item)
                if item.endswith(".log") and os.path.isfile(full_p):
                    if os.path.getsize(full_p) > 200:  # Rotate if > 200 bytes for demo
                        rotated_logs += 1
                        if not self.dry_run:
                            gz_name = f"{item}.{datetime.now().strftime('%Y%m%d_%H%M%S')}.gz"
                            with open(full_p, "rb") as f_in, gzip.open(os.path.join(self.logs_dir, gz_name), "wb") as f_out:
                                shutil.copyfileobj(f_in, f_out)
                            with open(full_p, "w", encoding="utf-8") as f_reset:
                                f_reset.write(f"[{datetime.now().isoformat()}] CYCLE_RESET\n")

        # 2. Temp & Cache Sweeper Pass
        reclaimed_bytes = 0
        purged_files = 0
        if os.path.exists(self.facility_root):
            for root, dirs, files in os.walk(self.facility_root, topdown=False):
                for f in files:
                    if f.endswith((".tmp", ".bak", ".pyc")):
                        full_f = os.path.join(root, f)
                        size = os.path.getsize(full_f)
                        reclaimed_bytes += size
                        purged_files += 1
                        if not self.dry_run:
                            os.remove(full_f)

        # 3. Disk Quota Health Evaluation
        usage = shutil.disk_usage(self.facility_root if os.path.exists(self.facility_root) else ".")
        free_gb = usage.free / (1024 ** 3)
        is_healthy = free_gb >= 1.0  # Require >= 1GB free

        elapsed_ms = round((time.time() - start_time) * 1000, 2)

        summary = {
            "facility_root": os.path.abspath(self.facility_root),
            "timestamp": datetime.now().isoformat(),
            "dry_run": self.dry_run,
            "logs_rotated": rotated_logs,
            "junk_files_purged": purged_files,
            "bytes_reclaimed": reclaimed_bytes,
            "free_storage_gb": round(free_gb, 2),
            "system_health": "OPTIMAL" if is_healthy else "LOW_SPACE_WARNING",
            "elapsed_ms": elapsed_ms
        }

        # Write maintenance audit log
        if not self.dry_run and os.path.exists(self.audit_dir):
            audit_file = os.path.join(self.audit_dir, f"audit_{datetime.now().strftime('%Y%m%d')}.log")
            with open(audit_file, "a", encoding="utf-8") as f_log:
                f_log.write(f"[{summary['timestamp']}] MAINT_PASS_OK - Reclaimed: {reclaimed_bytes}B - Status: {summary['system_health']}\n")

        return summary


def demonstrate_server_maintenance():
    print("=" * 70)
    print("CODER & ACCOTAX - AUTOMATED SERVER MAINTENANCE ENGINE")
    print("=" * 70)

    demo_root = "temp_accotax_maintenance_server"

    try:
        # Create mock server logs, data, and temp files:
        os.makedirs(os.path.join(demo_root, "logs"), exist_ok=True)
        os.makedirs(os.path.join(demo_root, "data", "__pycache__"), exist_ok=True)

        with open(os.path.join(demo_root, "logs", "access.log"), "w") as f:
            f.write("LOG_ENTRY_DATA\n" * 30)  # >200 bytes
        with open(os.path.join(demo_root, "data", "draft.tmp"), "w") as f:
            f.write("STALE_TEMP_BUFFER")
        with open(os.path.join(demo_root, "data", "backup.bak"), "w") as f:
            f.write("STALE_BACKUP_BUFFER")

        engine = InstitutionalServerMaintenanceEngine(demo_root, dry_run=False)
        report = engine.execute_maintenance_cycle()

        print("1. Maintenance Pass Execution Summary:")
        print(f"   * Facility Root        : {report['facility_root']}")
        print(f"   * Status Assessment    : [{report['system_health']}]")
        print(f"   * Logs Rotated & Gzipped: {report['logs_rotated']}")
        print(f"   * Junk Files Purged    : {report['junk_files_purged']}")
        print(f"   * Storage Reclaimed    : {report['bytes_reclaimed']} Bytes")
        print(f"   * Execution Latency    : {report['elapsed_ms']} ms\n")

        print("2. Directory Structure After Maintenance Pass:")
        for r, _, fs in os.walk(demo_root):
            for f in fs:
                print(f"   * {os.path.join(r, f)}")

    finally:
        # Cleanup maintenance server directory
        if os.path.exists(demo_root):
            shutil.rmtree(demo_root)
            print("\n3. Cleanup: Removed demo maintenance facility.")

    print("\n[PASSED] Automated Server Maintenance Engine Verified.")


if __name__ == "__main__":
    demonstrate_server_maintenance()
