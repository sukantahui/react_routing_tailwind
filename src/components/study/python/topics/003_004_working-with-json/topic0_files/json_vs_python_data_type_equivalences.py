# topic0_files/json_vs_python_data_type_equivalences.py
# Module: 003_004_working-with-json
# Topic: JSON Format overview: types, syntax, and schema standards
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 2: Python vs JSON Data Type Equivalence Matrix
Demonstrates:
  1. Complete bidirectional type mapping between Python and JSON
  2. Tuple to Array conversion asymmetry
  3. Handling unsupported types (set, datetime, bytes, custom classes)
"""

import json
from datetime import datetime

def demonstrate_type_equivalences():
    print("=" * 70)
    print("CODER & ACCOTAX - PYTHON VS JSON TYPE EQUIVALENCES")
    print("=" * 70)

    # 1. Native Supported Types:
    python_data = {
        "institution": "Coder & AccoTax",               # str -> string
        "enrolled_count": 450,                          # int -> number
        "average_score": 88.75,                         # float -> number
        "is_autonomous_center": True,                   # bool -> boolean (true)
        "affiliate_partner": None,                      # None -> null
        "course_list": ["Python AI", "Web Dev"],        # list -> array
        "campus_locations": ("Barrackpore", "Kolkata")  # tuple -> array!
    }

    print("1. Serializing Native Python Types to JSON:")
    json_output = json.dumps(python_data, indent=2)
    print(json_output)

    # 2. Tuple Asymmetry Gotcha:
    print("\n2. The Tuple Asymmetry Gotcha:")
    re_parsed = json.loads(json_output)
    original_type = type(python_data["campus_locations"]).__name__
    restored_type = type(re_parsed["campus_locations"]).__name__
    print(f"   * Original Python Type : {original_type} ('campus_locations')")
    print(f"   * Restored JSON Type   : {restored_type} (JSON has no tuple type, only arrays!)")
    print(f"   [NOTICE] Tuples are converted into lists during JSON round-tripping!\n")

    # 3. Unsupported Types (Sets, Datetime, Bytes, Classes):
    print("3. Attempting to Serialize Unsupported Python Types:")

    # Case A: Set
    try:
        json.dumps({"unique_badges": {"HONORS", "GOLD", "SCHOLAR"}})
    except TypeError as exc:
        print(f"   * [SET ERROR]      : {exc}")

    # Case B: Datetime
    try:
        json.dumps({"registration_date": datetime.now()})
    except TypeError as exc:
        print(f"   * [DATETIME ERROR] : {exc}")

    # Case C: Bytes
    try:
        json.dumps({"digital_signature": b"ENCRYPTED_SHA256"})
    except TypeError as exc:
        print(f"   * [BYTES ERROR]    : {exc}")

    print(r"""
Type Mapping Summary:
  Python Type                | JSON Type
  ---------------------------+------------
  dict                       | object
  list, tuple                | array
  str                        | string
  int, float                 | number
  True / False               | true / false
  None                       | null
  ---------------------------+------------
  set, datetime, bytes, obj  | TypeError (Requires custom encoder!)
""")
    print("[PASSED] Python vs JSON Type Equivalences Verified.")


if __name__ == "__main__":
    demonstrate_type_equivalences()
