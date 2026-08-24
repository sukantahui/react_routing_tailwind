# topic1_files/python_json_type_coercion_and_keys.py
# Module: 003_004_working-with-json
# Topic: JSON in Python: Mapping Python types to JSON types
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 1: Python-to-JSON Key Coercion & `skipkeys` Parameter
Demonstrates:
  1. How non-string dictionary keys (int, float, bool) are coerced to strings in JSON
  2. The `skipkeys=True` parameter to bypass un-serializable dictionary keys (tuples, objects)
  3. The dictionary key mutation trap upon deserialization
"""

import json

def demonstrate_key_coercion():
    print("=" * 70)
    print("CODER & ACCOTAX - JSON KEY COERCION & `skipkeys` PARAMETER")
    print("=" * 70)

    # 1. Dictionary with heterogeneous keys:
    student_scores = {
        101: 94.5,            # Integer key -> Becomes string "101"
        True: "PAID",         # Boolean key -> Becomes string "true"
        99.9: "TOPPER",       # Float key   -> Becomes string "99.9"
        "standard_key": "OK"  # String key  -> Preserved as "standard_key"
    }

    print("1. Serializing Dictionary with Non-String Keys:")
    json_str = json.dumps(student_scores, indent=2)
    print(json_str)

    # Deserializing back to Python:
    reconstructed = json.loads(json_str)
    print("\n2. Inspecting Restored Keys (All converted to str):")
    for k, v in reconstructed.items():
        print(f"   * Key: {repr(k):<16} (Type: {type(k).__name__}) -> Value: {v}")

    # 3. Tuple and Complex Object Keys:
    print("\n3. Testing Tuple Keys without and with `skipkeys`:")
    complex_dict = {
        "valid_key": "Processed",
        ("batch_2026", "barrackpore"): "AI Cohort",  # Tuple key cannot be converted automatically!
        102: "Priyanka Sen"
    }

    # Without skipkeys: Raises TypeError
    try:
        json.dumps(complex_dict)
    except TypeError as exc:
        print(f"   * [DEFAULT ERROR] : {exc}")

    # With skipkeys=True: Silently ignores the tuple key
    skipped_json = json.dumps(complex_dict, skipkeys=True, indent=2)
    print("   * [WITH skipkeys=True] (Tuple key skipped safely):")
    print(f"     {skipped_json.replace(chr(10), chr(10) + '     ')}")

    print(r"""
The Key Coercion Rules:
  1. JSON object keys MUST always be strings.
  2. Python `int`, `float`, and `bool` keys are automatically converted to strings.
  3. Complex keys (tuples, custom objects) raise `TypeError: keys must be str, int, float, bool or None`.
  4. Use `skipkeys=True` to ignore non-basic keys instead of crashing.
""")
    print("[PASSED] Python-to-JSON Key Coercion Verified.")


if __name__ == "__main__":
    demonstrate_key_coercion()
