# topic7_files/resilient_pipeline_with_error_quarantine.py
# Module: 003_005_advance-comprehensions
# Topic: Building clean data transformation pipelines
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 3: Resilient Data Pipeline with Error Quarantine & Dead-Letter Queue (DLQ)
Demonstrates:
  1. Intercepting parsing and validation failures without breaking the streaming pipeline
  2. Partitioning stream into `(valid_records, quarantined_dlq_records)`
  3. Real-time pipeline health telemetry and error logging
"""

from typing import Iterator, Dict, Any, List, Tuple
from decimal import Decimal, InvalidOperation

class ResilientETLPipeline:
    """Production ETL pipeline with built-in Dead-Letter Queue (DLQ) quarantine."""

    def __init__(self):
        self.dlq_quarantine: List[Dict[str, Any]] = []
        self.metrics = {"ingested": 0, "processed": 0, "quarantined": 0}

    def process_stream(self, raw_stream: Iterator[Dict[str, Any]]) -> Iterator[Dict[str, Any]]:
        """Processes and enriches valid records, routing failures to quarantine."""
        for record in raw_stream:
            self.metrics["ingested"] += 1
            is_valid, parsed_record, err_reason = self._validate_and_normalize(record)

            if is_valid and parsed_record is not None:
                self.metrics["processed"] += 1
                yield parsed_record
            else:
                self.metrics["quarantined"] += 1
                self.dlq_quarantine.append({
                    "raw_payload": record,
                    "rejection_reason": err_reason
                })

    def _validate_and_normalize(self, raw: Dict[str, Any]) -> Tuple[bool, Dict[str, Any] | None, str | None]:
        """Internal pure validation guard."""
        # Check 1: Mandatory ID
        if not raw.get("id"):
            return False, None, "Missing mandatory field: 'id'"

        # Check 2: Name sanity
        raw_name = raw.get("name", "").strip()
        if not raw_name:
            return False, None, "Student name is empty or missing"

        # Check 3: Fee parsing to Decimal
        try:
            fee_dec = Decimal(str(raw.get("fee", "")))
            if fee_dec <= 0:
                return False, None, "Tuition fee must be strictly positive"
        except (InvalidOperation, ValueError, TypeError):
            return False, None, f"Invalid fee numeric literal: {raw.get('fee')}"

        normalized = {
            "id": raw["id"],
            "name": " ".join(raw_name.split()).title(),
            "tuition_fee": fee_dec,
            "course": raw.get("course", "GENERAL_PYTHON")
        }
        return True, normalized, None


def demonstrate_resilient_pipeline():
    print("=" * 70)
    print("CODER & ACCOTAX - RESILIENT PIPELINE WITH ERROR QUARANTINE")
    print("=" * 70)

    mixed_raw_stream = [
        {"id": "STU-101", "name": "sourav mukherjee", "fee": "30000.00", "course": "PY-AI"},
        {"id": "STU-102", "name": "", "fee": "35000.00", "course": "DS-ML"},               # Missing Name!
        {"id": "STU-103", "name": "debolina roy", "fee": "INVALID_FEE", "course": "PY-AI"}, # Corrupt Fee!
        {"id": "", "name": "anonymous", "fee": "20000.00", "course": "WEB-DEV"},           # Missing ID!
        {"id": "STU-105", "name": "sneha gupta", "fee": "32000.00", "course": "DS-ML"}
    ]

    pipeline = ResilientETLPipeline()
    valid_stream = pipeline.process_stream(iter(mixed_raw_stream))

    print("1. Consuming Validated Records Stream:")
    for student in valid_stream:
        print(f"   * [CLEARED] {student['id']}: {student['name']:<18} | Fee: INR {student['tuition_fee']:,.2f}")

    print("\n2. Pipeline Health & Telemetry Metrics:")
    print(f"   * Total Records Ingested   : {pipeline.metrics['ingested']}")
    print(f"   * Successfully Processed   : {pipeline.metrics['processed']}")
    print(f"   * Quarantined (DLQ) Records: {pipeline.metrics['quarantined']}\n")

    print("3. Dead-Letter Queue (DLQ) Quarantine Inspection:")
    for q in pipeline.dlq_quarantine:
        print(f"   * [QUARANTINE] Reason: {q['rejection_reason']:<35} | Payload: {q['raw_payload']}")

    print(r"""
Resilience Invariants:
  1. Production data pipelines must NEVER crash the process on single dirty records.
  2. Dirty records are diverted to Dead-Letter Queues (DLQs) for auditing and alerts.
""")
    print("[PASSED] Resilient Pipeline with Error Quarantine Verified.")


if __name__ == "__main__":
    demonstrate_resilient_pipeline()
