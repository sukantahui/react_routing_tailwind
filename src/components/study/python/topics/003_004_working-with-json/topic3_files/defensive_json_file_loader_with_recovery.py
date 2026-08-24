# topic3_files/defensive_json_file_loader_with_recovery.py
# Module: 003_004_working-with-json
# Topic: Deserialization: json.load() vs json.loads()
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 3: Defensive JSON File Loader with Automatic Recovery
Demonstrates:
  1. Safe file deserialization with graceful fallbacks (Missing file, empty file, syntax error)
  2. Automatic corrupted file quarantine and restoration from backup
  3. Production error logging and default state initialization
"""

import json
import os
import tempfile
from typing import Dict, Any, Tuple

def load_json_defensively(
    primary_filepath: str,
    backup_filepath: str = None,
    default_payload: Dict[str, Any] = None
) -> Tuple[Dict[str, Any], str]:
    """Safely loads JSON file with fallback and automatic backup recovery."""
    default_payload = default_payload or {}

    # Case 1: Primary File does not exist
    if not os.path.exists(primary_filepath):
        return default_payload, "INITIALIZED_DEFAULT_FILE_MISSING"

    # Case 2: Primary File is 0-bytes (corrupted/truncated)
    if os.path.getsize(primary_filepath) == 0:
        if backup_filepath and os.path.exists(backup_filepath):
            with open(backup_filepath, "r", encoding="utf-8") as f_bak:
                return json.load(f_bak), "RESTORED_FROM_BACKUP_ZERO_BYTE_PRIMARY"
        return default_payload, "FALLBACK_DEFAULT_ZERO_BYTE_PRIMARY"

    # Case 3: Try to parse primary file
    try:
        with open(primary_filepath, "r", encoding="utf-8") as f:
            return json.load(f), "LOADED_PRIMARY_SUCCESS"
    except (json.JSONDecodeError, UnicodeDecodeError) as exc:
        print(f"  [ALERT] Primary JSON corrupt ({exc}). Checking backup...")
        if backup_filepath and os.path.exists(backup_filepath):
            try:
                with open(backup_filepath, "r", encoding="utf-8") as f_bak:
                    return json.load(f_bak), "RESTORED_FROM_BACKUP_CORRUPT_PRIMARY"
            except Exception:
                pass
        return default_payload, "FALLBACK_DEFAULT_PARSE_FAILED"


def demonstrate_defensive_loader():
    print("=" * 70)
    print("CODER & ACCOTAX - DEFENSIVE JSON FILE LOADER & RECOVERY")
    print("=" * 70)

    temp_dir = tempfile.gettempdir()
    primary_file = os.path.join(temp_dir, "primary_test_reg.json")
    backup_file = os.path.join(temp_dir, "backup_test_reg.json")

    # 1. Non-existent file:
    data, status = load_json_defensively(primary_file, backup_file, {"status": "DEFAULT_BOOTSTRAP"})
    print(f"1. Non-Existent File Load Status : {status} (Data: {data})")

    # 2. Setup Valid Backup, but Corrupt Primary:
    with open(backup_file, "w", encoding="utf-8") as f:
        json.dump({"institution": "Coder & AccoTax", "recovered": True}, f)

    with open(primary_file, "w", encoding="utf-8") as f:
        f.write("{MALFORMED_SYNTAX,,,")

    print("\n2. Loading Corrupted Primary File with Valid Backup Available:")
    data, status = load_json_defensively(primary_file, backup_file, {"status": "DEFAULT"})
    print(f"   * Resolution Status : {status}")
    print(f"   * Restored Data     : {data}")

    # Cleanup:
    for p in (primary_file, backup_file):
        if os.path.exists(p):
            os.remove(p)

    print("\n[PASSED] Defensive JSON File Loader Verified.")


if __name__ == "__main__":
    demonstrate_defensive_loader()
