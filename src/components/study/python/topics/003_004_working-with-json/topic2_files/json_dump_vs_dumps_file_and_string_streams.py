# topic2_files/json_dump_vs_dumps_file_and_string_streams.py
# Module: 003_004_working-with-json
# Topic: Serialization: json.dump() vs json.dumps() with indent, sort_keys
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 1: `json.dump()` vs `json.dumps()` Serialization Mechanics
Demonstrates:
  1. `json.dumps()`: In-memory string serialization with formatting parameters
  2. `json.dump()`: Direct file/stream serialization with constant O(1) buffer overhead
  3. Controlling formatting: `indent`, `sort_keys`, and `separators`
"""

import json
import io
import tempfile
import os

def demonstrate_dump_vs_dumps():
    print("=" * 70)
    print("CODER & ACCOTAX - `json.dump()` VS `json.dumps()` SERIALIZATION")
    print("=" * 70)

    course_catalog = {
        "institution": "Coder & AccoTax",
        "center": "Barrackpore Main Campus",
        "courses": [
            {"id": "PY-101", "name": "Python Full-Stack", "fee": 28000},
            {"id": "AI-201", "name": "Generators & Metaclasses", "fee": 32000},
            {"id": "DS-301", "name": "Data Science & Machine Learning", "fee": 35000}
        ],
        "is_active": True
    }

    # 1. `json.dumps()` - In-Memory String Serialization:
    print("1. In-Memory String Serialization with `json.dumps()`:")
    pretty_json_str = json.dumps(course_catalog, indent=4, sort_keys=True)
    print(f"   * Output Type       : {type(pretty_json_str).__name__}")
    print(f"   * String Length     : {len(pretty_json_str)} characters")
    print(f"   * Pretty-Printed Preview:\n{pretty_json_str[:220]}...\n")

    # 2. Minified JSON String with `separators`:
    minified_json_str = json.dumps(course_catalog, separators=(",", ":"), sort_keys=True)
    print(f"2. Minified JSON String (`separators=(',', ':')`):")
    print(f"   * Minified Length   : {len(minified_json_str)} characters ({(1 - len(minified_json_str)/len(pretty_json_str))*100:.1f}% smaller!)")
    print(f"   * Minified Content  : {minified_json_str}\n")

    # 3. `json.dump()` - Direct File / Stream Serialization:
    print("3. Direct File Serialization with `json.dump()`:")
    with tempfile.NamedTemporaryFile(mode="w+", encoding="utf-8", delete=False) as tmp_file:
        tmp_path = tmp_file.name
        # Stream directly to file without intermediate giant string in RAM:
        json.dump(course_catalog, tmp_file, indent=2, sort_keys=True)

    print(f"   * File Written To   : {tmp_path}")
    print(f"   * File Size On Disk : {os.path.getsize(tmp_path)} bytes")

    # Cleanup temporary file:
    os.remove(tmp_path)
    print("   * Temporary File Cleaned Up Safely.")

    print(r"""
Rule Summary:
  - Use `json.dumps()` when creating JSON strings for HTTP response bodies, log messages, or sockets.
  - Use `json.dump()` when writing directly to disk files or open writable streams.
""")
    print("[PASSED] `json.dump()` vs `json.dumps()` Serialization Verified.")


if __name__ == "__main__":
    demonstrate_dump_vs_dumps()
