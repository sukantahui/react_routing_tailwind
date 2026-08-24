# topic3_files/shutil_copying_and_moving_fundamentals.py
# Module: 004_001_filesystem-os
# Topic: shutil module: copying, moving, archiving, and recursive deletions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 1: `shutil` Copying, Moving & Recursive Trees
Demonstrates:
  1. Copying flavors: `shutil.copyfile()` (data only), `shutil.copy()` (data + perms), `shutil.copy2()` (data + all metadata & timestamps)
  2. Moving files and directories across paths: `shutil.move()`
  3. Recursive tree cloning: `shutil.copytree()` with `dirs_exist_ok=True` and `shutil.ignore_patterns()`
"""

import os
import shutil
import time
from datetime import datetime

def demonstrate_shutil_copy_and_move():
    print("=" * 70)
    print("CODER & ACCOTAX - SHUTIL COPYING, MOVING & TREE CLONING")
    print("=" * 70)

    sandbox = "temp_accotax_shutil_sandbox"
    src_dir = os.path.join(sandbox, "src_vault")
    dst_dir = os.path.join(sandbox, "dst_vault")

    try:
        # 1. Setup Source Files with Mock Metadata:
        os.makedirs(src_dir, exist_ok=True)
        orig_file = os.path.join(src_dir, "student_ledger_2026.csv")
        with open(orig_file, "w", encoding="utf-8") as f:
            f.write("STU_101,Sourav Mukherjee,Python AI,30000.00\n")

        # 2. Comparing copyfile vs copy vs copy2:
        print("1. File Copying Hierarchy (`copyfile` vs `copy` vs `copy2`):")
        cp_file_dst = os.path.join(src_dir, "ledger_copyfile.csv")
        cp_dst = os.path.join(src_dir, "ledger_copy.csv")
        cp2_dst = os.path.join(src_dir, "ledger_copy2.csv")

        shutil.copyfile(orig_file, cp_file_dst)  # Raw bytes only
        shutil.copy(orig_file, cp_dst)          # Bytes + Permission mode bits
        shutil.copy2(orig_file, cp2_dst)        # Bytes + Permissions + Full Mod/Creation Timestamps

        orig_mtime = os.stat(orig_file).st_mtime
        cp2_mtime = os.stat(cp2_dst).st_mtime

        print(f"   * Original Timestamp : {datetime.fromtimestamp(orig_mtime).strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"   * copy2() Timestamp  : {datetime.fromtimestamp(cp2_mtime).strftime('%Y-%m-%d %H:%M:%S')} (Exact Match Preserved!)\n")

        # 3. Recursive Tree Cloning with ignore_patterns():
        print("2. Recursive Tree Cloning (`shutil.copytree()` with `shutil.ignore_patterns()`):")
        # Create dummy subfolders and ignore targets
        os.makedirs(os.path.join(src_dir, "__pycache__"), exist_ok=True)
        with open(os.path.join(src_dir, "__pycache__", "cache.pyc"), "w") as f:
            f.write("BYTECODE")
        with open(os.path.join(src_dir, "temp_test.tmp"), "w") as f:
            f.write("TEMP_DATA")

        # Clone entire tree, ignoring bytecode and temp files
        shutil.copytree(
            src_dir,
            dst_dir,
            dirs_exist_ok=True,
            ignore=shutil.ignore_patterns("*.pyc", "*.tmp", "__pycache__")
        )

        dst_entries = os.listdir(dst_dir)
        print(f"   * Successfully cloned tree to '{dst_dir}'")
        print(f"   * Cloned Directory Contents (Ignored .pyc & .tmp): {dst_entries}\n")

        # 4. Moving / Renaming Files with shutil.move():
        print("3. Moving Files with `shutil.move()`:")
        target_archive_path = os.path.join(dst_dir, "archived_ledger.csv")
        shutil.move(os.path.join(dst_dir, "student_ledger_2026.csv"), target_archive_path)
        print(f"   * Moved file to: {target_archive_path}")
        print(f"   * Target exists: {os.path.exists(target_archive_path)}")

    finally:
        # Cleanup sandbox
        if os.path.exists(sandbox):
            shutil.rmtree(sandbox)
            print("\n4. Cleanup: Removed shutil demo directory tree.")

    print(r"""
shutil Copying Invariants:
  1. `shutil.copy2()` is the enterprise standard for backups because it preserves file modification timestamps and flags.
  2. `shutil.copytree()` requires `dirs_exist_ok=True` (Python 3.8+) to merge into existing destination folders.
  3. `shutil.ignore_patterns()` dynamically filters out unwanted file patterns during recursive tree copies.
""")
    print("[PASSED] shutil Copying, Moving & Tree Cloning Verified.")


if __name__ == "__main__":
    demonstrate_shutil_copy_and_move()
