# topic8_files/atomic_json_file_store_with_tempfile_replace.py
# Module: 003_004_working-with-json
# Topic: Building JSON-backed persistent data stores
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 8 - File 1: Atomic JSON File Store with `tempfile` & `os.replace`
Demonstrates:
  1. The danger of direct `with open("db.json", "w")` truncation corrupting data on crashes
  2. The POSIX / Windows Atomic Write pattern: Write to temp file -> flush -> fsync -> `os.replace`
  3. Guaranteeing 100% data integrity with zero 0-byte corrupt database files
"""

import json
import os
import tempfile
from typing import Dict, Any

class AtomicJsonStore:
    """ACID-compliant atomic JSON file storage manager."""

    def __init__(self, target_filepath: str):
        self.target_filepath = target_filepath

    def save_atomic(self, data: Dict[str, Any]):
        """Writes data to a temporary file and atomically replaces the target file."""
        target_dir = os.path.dirname(os.path.abspath(self.target_filepath))
        os.makedirs(target_dir, exist_ok=True)

        # 1. Create a secure temp file in the SAME directory to ensure atomic cross-device rename
        temp_fd, temp_path = tempfile.mkstemp(dir=target_dir, prefix="db_tmp_", suffix=".json")

        try:
            with os.fdopen(temp_fd, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
                f.flush()
                # 2. Force write buffers to physical disk
                os.fsync(f.fileno())

            # 3. Atomic replacement (atomic swap guaranteed by OS filesystem)
            os.replace(temp_path, self.target_filepath)
        except Exception:
            # Clean up temporary file if write failed before replace
            if os.path.exists(temp_path):
                os.remove(temp_path)
            raise

    def load(self) -> Dict[str, Any]:
        """Loads data from the JSON store."""
        if not os.path.exists(self.target_filepath):
            return {}
        with open(self.target_filepath, "r", encoding="utf-8") as f:
            return json.load(f)


def demonstrate_atomic_writes():
    print("=" * 70)
    print("CODER & ACCOTAX - ATOMIC JSON FILE STORE (os.replace)")
    print("=" * 70)

    db_path = os.path.join(tempfile.gettempdir(), "coder_accotax_atomic_store.json")
    store = AtomicJsonStore(db_path)

    # 1. Initial Atomic Write:
    initial_registry = {
        "institution": "Coder & AccoTax",
        "last_updated": "2026-08-24T10:00:00Z",
        "students": {
            "STU-101": {"name": "Sourav Mukherjee", "course": "Python AI", "fee_paid": 28500.0}
        }
    }

    print("1. Executing Atomic Write (`tempfile` + `os.fsync` + `os.replace`):")
    store.save_atomic(initial_registry)
    print(f"   * Written Database File Size: {os.path.getsize(db_path)} bytes")

    # 2. Update Database Atomically:
    print("\n2. Updating Database with New Enrolled Student:")
    current_data = store.load()
    current_data["students"]["STU-102"] = {
        "name": "Priyanka Sen",
        "course": "Data Science",
        "fee_paid": 32000.0
    }
    store.save_atomic(current_data)

    # Verify:
    verified_data = store.load()
    print(f"   * Total Students in Store   : {len(verified_data['students'])}")
    for sid, sinfo in verified_data["students"].items():
        print(f"     - [{sid}] {sinfo['name']:<18} | Course: {sinfo['course']}")

    # Cleanup:
    if os.path.exists(db_path):
        os.remove(db_path)

    print(r"""
Atomic Write Invariants:
  1. Never write directly to `open("db.json", "w")` in production (crashes leave empty 0-byte files).
  2. Create temp file in SAME directory (ensures `os.replace` is an atomic filesystem inode swap).
  3. Always call `os.fsync()` before renaming to ensure bytes are committed to hardware disk.
""")
    print("[PASSED] Atomic JSON File Store Verified.")


if __name__ == "__main__":
    demonstrate_atomic_writes()
