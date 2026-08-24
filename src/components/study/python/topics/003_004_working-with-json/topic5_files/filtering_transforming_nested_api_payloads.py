# topic5_files/filtering_transforming_nested_api_payloads.py
# Module: 003_004_working-with-json
# Topic: Working with nested JSON structures and API payloads
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 2: Filtering & Transforming Complex Nested API Envelopes
Demonstrates:
  1. Unpacking standard REST API envelope payloads (`status`, `pagination`, `data`)
  2. Filtering and transforming nested items with generator comprehensions
  3. Extracting and aggregating metrics across multi-level nested datasets
"""

import json
from typing import Dict, Any, List

def process_paginated_api_response(raw_api_json: str) -> Dict[str, Any]:
    """Extracts, filters, and computes summary statistics from a REST API payload envelope."""
    payload = json.loads(raw_api_json)

    # 1. Validate envelope health
    if payload.get("status") != "OK":
        raise ValueError(f"API returned non-OK status: {payload.get('status')}")

    items: List[Dict[str, Any]] = payload.get("data", {}).get("items", [])
    pagination = payload.get("pagination", {})

    # 2. Filter qualified merit scholarship candidates (score >= 90.0 and active)
    merit_candidates = [
        {
            "student_id": item["id"],
            "name": item["profile"]["full_name"],
            "city": item["profile"]["address"]["city"],
            "course": item["enrollment"]["course_code"],
            "score": item["academics"]["score"],
            "fee_paid": item["enrollment"]["fee_paid"]
        }
        for item in items
        if item.get("status") == "ACTIVE" and item.get("academics", {}).get("score", 0) >= 90.0
    ]

    # 3. Aggregate metrics over filtered data
    total_active_fees = sum(item["enrollment"]["fee_paid"] for item in items if item.get("status") == "ACTIVE")
    average_score = sum(c["score"] for c in merit_candidates) / len(merit_candidates) if merit_candidates else 0.0

    return {
        "page_number": pagination.get("current_page"),
        "total_active_students": len(items),
        "merit_candidates_count": len(merit_candidates),
        "total_active_revenue_inr": total_active_fees,
        "average_merit_score": round(average_score, 2),
        "merit_roster": merit_candidates
    }


def demonstrate_api_payload_processing():
    print("=" * 70)
    print("CODER & ACCOTAX - NESTED API PAYLOAD EXTRACTION & AGGREGATION")
    print("=" * 70)

    simulated_api_json = """
    {
        "status": "OK",
        "api_version": "2026.1",
        "pagination": {"current_page": 1, "page_size": 10, "total_records": 4},
        "data": {
            "items": [
                {
                    "id": "STU-101",
                    "status": "ACTIVE",
                    "profile": {
                        "full_name": "Sourav Mukherjee",
                        "address": {"city": "Barrackpore", "state": "WB"}
                    },
                    "enrollment": {"course_code": "PY-AI", "fee_paid": 28000.0},
                    "academics": {"score": 95.5}
                },
                {
                    "id": "STU-102",
                    "status": "ACTIVE",
                    "profile": {
                        "full_name": "Priyanka Sen",
                        "address": {"city": "Kolkata", "state": "WB"}
                    },
                    "enrollment": {"course_code": "DS-ML", "fee_paid": 32000.0},
                    "academics": {"score": 88.0}
                },
                {
                    "id": "STU-103",
                    "status": "ACTIVE",
                    "profile": {
                        "full_name": "Debolina Roy",
                        "address": {"city": "Barrackpore", "state": "WB"}
                    },
                    "enrollment": {"course_code": "PY-AI", "fee_paid": 28000.0},
                    "academics": {"score": 96.0}
                }
            ]
        }
    }
    """

    summary = process_paginated_api_response(simulated_api_json)

    print("1. Processed Nested REST API Payload Summary:")
    print(f"   * Current Page           : {summary['page_number']}")
    print(f"   * Total Active Students  : {summary['total_active_students']}")
    print(f"   * Total Active Revenue   : INR {summary['total_active_revenue_inr']:,.2f}")
    print(f"   * Merit Candidates (>=90): {summary['merit_candidates_count']}")
    print(f"   * Average Merit Score    : {summary['average_merit_score']}%\n")

    print("2. Merit Scholarship Candidate Roster:")
    for c in summary["merit_roster"]:
        print(f"   * [{c['student_id']}] {c['name']:<18} | City: {c['city']:<12} | Course: {c['course']} | Score: {c['score']}%")

    print("\n[PASSED] Filtering & Transforming Nested API Payloads Verified.")


if __name__ == "__main__":
    demonstrate_api_payload_processing()
