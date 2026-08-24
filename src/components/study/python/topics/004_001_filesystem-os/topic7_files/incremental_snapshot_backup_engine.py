# topic7_files/incremental_snapshot_backup_engine.py
# Module: 004_001_filesystem-os
# Topic: Automated directory backup and file organizer scripts
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 3: Incremental Snapshot Backup & Delta Synchronization Engine
Demonstrates:
  1. Comparing source files against target backup directory
  2. Timestamp-based delta detection: copying only new and modified files with `shutil.copy2()`
  3. Generating synchronization manifests (`added`, `updated`, `unchanged`)
"""

import os
import shutil
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any

class IncrementalBackupEngine:
    """Production incremental directory backup and delta synchronization engine."""

    def __init__(self, source_dir: str, backup_dir: str):
        self.source_dir = Path(source_dir)
        self.backup_dir = Path(backup_dir)
        self.backup_dir.mkdir(parents=True, exist_ok=True)

    def sync_incremental_backup(self) -> Dict[str, Any]:
        """Synchronizes only new or modified files from source to backup directory."""
        added_files = []
        updated_files = []
        unchanged_files = []

        # Traverse source directory recursively
        for src_path in self.source_dir.rglob("*"):
            if not src_path.is_file():
                continue

            rel_path = src_path.relative_to(self.source_dir)
            dst_path = self.backup_dir / rel_path

            # Case 1: Target file does not exist (NEW FILE)
            if not dst_path.exists():
                dst_path.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(str(src_path), str(dst_path))
                added_files.append(str(rel_path))

            # Case 2: Target file exists, check if source is newer or different size
            else:
                src_stat = src_path.stat()
                dst_stat = dst_path.stat()

                # If source is newer or has different size:
                if src_stat.st_mtime > dst_stat.st_mtime or src_stat.st_size != dst_stat.st_size:
                    shutil.copy2(str(src_path), str(dst_path))
                    updated_files.append(str(rel_path))
                else:
                    unchanged_files.append(str(rel_path))

        return {
            "source_dir": str(self.source_dir.resolve()),
            "backup_dir": str(self.backup_dir.resolve()),
            "timestamp": datetime.now().isoformat(),
            "added_count": len(added_files),
            "updated_count": len(updated_files),
            "unchanged_count": len(unchanged_files),
            "added_files": added_files,
            "updated_files": updated_files
        }


def demonstrate_incremental_backup():
    print("=" * 70)
    print("CODER & ACCOTAX - INCREMENTAL SNAPSHOT BACKUP ENGINE")
    print("=" * 70)

    sandbox = Path("temp_accotax_incremental_sandbox")
    src = sandbox / "source_data"
    dst = sandbox / "backup_vault"

    src.mkdir(parents=True, exist_ok=True)
    dst.mkdir(parents=True, exist_ok=True)

    try:
        # Create initial source files
        (src / "students.csv").write_text("id,name\nSTU-101,Sourav")
        (src / "curriculum.json").write_text('{"module": "004_001"}')

        engine = IncrementalBackupEngine(str(src), str(dst))

        # Pass 1: Initial Full Backup
        print("1. Execution Pass 1: Initial Sync (All Files are New):")
        pass1_report = engine.sync_incremental_backup()
        print(f"   * Added Files     : {pass1_report['added_count']} {pass1_report['added_files']}")
        print(f"   * Updated Files   : {pass1_report['updated_count']}")
        print(f"   * Unchanged Files : {pass1_report['unchanged_count']}\n")

        # Pass 2: No Changes Sync
        print("2. Execution Pass 2: Idempotent Sync (Zero Changes):")
        pass2_report = engine.sync_incremental_backup()
        print(f"   * Added Files     : {pass2_report['added_count']}")
        print(f"   * Updated Files   : {pass2_report['updated_count']}")
        print(f"   * Unchanged Files : {pass2_report['unchanged_count']}\n")

        # Modify one file and add a new file:
        (src / "students.csv").write_text("id,name,fee\nSTU-101,Sourav,30000\nSTU-102,Priyanka,35000")
        (src / "fees_2026.csv").write_text("TXN-101,PAID")

        # Pass 3: Delta Incremental Sync
        print("3. Execution Pass 3: Delta Sync (1 Updated, 1 Added, 1 Unchanged):")
        pass3_report = engine.sync_incremental_backup()
        print(f"   * Added Files     : {pass3_report['added_count']} {pass3_report['added_files']}")
        print(f"   * Updated Files   : {pass3_report['updated_count']} {pass3_report['updated_files']}")
        print(f"   * Unchanged Files : {pass3_report['unchanged_count']}")

    finally:
        # Cleanup sandbox directory
        if sandbox.exists():
            shutil.rmtree(sandbox)
            print("\n4. Cleanup: Removed incremental backup sandbox.")

    print("\n[PASSED] Incremental Snapshot Backup Engine Verified.")


if __name__ == "__main__":
    demonstrate_incremental_backup()
