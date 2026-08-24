# topic1_files/handling_special_floats_and_allow_nan.py
# Module: 003_004_working-with-json
# Topic: JSON in Python: Mapping Python types to JSON types
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 2: Special Floating-Point Values (`NaN`, `Infinity`) & `allow_nan`
Demonstrates:
  1. Default Python handling of `NaN`, `Infinity`, and `-Infinity`
  2. The `allow_nan=False` parameter enforcing strict RFC 8259 compliance
  3. Sanitizing floating-point metric payloads before JSON export
"""

import json
import math

def demonstrate_special_floats():
    print("=" * 70)
    print("CODER & ACCOTAX - SPECIAL FLOATS (NaN / Infinity) & `allow_nan`")
    print("=" * 70)

    # Dictionary containing edge-case floating point numbers:
    performance_metrics = {
        "student_id": "STU-101",
        "valid_score": 94.5,
        "unassigned_score": float("nan"),
        "upper_bound": float("inf"),
        "lower_bound": float("-inf")
    }

    # 1. Default Python Serialization (allow_nan=True):
    print("1. Default Python Serialization (Outputs unquoted NaN/Infinity):")
    default_json = json.dumps(performance_metrics, indent=2)
    print(default_json)
    print("   [WARNING] Unquoted `NaN` and `Infinity` are ILLEGAL in strict RFC 8259 JSON!\n")

    # 2. Strict RFC 8259 Compliance with `allow_nan=False`:
    print("2. Strict Enforcement with `allow_nan=False` (Raises ValueError on NaN/Inf):")
    try:
        json.dumps(performance_metrics, allow_nan=False)
    except ValueError as exc:
        print(f"   * [STRICT VALIDATION BLOCKED] : {exc}\n")

    # 3. Sanitizing Special Floats for Safe Production APIs:
    print("3. Production Float Sanitization Function:")
    def sanitize_float_values(obj):
        if isinstance(obj, dict):
            return {k: sanitize_float_values(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [sanitize_float_values(v) for v in obj]
        elif isinstance(obj, float):
            if math.isnan(obj):
                return None  # Convert NaN to JSON null
            elif math.isinf(obj):
                return "Infinity" if obj > 0 else "-Infinity"
        return obj

    sanitized_data = sanitize_float_values(performance_metrics)
    compliant_json = json.dumps(sanitized_data, indent=2, allow_nan=False)
    print("   * Sanitized Compliant Output (Compatible with all web browsers):")
    print(f"     {compliant_json.replace(chr(10), chr(10) + '     ')}")

    print("\n[PASSED] Special Floats & allow_nan Compliance Verified.")


if __name__ == "__main__":
    demonstrate_special_floats()
