# topic0_files/os_working_directory_and_path_queries.py
# Module: 004_001_filesystem-os
# Topic: os module: environment variables, cwd, file system queries
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 2: Working Directory Management & Filesystem Queries
Demonstrates:
  1. Current Working Directory (CWD) inspection: `os.getcwd()`
  2. Path existence and classification: `os.path.exists()`, `os.path.isfile()`, `os.path.isdir()`
  3. Querying file metadata and timestamps with `os.stat()` and `os.path.getsize()`
"""

import os
import time
from datetime import datetime

def demonstrate_cwd_and_path_queries():
    print("=" * 70)
    print("CODER & ACCOTAX - CWD & FILESYSTEM QUERIES")
    print("=" * 70)

    # 1. Current Working Directory:
    cwd = os.getcwd()
    print("1. Current Working Directory (CWD):")
    print(f"   * os.getcwd(): {cwd}\n")

    # 2. Creating a temporary test file for metadata inspection:
    test_filename = "accotax_sample_ledger.tmp"
    with open(test_filename, "w", encoding="utf-8") as f:
        f.write("TXN-101,Sourav Mukherjee,30000.00,CLEARED\n")
        f.write("TXN-102,Priyanka Sen,35000.00,CLEARED\n")

    try:
        # 3. Path Existence & Type Checks:
        print("2. Path Existence & Classification:")
        print(f"   * os.path.exists('{test_filename}') : {os.path.exists(test_filename)}")
        print(f"   * os.path.isfile('{test_filename}')   : {os.path.isfile(test_filename)}")
        print(f"   * os.path.isdir('{test_filename}')    : {os.path.isdir(test_filename)}")
        print(f"   * os.path.isabs('{test_filename}')    : {os.path.isabs(test_filename)}")
        print(f"   * os.path.abspath('{test_filename}')  : {os.path.abspath(test_filename)}\n")

        # 4. Querying File Size & Modification Timestamp:
        print("3. Querying File Metadata:")
        file_size_bytes = os.path.getsize(test_filename)
        mod_timestamp = os.path.getmtime(test_filename)
        formatted_mtime = datetime.fromtimestamp(mod_timestamp).strftime("%Y-%m-%d %H:%M:%S")

        print(f"   * File Size (Bytes)    : {file_size_bytes} Bytes")
        print(f"   * Last Modified Time   : {formatted_mtime}")

        # 5. Low-Level os.stat() Struct:
        print("\n4. Low-Level `os.stat()` Struct Inspection:")
        stat_info = os.stat(test_filename)
        print(f"   * st_size (file size)  : {stat_info.st_size} bytes")
        print(f"   * st_mode (permissions): {oct(stat_info.st_mode)}")
        print(f"   * st_mtime (unix epoch): {stat_info.st_mtime}")

    finally:
        # Cleanup temporary sample file
        if os.path.exists(test_filename):
            os.remove(test_filename)

    print(r"""
Path Query Invariants:
  1. `os.path.exists()` returns False if the path does not exist or if permission is denied.
  2. `os.stat()` returns low-level inode/filesystem metadata directly from the OS kernel.
  3. Always clean up temporary files using `try...finally` blocks.
""")
    print("[PASSED] CWD & Filesystem Queries Verified.")


if __name__ == "__main__":
    demonstrate_cwd_and_path_queries()
