# topic5_files/deep_nested_json_traversal_and_safe_get.py
# Module: 003_004_working-with-json
# Topic: Working with nested JSON structures and API payloads
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 1: Deep Nested JSON Traversal, Safe Path Lookup & Flattening
Demonstrates:
  1. Safe traversal of deeply nested dictionaries and lists without KeyError/IndexError
  2. The `safe_get_path(data, path, default)` functional traversal pattern
  3. Flattening arbitrary nested JSON hierarchies into flat tabular structures
"""

import json
from typing import Any, List, Dict, Union

def safe_get_path(data: Any, path: List[Union[str, int]], default: Any = None) -> Any:
    """Safely retrieves a value from a nested JSON tree given a sequence of keys/indices."""
    current = data
    for token in path:
        if isinstance(current, dict) and isinstance(token, str):
            current = current.get(token)
        elif isinstance(current, (list, tuple)) and isinstance(token, int):
            if 0 <= token < len(current):
                current = current[token]
            else:
                return default
        else:
            return default
        if current is None:
            return default
    return current


def flatten_nested_json(data: Dict[str, Any], parent_key: str = "", separator: str = ".") -> Dict[str, Any]:
    """Recursively flattens a nested JSON dictionary into flat dot-delimited keys."""
    items = {}
    for k, v in data.items():
        new_key = f"{parent_key}{separator}{k}" if parent_key else k
        if isinstance(v, dict):
            items.update(flatten_nested_json(v, new_key, separator=separator))
        elif isinstance(v, list):
            for i, elem in enumerate(v):
                if isinstance(elem, dict):
                    items.update(flatten_nested_json(elem, f"{new_key}[{i}]", separator=separator))
                else:
                    items[f"{new_key}[{i}]"] = elem
        else:
            items[new_key] = v
    return items


def demonstrate_nested_traversal():
    print("=" * 70)
    print("CODER & ACCOTAX - NESTED JSON TRAVERSAL & FLATTENING")
    print("=" * 70)

    # Complex multi-tier nested API response payload:
    api_payload = {
        "api_status": "SUCCESS",
        "timestamp": "2026-08-24T10:00:00Z",
        "institution": {
            "name": "Coder & AccoTax",
            "branches": [
                {
                    "campus_id": "BP-01",
                    "location": "Barrackpore Main Campus",
                    "head_instructor": "Sukanta Hui",
                    "top_students": [
                        {"id": "STU-101", "name": "Sourav Mukherjee", "gpa": 9.45},
                        {"id": "STU-102", "name": "Priyanka Sen", "gpa": 9.10}
                    ]
                },
                {
                    "campus_id": "KL-02",
                    "location": "Kolkata Hub",
                    "top_students": []
                }
            ]
        }
    }

    # 1. Safe Path Queries:
    print("1. Safe Path Lookups (`safe_get_path`):")
    student_name = safe_get_path(api_payload, ["institution", "branches", 0, "top_students", 0, "name"])
    print(f"   * Query Path ['institution', 'branches', 0, 'top_students', 0, 'name'] : '{student_name}'")

    # Safe Missing Keys (No KeyError / IndexError):
    missing_instructor = safe_get_path(api_payload, ["institution", "branches", 1, "head_instructor"], "NOT_ASSIGNED")
    print(f"   * Query Missing Branch 1 Instructor (Fallback Default)                 : '{missing_instructor}'")

    out_of_bounds = safe_get_path(api_payload, ["institution", "branches", 99, "location"], "CAMPUS_NOT_FOUND")
    print(f"   * Query Out-of-Bounds Campus 99 (Fallback Default)                     : '{out_of_bounds}'\n")

    # 2. Flattening Nested Hierarchy:
    print("2. Flattening Deep Nested Structure into Dot-Delimited Keys:")
    flat_record = flatten_nested_json(api_payload)
    for k, v in list(flat_record.items())[:8]:
        print(f"   * {k:<48} = {repr(v)}")

    print("\n[PASSED] Deep Nested JSON Traversal & Flattening Verified.")


if __name__ == "__main__":
    demonstrate_nested_traversal()
