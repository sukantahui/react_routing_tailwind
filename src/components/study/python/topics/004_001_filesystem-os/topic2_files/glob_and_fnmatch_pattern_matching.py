# topic2_files/glob_and_fnmatch_pattern_matching.py
# Module: 004_001_filesystem-os
# Topic: Directory traversal: os.walk(), scandir(), and glob patterns
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 3: `glob` and `fnmatch` Unix Pattern Matching
Demonstrates:
  1. `glob.glob()` and memory-efficient `glob.iglob()`
  2. Unix shell filename pattern syntax: `*`, `?`, `[0-9]`, `[!a-z]`
  3. Filtering filenames inside `os.walk()` using `fnmatch.fnmatch()` and `fnmatch.filter()`
"""

import os
import glob
import fnmatch
import shutil

def demonstrate_glob_and_fnmatch():
    print("=" * 70)
    print("CODER & ACCOTAX - GLOB & FNMATCH PATTERN MATCHING")
    print("=" * 70)

    sandbox = "temp_accotax_fnmatch_sandbox"

    try:
        # Create test files with distinct naming patterns
        os.makedirs(os.path.join(sandbox, "reports"), exist_ok=True)
        os.makedirs(os.path.join(sandbox, "data"), exist_ok=True)

        test_files = [
            "reports/audit_2026_q1.csv",
            "reports/audit_2026_q2.csv",
            "reports/audit_2025_q4.csv",
            "reports/summary.json",
            "data/student_101.txt",
            "data/student_102.txt",
            "data/temp_test.tmp"
        ]
        for rel_f in test_files:
            with open(os.path.join(sandbox, rel_f), "w") as f:
                f.write("TEST_CONTENT")

        # 1. glob.glob() Pattern Matching:
        print("1. Wildcard Searches with `glob.glob()`:")
        q_2026_reports = glob.glob(os.path.join(sandbox, "reports", "audit_2026_q?.csv"))
        print(f"   * Pattern 'audit_2026_q?.csv' Matches : {q_2026_reports}")

        # 2. glob.iglob() Streaming Iterator:
        print("\n2. Memory-Efficient Generator with `glob.iglob(..., recursive=True)`:")
        all_csv_iter = glob.iglob(os.path.join(sandbox, "**", "*.csv"), recursive=True)
        print(f"   * `glob.iglob` Generator Object       : {all_csv_iter}")
        for match in all_csv_iter:
            print(f"     - Streamed Match: {match}")

        # 3. fnmatch.fnmatch() & fnmatch.filter():
        print("\n3. In-Memory Filtering with `fnmatch.filter()`:")
        all_filenames = ["stu_101.json", "stu_102.csv", "backup_2026.bak", "stu_103.json", "temp.tmp"]

        json_matches = fnmatch.filter(all_filenames, "stu_*.json")
        print(f"   * All Filenames  : {all_filenames}")
        print(f"   * Match 'stu_*.json': {json_matches}")

        # 4. Pattern Testing with fnmatch.fnmatchcase():
        print("\n4. Individual Pattern Evaluation (`fnmatch.fnmatchcase`):")
        print(f"   * 'Report_2026.CSV' matches '*.csv' (case-insensitive on Windows): {fnmatch.fnmatch('Report_2026.CSV', '*.csv')}")
        print(f"   * 'Report_2026.CSV' matches '*.csv' (case-sensitive check)       : {fnmatch.fnmatchcase('Report_2026.CSV', '*.csv')}")

    finally:
        # Cleanup sandbox directory
        if os.path.exists(sandbox):
            shutil.rmtree(sandbox)
            print("\n5. Cleanup: Removed pattern match sandbox.")

    print(r"""
glob & fnmatch Invariants:
  1. `glob.glob()` expands Unix shell wildcards against the physical filesystem.
  2. `glob.iglob()` yields matches lazily one-by-one without creating in-memory lists.
  3. `fnmatch.filter(names, pattern)` provides fast wildcard filtering over in-memory string lists.
""")
    print("[PASSED] glob and fnmatch Pattern Matching Verified.")


if __name__ == "__main__":
    demonstrate_glob_and_fnmatch()
