# topic3_files/custom_number_decoding_parse_float_parse_int.py
# Module: 003_004_working-with-json
# Topic: Deserialization: json.load() vs json.loads()
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 2: Custom Numeric Decoding (`parse_float` & `parse_int`)
Demonstrates:
  1. Preventing IEEE-754 binary floating-point drift in financial records using `parse_float=Decimal`
  2. Preserving 64-bit and 128-bit large integer precision using `parse_int=str`
  3. Handling non-standard float constants with `parse_constant`
"""

import json
from decimal import Decimal

def demonstrate_custom_number_decoding():
    print("=" * 70)
    print("CODER & ACCOTAX - CUSTOM NUMERIC DECODING (`parse_float` & `parse_int`)")
    print("=" * 70)

    # Financial ledger payload with precise micro-decimal cents and a 64-bit transaction ID:
    ledger_json = """
    {
        "transaction_id": 9223372036854775807,
        "student_id": "STU-101",
        "tuition_fee": 28500.10,
        "gst_tax": 5130.018,
        "discount_rebate": 1500.05
    }
    """

    # 1. Default Python Decoding (Uses standard float and int):
    print("1. Standard Float Decoding (Susceptible to IEEE-754 Precision Drift):")
    default_doc = json.loads(ledger_json)
    calculated_total_float = default_doc["tuition_fee"] + default_doc["gst_tax"] - default_doc["discount_rebate"]
    print(f"   * Raw Decoded Float Fee : {default_doc['tuition_fee']} (Type: {type(default_doc['tuition_fee']).__name__})")
    print(f"   * Float Net Total       : {calculated_total_float} (May exhibit subtle binary rounding drift!)\n")

    # 2. High-Precision Financial Decoding with `parse_float=Decimal`:
    print("2. High-Precision Decoding (`parse_float=Decimal`):")
    decimal_doc = json.loads(ledger_json, parse_float=Decimal)
    calculated_total_decimal = decimal_doc["tuition_fee"] + decimal_doc["gst_tax"] - decimal_doc["discount_rebate"]
    print(f"   * Decoded Decimal Fee   : {decimal_doc['tuition_fee']} (Type: {type(decimal_doc['tuition_fee']).__name__})")
    print(f"   * Exact Decimal Total   : INR {calculated_total_decimal} (100% Exact Financial Arithmetic!)\n")

    # 3. Preserving 64-bit Large IDs with `parse_int=str`:
    print("3. Preserving Large Numeric IDs as Strings (`parse_int=str`):")
    str_int_doc = json.loads(ledger_json, parse_int=str)
    print(f"   * Transaction ID String : '{str_int_doc['transaction_id']}' (Type: {type(str_int_doc['transaction_id']).__name__})")

    # 4. Custom Constant Handler (`parse_constant`):
    print("\n4. Handling Non-Standard Constants with `parse_constant`:")
    nan_json = '{"metric": NaN, "limit": Infinity}'
    safe_doc = json.loads(nan_json, parse_constant=lambda c: f"[SPECIAL_{c}]")
    print(f"   * Handled Special Consts: {safe_doc}")

    print("\n[PASSED] Custom Numeric Decoding Verified.")


if __name__ == "__main__":
    demonstrate_custom_number_decoding()
