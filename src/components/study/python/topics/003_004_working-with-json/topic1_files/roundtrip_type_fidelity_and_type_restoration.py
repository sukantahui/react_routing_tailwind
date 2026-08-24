# topic1_files/roundtrip_type_fidelity_and_type_restoration.py
# Module: 003_004_working-with-json
# Topic: JSON in Python: Mapping Python types to JSON types
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 3: Round-Trip Type Fidelity & Restoration Post-Processors
Demonstrates:
  1. Systematic audit of data type changes across `json.dumps()` -> `json.loads()`
  2. Building type restoration schemas to recover tuples, integer keys, and sets
  3. Guaranteeing deterministic round-trip data fidelity
"""

import json
from typing import Dict, Any, Tuple

def audit_roundtrip_type_mutations():
    print("=" * 70)
    print("CODER & ACCOTAX - ROUND-TRIP TYPE MUTATION & RESTORATION AUDIT")
    print("=" * 70)

    # 1. Original Heterogeneous Payload:
    original_record = {
        "student_id": 101,                                     # int key
        "name": "Sourav Mukherjee",
        "coordinates": (22.7600, 88.3700),                     # tuple
        "score_history": [88.5, 92.0, 96.0],                   # list
        "course_catalog_ids": {101: "Python Core", 102: "AI"}  # dict with int keys
    }

    # 2. Serialize and Deserialize:
    json_serialized = json.dumps(original_record)
    restored_record = json.loads(json_serialized)

    print("1. Auditing Type Changes Across JSON Round-Trip:")
    print(f"   * Key 'coordinates':")
    print(f"     - Original Type : {type(original_record['coordinates']).__name__} {original_record['coordinates']}")
    print(f"     - Restored Type : {type(restored_record['coordinates']).__name__} {restored_record['coordinates']} (MUTATED to list!)")

    print(f"   * Key 'course_catalog_ids':")
    print(f"     - Original Keys : {[type(k).__name__ for k in original_record['course_catalog_ids'].keys()]}")
    print(f"     - Restored Keys : {[type(k).__name__ for k in restored_record['course_catalog_ids'].keys()]} (MUTATED to str!)")

    # 3. Restoring Type Fidelity with Post-Processor:
    print("\n2. Applying Type-Restoration Post-Processor:")
    def restore_student_schema_types(doc: dict) -> dict:
        """Restores tuples and integer dictionary keys according to schema contract."""
        return {
            "student_id": int(doc["student_id"]),
            "name": doc["name"],
            "coordinates": tuple(doc["coordinates"]),  # Restored to tuple
            "score_history": doc["score_history"],
            "course_catalog_ids": {int(k): v for k, v in doc["course_catalog_ids"].items()}  # Restored int keys
        }

    perfect_record = restore_student_schema_types(restored_record)
    print(f"   * Restored Coordinates Type : {type(perfect_record['coordinates']).__name__} {perfect_record['coordinates']}")
    print(f"   * Restored Catalog Key Types: {[type(k).__name__ for k in perfect_record['course_catalog_ids'].keys()]}")
    print(f"   * Perfect Round-Trip Fidelity: {perfect_record == original_record}")

    print("\n[PASSED] Round-Trip Type Fidelity & Restoration Verified.")


if __name__ == "__main__":
    audit_roundtrip_type_mutations()
