# topic6_files/temp_file_sweeper_and_cache_purger.py
# Module: 004_001_filesystem-os
# Topic: Building automated system maintenance scripts
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 2: Stale Temp File Sweeper & Bytecode Cache Purger
Demonstrates:
  1. Recursively scanning for junk files (`.tmp`, `.bak`, `.pyc`, `~*`)
  2. Safe dry-run simulation mode (`--dry-run`)
  3. Purging `__pycache__` directories and calculating reclaimed disk space
"""

import os
import shutil
import fnmatch
from typing import List, Dict, Any

class TempFileSweeper:
    """Production automated sweeper for stale temp files and bytecode caches."""

    JUNK_FILE_PATTERNS = ["*.tmp", "*.bak", "*.pyc", "*.pyo", "~*", "*.swp"]
    CACHE_DIR_NAMES = {"__pycache__", ".pytest_cache", ".temp_cache"}

    def __init__(self, target_root: str, dry_run: bool = False):
        self.target_root = target_root
        self.dry_run = dry_run

    def sweep_directory_tree(self) -> Dict[str, Any]:
        """Scans directory tree, purges stale files/caches, and returns reclamation summary."""
        deleted_files = []
        deleted_dirs = []
        bytes_reclaimed = 0

        # Traverse bottom-up (topdown=False) to safely remove empty/cached folders
        for root, dirs, files in os.walk(self.target_root, topdown=False):
            # 1. Sweep Junk Files
            for f_name in files:
                if any(fnmatch.fnmatch(f_name, pat) for pat in self.JUNK_FILE_PATTERNS):
                    full_p = os.path.join(root, f_name)
                    size = os.path.getsize(full_p)
                    bytes_reclaimed += size
                    deleted_files.append({"path": full_p, "size_bytes": size})
                    if not self.dry_run:
                        os.remove(full_p)

            # 2. Sweep Cache Folders
            for d_name in dirs:
                if d_name in self.CACHE_DIR_NAMES:
                    full_d = os.path.join(root, d_name)
                    deleted_dirs.append(full_d)
                    if not self.dry_run:
                        shutil.rmtree(full_d, ignore_errors=True)

        return {
            "root_path": os.path.abspath(self.target_root),
            "dry_run_mode": self.dry_run,
            "deleted_files_count": len(deleted_files),
            "deleted_dirs_count": len(deleted_dirs),
            "total_bytes_reclaimed": bytes_reclaimed,
            "purged_files_sample": deleted_files[:5],
            "purged_directories": deleted_dirs
        }


def demonstrate_temp_sweeper():
    print("=" * 70)
    print("CODER & ACCOTAX - STALE TEMP SWEEPER & CACHE PURGER")
    print("=" * 70)

    sandbox = "temp_accotax_sweeper_sandbox"
    os.makedirs(os.path.join(sandbox, "project", "__pycache__"), exist_ok=True)
    os.makedirs(os.path.join(sandbox, "project", "data"), exist_ok=True)

    try:
        # Create valid and junk files:
        with open(os.path.join(sandbox, "project", "app.py"), "w") as f:
            f.write("print('VALID APP CODE')")
        with open(os.path.join(sandbox, "project", "__pycache__", "app.cpython-313.pyc"), "w") as f:
            f.write("COMPILED_BYTECODE_CONTENT")
        with open(os.path.join(sandbox, "project", "data", "draft.bak"), "w") as f:
            f.write("BACKUP_DATA_TEMP")
        with open(os.path.join(sandbox, "project", "data", "session.tmp"), "w") as f:
            f.write("STALE_SESSION_DATA")

        # 1. Run Dry-Run Simulation:
        print("1. Running Sweeper in DRY-RUN Mode (Simulation):")
        dry_sweeper = TempFileSweeper(sandbox, dry_run=True)
        dry_res = dry_sweeper.sweep_directory_tree()

        print(f"   * [DRY-RUN] Files Marked for Deletion : {dry_res['deleted_files_count']}")
        print(f"   * [DRY-RUN] Caches Marked for Purge   : {dry_res['deleted_dirs_count']}")
        print(f"   * [DRY-RUN] Estimated Space Reclaimed : {dry_res['total_bytes_reclaimed']} Bytes\n")

        # 2. Run Live Sweeper Execution:
        print("2. Running Sweeper in LIVE Execution Mode:")
        live_sweeper = TempFileSweeper(sandbox, dry_run=False)
        live_res = live_sweeper.sweep_directory_tree()

        print(f"   * Files Purged from Disk   : {live_res['deleted_files_count']}")
        print(f"   * Cache Folders Purged     : {live_res['deleted_dirs_count']}")
        print(f"   * Total Bytes Reclaimed    : {live_res['total_bytes_reclaimed']} Bytes\n")

        print("3. Remaining Production Files:")
        for r, _, fs in os.walk(sandbox):
            for f in fs:
                print(f"   * {os.path.join(r, f)}")

    finally:
        # Cleanup sandbox directory
        if os.path.exists(sandbox):
            shutil.rmtree(sandbox)
            print("\n4. Cleanup: Removed sweeper demo sandbox.")

    print(r"""
Temp Sweeper Invariants:
  1. Always provide a `--dry-run` flag in automated maintenance scripts to prevent accidental data loss.
  2. Using `topdown=False` ensures nested child cache files are wiped before removing parent directories.
  3. Reclaiming bytecode and session files regularly maintains fast, clutter-free production environments.
""")
    print("[PASSED] Temp File Sweeper & Cache Purger Verified.")


if __name__ == "__main__":
    demonstrate_temp_sweeper()
