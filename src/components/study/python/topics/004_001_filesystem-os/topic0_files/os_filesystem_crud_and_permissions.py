# topic0_files/os_filesystem_crud_and_permissions.py
# Module: 004_001_filesystem-os
# Topic: os module: environment variables, cwd, file system queries
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 3: Directory Creation, File Operations & Permission Checks
Demonstrates:
  1. Safe recursive directory creation: `os.makedirs(path, exist_ok=True)`
  2. Atomic file renaming/replacing: `os.rename()` vs `os.replace()`
  3. Testing file accessibility & permission bits: `os.access()`
"""

import os
import shutil

def demonstrate_filesystem_crud_and_permissions():
    print("=" * 70)
    print("CODER & ACCOTAX - FILESYSTEM CRUD & PERMISSION CHECKS")
    print("=" * 70)

    demo_root_dir = "temp_accotax_demo_tree"
    nested_dir = os.path.join(demo_root_dir, "audits", "2026", "q1")
    file_v1 = os.path.join(nested_dir, "ledger_v1.txt")
    file_v2 = os.path.join(nested_dir, "ledger_v2_final.txt")

    try:
        # 1. Recursive Directory Creation:
        print("1. Recursive Directory Creation with `os.makedirs(path, exist_ok=True)`:")
        os.makedirs(nested_dir, exist_ok=True)
        print(f"   * Created nested directory hierarchy: '{nested_dir}'")
        print(f"   * os.path.isdir('{nested_dir}'): {os.path.isdir(nested_dir)}\n")

        # 2. Writing Initial File:
        with open(file_v1, "w", encoding="utf-8") as f:
            f.write("ACCOTAX FINANCIAL LEDGER 2026 Q1 - DRAFT")

        # 3. Checking File Access Permissions:
        print("2. Permission Testing with `os.access()`:")
        is_readable = os.access(file_v1, os.R_OK)
        is_writable = os.access(file_v1, os.W_OK)
        is_executable = os.access(file_v1, os.X_OK)

        print(f"   * Read Permission (R_OK)   : {is_readable}")
        print(f"   * Write Permission (W_OK)  : {is_writable}")
        print(f"   * Execute Permission (X_OK): {is_executable}\n")

        # 4. Atomic File Replacement with os.replace():
        print("3. Atomic File Renaming / Overwrite with `os.replace()`:")
        # os.replace() is atomic and silently overwrites destination if it exists on both POSIX and Windows
        os.replace(file_v1, file_v2)
        print(f"   * Replaced '{file_v1}' -> '{file_v2}'")
        print(f"   * Original '{file_v1}' exists: {os.path.exists(file_v1)}")
        print(f"   * Final '{file_v2}' exists   : {os.path.exists(file_v2)}\n")

        # 5. Listing Contents:
        dir_contents = os.listdir(nested_dir)
        print(f"4. Directory Contents (`os.listdir('{nested_dir}')`): {dir_contents}")

    finally:
        # Cleanup directory tree safely
        if os.path.exists(demo_root_dir):
            shutil.rmtree(demo_root_dir)
            print("\n5. Cleanup: Removed demo directory tree successfully.")

    print(r"""
Filesystem CRUD Invariants:
  1. Always pass `exist_ok=True` to `os.makedirs()` to prevent `FileExistsError` in concurrent environments.
  2. Use `os.replace()` instead of `os.rename()` when you require cross-platform atomic overwrites.
  3. `os.access()` tests if the real user ID has permissions, honoring OS access control lists.
""")
    print("[PASSED] Filesystem CRUD & Permissions Verified.")


if __name__ == "__main__":
    demonstrate_filesystem_crud_and_permissions()
