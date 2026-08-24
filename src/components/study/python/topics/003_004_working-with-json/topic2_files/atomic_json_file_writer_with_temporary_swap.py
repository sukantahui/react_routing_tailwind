# topic2_files/atomic_json_file_writer_with_temporary_swap.py
# Module: 003_004_working-with-json
# Topic: Serialization: json.dump() vs json.dumps() with indent, sort_keys
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 3: Atomic JSON File Writer with Temporary File Swap
Demonstrates:
  1. Safe persistence: Preventing zero-byte or corrupt JSON files during power failures
  2. The Write-Flush-Sync-Replace Atomic Pattern (`tempfile` + `os.replace`)
  3. Guaranteeing ACID durability for JSON databases and configuration files
"""

import json
import os
import tempfile
from typing import Dict, Any

def atomic_write_json(filepath: str, data: Dict[str, Any], indent: int = 2) -> None:
    """Atomically writes JSON data to a file using temporary file swap."""
    target_dir = os.path.dirname(os.path.abspath(filepath))
    os.makedirs(target_dir, exist_ok=True)

    # 1. Create temporary file in the SAME directory to guarantee atomic rename across filesystems:
    temp_fd, temp_path = tempfile.mkstemp(dir=target_dir, prefix="tmp_json_", suffix=".tmp")

    try:
        with os.fdopen(temp_fd, "w", encoding="utf-8") as f:
            # 2. Serialize JSON into temporary file:
            json.dump(data, f, indent=indent, sort_keys=True)
            f.flush()
            # 3. Force OS disk buffer flush:
            os.fsync(f.fileno())

        # 4. Atomically swap temporary file over target file:
        os.replace(temp_path, filepath)
        print(f"  [ATOMIC WRITE SUCCESS] File '{os.path.basename(filepath)}' updated safely.")

    except Exception as exc:
        # Cleanup temporary file if serialization crashed:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        raise exc


def demonstrate_atomic_json_writing():
    print("=" * 70)
    print("CODER & ACCOTAX - ATOMIC JSON FILE PERSISTENCE ENGINE")
    print("=" * 70)

    test_filepath = os.path.join(tempfile.gettempdir(), "coder_accotax_student_registry.json")

    registry_data_v1 = {
        "version": 1,
        "enrolled_students": ["STU-101", "STU-102"],
        "status": "INITIALIZED"
    }

    print("1. Performing Initial Atomic JSON File Write:")
    atomic_write_json(test_filepath, registry_data_v1)

    with open(test_filepath, "r", encoding="utf-8") as f:
        print(f"   * Verified File Content (v1): {f.read().strip()}\n")

    registry_data_v2 = {
        "version": 2,
        "enrolled_students": ["STU-101", "STU-102", "STU-103", "STU-104"],
        "status": "UPDATED_BATCH_2026"
    }

    print("2. Performing Atomic Update (Zero risk of corrupt file on crash):")
    atomic_write_json(test_filepath, registry_data_v2)

    with open(test_filepath, "r", encoding="utf-8") as f:
        print(f"   * Verified File Content (v2): {f.read().strip()}")

    # Cleanup:
    if os.path.exists(test_filepath):
        os.remove(test_filepath)

    print("\n[PASSED] Atomic JSON File Writer Verified.")


if __name__ == "__main__":
    demonstrate_atomic_json_writing()
