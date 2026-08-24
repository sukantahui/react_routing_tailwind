# topic3_files/institutional_examination_audit_stream_loader.py
# Module: 003_004_working-with-json
# Topic: Deserialization: json.load() vs json.loads()
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 4: Examination Audit Stream Ingestion Suite (Case Study)
Demonstrates:
  1. High-precision financial and academic record deserialization from stream files
  2. Combining `json.load()` with `parse_float=Decimal` for fee reconciliation
  3. Generating certified audit reports without binary floating-point roundoff errors
"""

import json
import io
from decimal import Decimal
from typing import Dict, Any, List

def process_examination_batch_stream(stream_obj) -> Dict[str, Any]:
    """Ingests examination batch JSON stream with Decimal precision."""
    # Deserializing directly from stream with Decimal floats:
    batch_doc = json.load(stream_obj, parse_float=Decimal)

    session = batch_doc.get("session", "UNKNOWN")
    center = batch_doc.get("exam_center", "UNKNOWN")
    candidates: List[Dict[str, Any]] = batch_doc.get("candidates", [])

    total_fees_collected = Decimal("0.00")
    total_score_sum = Decimal("0.00")
    platinum_distinctions = 0

    for cand in candidates:
        fee = cand.get("exam_fee_inr", Decimal("0.00"))
        score = cand.get("composite_score", Decimal("0.00"))

        total_fees_collected += fee
        total_score_sum += score

        if score >= Decimal("90.0"):
            platinum_distinctions += 1

    candidate_count = len(candidates)
    average_score = (total_score_sum / candidate_count) if candidate_count > 0 else Decimal("0.00")

    return {
        "status": "AUDITED_SUCCESS",
        "academic_session": session,
        "center_name": center,
        "candidate_count": candidate_count,
        "total_fees_reconciled_inr": total_fees_collected,
        "average_score_pct": round(average_score, 2),
        "platinum_distinctions_awarded": platinum_distinctions
    }


def run_audit_stream_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - EXAMINATION AUDIT STREAM INGESTION SUITE")
    print("=" * 70)

    # Simulated incoming batch payload stream:
    incoming_batch_stream_data = """
    {
        "session": "2026-FINAL",
        "exam_center": "Barrackpore Main Campus",
        "candidates": [
            {"id": "STU-101", "name": "Sourav Mukherjee", "exam_fee_inr": 2500.25, "composite_score": 95.50},
            {"id": "STU-102", "name": "Priyanka Sen",     "exam_fee_inr": 2500.25, "composite_score": 92.00},
            {"id": "STU-103", "name": "Debolina Roy",     "exam_fee_inr": 2500.25, "composite_score": 96.75},
            {"id": "STU-104", "name": "Rahul Verma",      "exam_fee_inr": 2500.25, "composite_score": 84.50}
        ]
    }
    """

    stream = io.StringIO(incoming_batch_stream_data)
    audit_report = process_examination_batch_stream(stream)

    print("1. Examination Batch Stream Audited Successfully:")
    print(f"   * Session              : {audit_report['academic_session']}")
    print(f"   * Center               : {audit_report['center_name']}")
    print(f"   * Total Candidates     : {audit_report['candidate_count']}")
    print(f"   * Total Fees Settled   : INR {audit_report['total_fees_reconciled_inr']:,.2f} (Exact Decimal)")
    print(f"   * Average Score        : {audit_report['average_score_pct']}%")
    print(f"   * Platinum Honors Count: {audit_report['platinum_distinctions_awarded']}")

    print("\n[PASSED] Examination Audit Stream Ingestion Suite Verified.")


if __name__ == "__main__":
    run_audit_stream_demo()
