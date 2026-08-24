# topic3_files/institutional_automated_backup_and_archiving_engine.py
# Module: 004_001_filesystem-os
# Topic: shutil module: copying, moving, archiving, and recursive deletions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 4: Institutional Automated Backup & Archiving Engine (Case Study)
Demonstrates:
  1. Production multi-campus automated backup pipeline using `shutil`
  2. Disk space pre-flight validation with `shutil.disk_usage()`
  3. Incremental tree synchronization with `shutil.copytree()` & `ignore_patterns()`
  4. Packaging and rotating compressed `.zip` distribution bundles with `shutil.make_archive()`
"""

import os
import stat
import shutil
from datetime import datetime
from typing import Dict, Any, List

class InstitutionalBackupEngine:
    """Production backup and snapshot distribution engine for Coder & AccoTax."""

    MIN_REQUIRED_FREE_SPACE_MB = 100

    def __init__(self, storage_root: str):
        self.storage_root = storage_root
        self.snapshots_dir = os.path.join(storage_root, "snapshots")
        self.archives_dir = os.path.join(storage_root, "archives")
        os.makedirs(self.snapshots_dir, exist_ok=True)
        os.makedirs(self.archives_dir, exist_ok=True)

    def verify_disk_capacity(self) -> bool:
        """Verifies disk has adequate free space before initiating backup."""
        usage = shutil.disk_usage(self.storage_root)
        free_mb = usage.free / (1024 * 1024)
        return free_mb >= self.MIN_REQUIRED_FREE_SPACE_MB

    def execute_nightly_backup(self, campus_source_dir: str, campus_id: str) -> Dict[str, Any]:
        """Clones source directory, creates a compressed archive, and logs metadata."""
        if not self.verify_disk_capacity():
            raise RuntimeError("CRITICAL: Insufficient disk space for backup snapshot.")

        timestamp_str = datetime.now().strftime("%Y%m%d_%H%M%S")
        snapshot_dest = os.path.join(self.snapshots_dir, f"{campus_id}_{timestamp_str}")

        # 1. Clone tree ignoring temp and cache files
        shutil.copytree(
            campus_source_dir,
            snapshot_dest,
            dirs_exist_ok=True,
            ignore=shutil.ignore_patterns("*.tmp", "__pycache__", ".*", "*.log")
        )

        # 2. Package into compressed ZIP archive
        archive_base = os.path.join(self.archives_dir, f"backup_{campus_id}_{timestamp_str}")
        archive_file = shutil.make_archive(
            base_name=archive_base,
            format="zip",
            root_dir=snapshot_dest
        )

        archive_size = os.path.getsize(archive_file)

        return {
            "campus_id": campus_id,
            "timestamp": timestamp_str,
            "snapshot_path": snapshot_dest,
            "archive_file": archive_file,
            "archive_size_bytes": archive_size,
            "status": "BACKUP_COMPLETED_SUCCESSFULLY"
        }

    def rotate_stale_snapshots(self, keep_last: int = 1):
        """Purges older snapshots keeping only the most recent N items."""
        snapshots = sorted(os.listdir(self.snapshots_dir))
        if len(snapshots) > keep_last:
            stale = snapshots[:-keep_last]
            for folder in stale:
                full_p = os.path.join(self.snapshots_dir, folder)
                shutil.rmtree(full_p, onerror=lambda fn, p, exc: (os.chmod(p, stat.S_IWRITE), fn(p)))


def demonstrate_backup_engine():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL BACKUP & ARCHIVING ENGINE")
    print("=" * 70)

    demo_root = "temp_accotax_backup_facility"
    campus_data_dir = os.path.join(demo_root, "barrackpore_campus_live")

    try:
        # Create live campus data
        os.makedirs(os.path.join(campus_data_dir, "admissions"), exist_ok=True)
        os.makedirs(os.path.join(campus_data_dir, "__pycache__"), exist_ok=True)

        with open(os.path.join(campus_data_dir, "admissions", "students_2026.csv"), "w") as f:
            f.write("id,name,course,fee_status\nSTU_101,Sourav Mukherjee,Python AI,PAID\n")
        with open(os.path.join(campus_data_dir, "admissions", "kyc_audit.json"), "w") as f:
            f.write('{"verified": true, "officer": "Sukanta Hui"}')
        with open(os.path.join(campus_data_dir, "__pycache__", "temp.pyc"), "w") as f:
            f.write("COMPILED_CODE_TO_IGNORE")

        engine = InstitutionalBackupEngine(demo_root)

        # 1. Execute Backup Pipeline
        print("1. Running Nightly Backup Snapshot Pipeline:")
        backup_res = engine.execute_nightly_backup(
            campus_source_dir=campus_data_dir,
            campus_id="BKP_MAIN"
        )

        print(f"   * Status        : {backup_res['status']}")
        print(f"   * Campus ID     : {backup_res['campus_id']}")
        print(f"   * Snapshot Path : {backup_res['snapshot_path']}")
        print(f"   * Archive File  : {backup_res['archive_file']}")
        print(f"   * Archive Size  : {backup_res['archive_size_bytes']} Bytes\n")

        # 2. Rotate Stale Snapshots
        print("2. Rotating Stale Snapshots:")
        engine.rotate_stale_snapshots(keep_last=1)
        print("   * Retained active snapshots successfully.")

    finally:
        # Cleanup backup facility
        if os.path.exists(demo_root):
            shutil.rmtree(demo_root, ignore_errors=True)
            print("\n3. Cleanup: Removed temporary backup facility.")

    print("\n[PASSED] Institutional Backup & Archiving Engine Verified.")


if __name__ == "__main__":
    demonstrate_backup_engine()
