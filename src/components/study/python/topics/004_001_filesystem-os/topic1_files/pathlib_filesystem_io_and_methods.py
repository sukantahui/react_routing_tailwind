# topic1_files/pathlib_filesystem_io_and_methods.py
# Module: 004_001_filesystem-os
# Topic: Modern path manipulation with pathlib.Path
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 2: `pathlib.Path` File I/O & Filesystem Operations
Demonstrates:
  1. Convenient one-liner reading and writing: `path.read_text()`, `path.write_text()`
  2. Directory creation: `path.mkdir(parents=True, exist_ok=True)`
  3. File touching and deleting: `path.touch()`, `path.unlink(missing_ok=True)`
  4. Resolving canonical absolute paths: `path.resolve()`
"""

import shutil
from pathlib import Path

def demonstrate_pathlib_io_operations():
    print("=" * 70)
    print("CODER & ACCOTAX - PATHLIB FILE I/O & FILESYSTEM METHODS")
    print("=" * 70)

    demo_dir = Path("temp_pathlib_sandbox")
    sample_file = demo_dir / "audit_reports" / "summary.json"

    try:
        # 1. Recursive Directory Creation via path.mkdir():
        print("1. Recursive Directory Creation (`path.mkdir(parents=True, exist_ok=True)`):")
        sample_file.parent.mkdir(parents=True, exist_ok=True)
        print(f"   * Created parent directory: {sample_file.parent}")
        print(f"   * sample_file.parent.is_dir(): {sample_file.parent.is_dir()}\n")

        # 2. Writing text with single call path.write_text():
        print("2. Writing Content with `path.write_text(content, encoding='utf-8')`:")
        json_payload = '{"institution": "Coder & AccoTax", "status": "AUDIT_CLEARED", "year": 2026}'
        bytes_written = sample_file.write_text(json_payload, encoding="utf-8")
        print(f"   * Wrote {bytes_written} characters to '{sample_file}'\n")

        # 3. Reading text with single call path.read_text():
        print("3. Reading Content with `path.read_text(encoding='utf-8')`:")
        read_content = sample_file.read_text(encoding="utf-8")
        print(f"   * Read payload: {read_content}\n")

        # 4. Canonical Path Resolution (.resolve()):
        print("4. Canonical Path Resolution with `path.resolve()`:")
        canonical_path = sample_file.resolve()
        print(f"   * Relative Path  : {sample_file}")
        print(f"   * Canonical Path : {canonical_path}\n")

        # 5. Deleting File via path.unlink(missing_ok=True):
        print("5. Deleting File with `path.unlink(missing_ok=True)`:")
        sample_file.unlink(missing_ok=True)
        print(f"   * File deleted successfully. Exists: {sample_file.exists()}")

    finally:
        # Cleanup sandbox directory
        if demo_dir.exists():
            shutil.rmtree(demo_dir)
            print("6. Sandbox cleanup: Removed temporary demo directory.")

    print(r"""
pathlib I/O Invariants:
  1. `path.write_text()` and `path.read_text()` eliminate verbose `with open(...) as f:` boilerplate for small text files.
  2. Always specify `encoding="utf-8"` when reading or writing text files.
  3. `path.unlink(missing_ok=True)` deletes files idempotently without raising `FileNotFoundError`.
""")
    print("[PASSED] pathlib.Path File I/O & Operations Verified.")


if __name__ == "__main__":
    demonstrate_pathlib_io_operations()
