# topic2_files/deterministic_canonical_json_and_sort_keys.py
# Module: 003_004_working-with-json
# Topic: Serialization: json.dump() vs json.dumps() with indent, sort_keys
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 2 - File 2: Canonical JSON & Cryptographic SHA-256 Checksums
Demonstrates:
  1. Deterministic JSON serialization using `sort_keys=True` and strict separators
  2. Generating reproducible SHA-256 hashes for data integrity & caching
  3. Proving that unordered dictionaries produce identical cryptographic hashes
"""

import json
import hashlib
from typing import Dict, Any

def generate_canonical_json(data: Dict[str, Any]) -> str:
    """Generates deterministic, whitespace-minified canonical JSON."""
    return json.dumps(data, sort_keys=True, separators=(",", ":"), ensure_ascii=True)


def compute_json_sha256(data: Dict[str, Any]) -> str:
    """Computes SHA-256 checksum over canonical JSON representation."""
    canonical_str = generate_canonical_json(data)
    return hashlib.sha256(canonical_str.encode("utf-8")).hexdigest()


def demonstrate_canonical_json():
    print("=" * 70)
    print("CODER & ACCOTAX - CANONICAL DETERMINISTIC JSON & SHA-256")
    print("=" * 70)

    # Two dictionaries with identical keys and values inserted in DIFFERENT order:
    doc_order_a = {
        "student_id": "STU-101",
        "course": "Python AI",
        "score": 95.0,
        "fee_paid": 28000.0,
        "center": "Barrackpore"
    }

    doc_order_b = {
        "center": "Barrackpore",
        "score": 95.0,
        "fee_paid": 28000.0,
        "student_id": "STU-101",
        "course": "Python AI"
    }

    # 1. Non-deterministic standard serialization (Insertion order dependent):
    json_a = json.dumps(doc_order_a)
    json_b = json.dumps(doc_order_b)
    print("1. Standard `json.dumps()` (No sort_keys):")
    print(f"   * Are raw strings identical? : {json_a == json_b}")
    print(f"   * Hash A: {hashlib.sha256(json_a.encode()).hexdigest()}")
    print(f"   * Hash B: {hashlib.sha256(json_b.encode()).hexdigest()} (DIFFERENT HASHES!)\n")

    # 2. Canonical serialization (Deterministic & Sort Keys):
    print("2. Canonical Serialization (`sort_keys=True`, `separators=(',', ':')`):")
    canonical_a = generate_canonical_json(doc_order_a)
    canonical_b = generate_canonical_json(doc_order_b)
    hash_a = compute_json_sha256(doc_order_a)
    hash_b = compute_json_sha256(doc_order_b)

    print(f"   * Canonical String A : {canonical_a}")
    print(f"   * Canonical String B : {canonical_b}")
    print(f"   * Are strings equal? : {canonical_a == canonical_b}")
    print(f"   * SHA-256 Hash A     : {hash_a}")
    print(f"   * SHA-256 Hash B     : {hash_b}")
    print(f"   * Hashes Match?      : {hash_a == hash_b} [IDENTICAL!]")

    print(r"""
Canonical JSON Rules for Cryptographic Signatures & Caching:
  1. Always use `sort_keys=True`.
  2. Always use `separators=(",", ":")` to eliminate whitespace ambiguity.
  3. Set `ensure_ascii=True` (or consistent UTF-8 encoding).
""")
    print("[PASSED] Deterministic Canonical JSON & SHA-256 Verified.")


if __name__ == "__main__":
    demonstrate_canonical_json()
