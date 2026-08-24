# topic3_files/json_load_vs_loads_file_and_string_deserializer.py
# Module: 003_004_working-with-json
# Topic: Deserialization: json.load() vs json.loads()
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 1: `json.load()` vs `json.loads()` Deserialization Mechanics
Demonstrates:
  1. `json.loads()`: Deserializing from in-memory string or bytes/bytearrays
  2. `json.load()`: Deserializing directly from file-like stream objects
  3. Catching and diagnosing `json.JSONDecodeError` with line and column precision
"""

import json
import io

def demonstrate_load_vs_loads():
    print("=" * 70)
    print("CODER & ACCOTAX - `json.load()` VS `json.loads()` DESERIALIZATION")
    print("=" * 70)

    # 1. `json.loads()` - In-Memory String and Bytes Deserialization:
    raw_json_str = '{"student_id": "STU-101", "name": "Sourav Mukherjee", "score": 94.5}'
    raw_json_bytes = b'{"student_id": "STU-102", "name": "Priyanka Sen", "score": 91.0}'

    print("1. In-Memory Parsing with `json.loads()`:")
    doc_from_str = json.loads(raw_json_str)
    doc_from_bytes = json.loads(raw_json_bytes)  # Accepts UTF-8 bytes directly!

    print(f"   * Parsed from String : {doc_from_str['name']} ({doc_from_str['student_id']})")
    print(f"   * Parsed from Bytes  : {doc_from_bytes['name']} ({doc_from_bytes['student_id']})\n")

    # 2. `json.load()` - Direct File / Stream Deserialization:
    print("2. Direct Stream Deserialization with `json.load()`:")
    mock_file_stream = io.StringIO('{"institution": "Coder & AccoTax", "batch": 2026, "active": true}')
    doc_from_stream = json.load(mock_file_stream)

    print(f"   * Parsed from Stream : {doc_from_stream['institution']} (Batch {doc_from_stream['batch']})\n")

    # 3. Catching and Pinpointing `JSONDecodeError`:
    print("3. Pinpointing Malformed JSON with `json.JSONDecodeError`:")
    corrupt_json = '{\n  "name": "Debolina Roy",\n  "courses": ["Python Core", "Data Science",],\n  "score": 96.0\n}'

    try:
        json.loads(corrupt_json)
    except json.JSONDecodeError as exc:
        print("   [DECODE EXCEPTION CAUGHT]")
        print(f"   * Error Message : {exc.msg}")
        print(f"   * Line Number   : Line {exc.lineno}")
        print(f"   * Column Number : Column {exc.colno}")
        print(f"   * Char Position : Index {exc.pos}")

    print(r"""
Rule Summary:
  - `json.loads()` parses string (`str`) or UTF-8 `bytes` already in memory.
  - `json.load()` parses directly from open readable file objects or network streams.
  - `JSONDecodeError` gives exact `lineno` and `colno` for rapid debugging.
""")
    print("[PASSED] `json.load()` vs `json.loads()` Deserialization Verified.")


if __name__ == "__main__":
    demonstrate_load_vs_loads()
