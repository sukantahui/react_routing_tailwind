# topic0_files/json_syntax_standards_and_data_types.py
# Module: 003_004_working-with-json
# Topic: JSON Format overview: types, syntax, and schema standards
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 1: JSON Format Overview: Data Types & Strict Syntax (RFC 8259)
Demonstrates:
  1. The 6 fundamental JSON data types (string, number, object, array, boolean, null)
  2. Strict JSON syntax rules (Double quotes only, no trailing commas, no comments)
  3. Parsing standard JSON and catching syntax errors
"""

import json

def demonstrate_json_data_types():
    print("=" * 70)
    print("CODER & ACCOTAX - JSON DATA TYPES & STRICT SYNTAX RULES")
    print("=" * 70)

    # 1. Valid RFC 8259 JSON String containing all 6 data types:
    valid_json_string = """
    {
        "student_id": "STU-101",
        "name": "Sourav Mukherjee",
        "age": 24,
        "gpa": 9.45,
        "is_enrolled": true,
        "scholarship_expiry": null,
        "courses": [
            "Python Full-Stack",
            "Generators & Decorators",
            "Data Science with AI"
        ],
        "campus_details": {
            "center": "Barrackpore Main Campus",
            "city": "Kolkata",
            "state": "West Bengal",
            "pincode": 700120
        }
    }
    """

    print("1. Parsing Valid JSON with all 6 Native JSON Types:")
    parsed_data = json.loads(valid_json_string)

    print(f"   * String  (`student_id`) : '{parsed_data['student_id']}'")
    print(f"   * Number  (`age`, `gpa`) : {parsed_data['age']} (int), {parsed_data['gpa']} (float)")
    print(f"   * Boolean (`is_enrolled`): {parsed_data['is_enrolled']} (Python {type(parsed_data['is_enrolled']).__name__})")
    print(f"   * Null    (`scholarship`): {parsed_data['scholarship_expiry']} (Python None)")
    print(f"   * Array   (`courses`)    : {parsed_data['courses']} (Python {type(parsed_data['courses']).__name__})")
    print(f"   * Object  (`campus`)     : {parsed_data['campus_details']['center']}\n")

    # 2. Testing Strict JSON Syntax Rules:
    print("2. Demonstrating Common Strict Syntax Hazards:")

    # Hazard 1: Single quotes instead of double quotes
    invalid_single_quotes = "{'name': 'Priyanka Sen'}"
    try:
        json.loads(invalid_single_quotes)
    except json.JSONDecodeError as exc:
        print(f"   [BLOCKED] Single quotes invalid in JSON! Error: {exc.msg} at line {exc.lineno}")

    # Hazard 2: Trailing comma in arrays or objects
    invalid_trailing_comma = '{"courses": ["Python Core", "Data Structures",]}'
    try:
        json.loads(invalid_trailing_comma)
    except json.JSONDecodeError as exc:
        print(f"   [BLOCKED] Trailing comma invalid in JSON! Error: {exc.msg} at line {exc.lineno}")

    # Hazard 3: JavaScript boolean / undefined
    invalid_js_undefined = '{"active": undefined}'
    try:
        json.loads(invalid_js_undefined)
    except json.JSONDecodeError as exc:
        print(f"   [BLOCKED] `undefined` is not valid JSON! Error: {exc.msg}")

    print(r"""
Strict JSON Rules (RFC 8259 Standard):
  1. Keys MUST be enclosed in double quotes: `"key": "value"` (Never `'key'`).
  2. Strings MUST use double quotes: `"hello"` (Never `'hello'`).
  3. Trailing commas are strictly prohibited: `[1, 2, 3]` (Never `[1, 2, 3,]`).
  4. Only 6 native types exist: string, number, object, array, true/false, null.
  5. Comments are NOT allowed in standard JSON.
""")
    print("[PASSED] JSON Data Types & Strict Syntax Verified.")


if __name__ == "__main__":
    demonstrate_json_data_types()
