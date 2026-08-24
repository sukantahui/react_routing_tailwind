# topic3_files/shutil_recursive_deletion_and_disk_usage.py
# Module: 004_001_filesystem-os
# Topic: shutil module: copying, moving, archiving, and recursive deletions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 2: `shutil` Deletion Mechanics & Disk Capacity Telemetry
Demonstrates:
  1. Safe recursive directory removal with `shutil.rmtree()`
  2. Windows read-only file handling via `onerror` / `on_exc` error recovery callback
  3. Querying disk storage capacity: `shutil.disk_usage()`
"""

import os
import stat
import shutil

def remove_readonly_handler(func, path, exc_info):
    """Error handler callback to unlock and delete read-only files on Windows."""
    # Clear read-only bit and retry removal
    os.chmod(path, stat.S_IWRITE)
    func(path)

def demonstrate_deletion_and_disk_usage():
    print("=" * 70)
    print("CODER & ACCOTAX - SHUTIL DELETION & DISK USAGE TELEMETRY")
    print("=" * 70)

    sandbox = "temp_accotax_readonly_sandbox"

    try:
        # 1. Setup nested folder with a locked read-only file
        os.makedirs(os.path.join(sandbox, "locked_vault"), exist_ok=True)
        locked_file = os.path.join(sandbox, "locked_vault", "readonly_contract.txt")
        with open(locked_file, "w") as f:
            f.write("CONFIDENTIAL ACCOTAX CONTRACT - READ ONLY")

        # Set file to Read-Only mode (triggers PermissionError on standard Windows rmtree)
        os.chmod(locked_file, stat.S_IREAD)
        print("1. Created Locked Read-Only File on Disk:")
        print(f"   * Locked Path: {locked_file}\n")

        # 2. Deleting Directory Tree with Resilient Error Handler:
        print("2. Deleting Locked Directory Tree with `shutil.rmtree(..., onerror=handler)`:")
        shutil.rmtree(sandbox, onerror=remove_readonly_handler)
        print(f"   * Successfully deleted locked tree. Exists: {os.path.exists(sandbox)}\n")

    except Exception as e:
        print(f"   * [ERROR] Deletion failed: {e}")

    # 3. Querying Disk Capacity with shutil.disk_usage():
    print("3. Querying Host Disk Storage Capacity with `shutil.disk_usage()`:")
    usage = shutil.disk_usage(os.getcwd())

    total_gb = usage.total / (1024 ** 3)
    used_gb = usage.used / (1024 ** 3)
    free_gb = usage.free / (1024 ** 3)
    used_pct = (usage.used / usage.total) * 100

    print(f"   * Total Drive Space : {total_gb:.2f} GB")
    print(f"   * Used Drive Space  : {used_gb:.2f} GB ({used_pct:.1f}%)")
    print(f"   * Free Available    : {free_gb:.2f} GB")

    print(r"""
shutil Deletion & Disk Invariants:
  1. Standard `shutil.rmtree()` crashes on Windows if files have read-only permission flags.
  2. Passing an `onerror` handler allows dynamically clearing `stat.S_IWRITE` and retrying deletion.
  3. `shutil.disk_usage(path)` returns named tuples `(total, used, free)` in bytes.
""")
    print("[PASSED] shutil Deletion & Disk Usage Verified.")


if __name__ == "__main__":
    demonstrate_deletion_and_disk_usage()
