# topic1_files/pathlib_globbing_and_pattern_matching.py
# Module: 004_001_filesystem-os
# Topic: Modern path manipulation with pathlib.Path
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 3: `pathlib.Path` Globbing, Pattern Matching & Relative Paths
Demonstrates:
  1. Shallow directory scanning: `path.iterdir()`
  2. Pattern globbing: `path.glob("*.csv")`
  3. Recursive directory search: `path.rglob("*.pdf")`
  4. Computing relative subpaths: `path.relative_to(base)`
"""

import shutil
from pathlib import Path
from typing import List

def demonstrate_pathlib_globbing():
    print("=" * 70)
    print("CODER & ACCOTAX - PATHLIB GLOBBING & PATTERN SEARCH")
    print("=" * 70)

    sandbox_root = Path("temp_accotax_glob_sandbox")

    try:
        # 1. Setup multi-level folder structure with dummy files:
        (sandbox_root / "barrackpore" / "batch1").mkdir(parents=True, exist_ok=True)
        (sandbox_root / "barrackpore" / "batch2").mkdir(parents=True, exist_ok=True)
        (sandbox_root / "kolkata" / "batch1").mkdir(parents=True, exist_ok=True)

        (sandbox_root / "barrackpore" / "batch1" / "stu_101.csv").touch()
        (sandbox_root / "barrackpore" / "batch1" / "stu_101.pdf").touch()
        (sandbox_root / "barrackpore" / "batch2" / "stu_102.pdf").touch()
        (sandbox_root / "kolkata" / "batch1" / "stu_103.csv").touch()
        (sandbox_root / "kolkata" / "batch1" / "stu_103.pdf").touch()

        # 2. Shallow Directory Iteration with path.iterdir():
        print("1. Shallow Directory Scan (`sandbox_root.iterdir()`):")
        top_entries = list(sandbox_root.iterdir())
        for entry in top_entries:
            print(f"   * Entry: {entry.name:<15} | is_dir(): {entry.is_dir()}")

        # 3. Shallow Glob Pattern with path.glob():
        print("\n2. Shallow Wildcard Glob (`sandbox_root.glob('*')`):")
        campuses = [p.name for p in sandbox_root.glob("*") if p.is_dir()]
        print(f"   * Campuses Discovered: {campuses}")

        # 4. Deep Recursive Glob with path.rglob():
        print("\n3. Recursive Deep Glob (`sandbox_root.rglob('*.pdf')`):")
        all_pdfs = list(sandbox_root.rglob("*.pdf"))
        print(f"   * Found {len(all_pdfs)} PDF files across all subdirectories:")
        for pdf in all_pdfs:
            # Computing path relative to sandbox root
            rel_path = pdf.relative_to(sandbox_root)
            print(f"     - Relative: {rel_path} | Size: {pdf.stat().st_size} bytes")

        # 5. Matching all CSV files recursively:
        all_csvs = list(sandbox_root.rglob("*.csv"))
        print(f"\n4. Recursive CSV Files: {[p.name for p in all_csvs]}")

    finally:
        # Cleanup sandbox directory
        if sandbox_root.exists():
            shutil.rmtree(sandbox_root)
            print("\n5. Cleanup: Removed glob sandbox directory tree.")

    print(r"""
pathlib Globbing Invariants:
  1. `path.glob("pattern")` scans only the immediate directory.
  2. `path.rglob("pattern")` (or `path.glob("**/*")`) recursively searches all subfolders.
  3. `path.relative_to(base)` calculates clean, portable relative paths.
""")
    print("[PASSED] pathlib.Path Globbing & Pattern Search Verified.")


if __name__ == "__main__":
    demonstrate_pathlib_globbing()
