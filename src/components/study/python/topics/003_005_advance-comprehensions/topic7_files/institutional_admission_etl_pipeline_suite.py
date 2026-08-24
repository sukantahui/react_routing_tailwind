# topic7_files/institutional_admission_etl_pipeline_suite.py
# Module: 003_005_advance-comprehensions
# Topic: Building clean data transformation pipelines
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 4: Institutional Admission ETL Pipeline Suite (Case Study)
Demonstrates:
  1. Complete multi-stage streaming ETL pipeline architecture for Coder & AccoTax
  2. Extract -> Clean/Validate -> Tax Computation -> Aggregation & Persistence
  3. Real-time telemetry, audit logging, and financial ledger generation
"""

from decimal import Decimal
from typing import Iterator, Dict, Any, List, Tuple
import json

class InstitutionalAdmissionETLPipeline:
    """Production Multi-Stage ETL Engine for Institutional Candidate Processing."""

    GST_RATE = Decimal("0.18")
    MIN_FEE_THRESHOLD = Decimal("10000.00")

    def __init__(self):
        self.dlq_records: List[Dict[str, Any]] = []

    # STAGE 1: EXTRACT / INGESTION
    def stage_extract(self, raw_data_batch: List[Dict[str, Any]]) -> Iterator[Dict[str, Any]]:
        """Yields raw student application records from raw batch."""
        for item in raw_data_batch:
            yield item

    # STAGE 2: TRANSFORM - VALIDATE & SANITIZE
    def stage_validate_sanitize(self, stream: Iterator[Dict[str, Any]]) -> Iterator[Dict[str, Any]]:
        """Cleans and validates records; routes corrupt records to DLQ."""
        for record in stream:
            app_id = record.get("app_id")
            raw_name = record.get("name", "").strip()
            raw_fee = record.get("fee_offered")

            if not app_id or not raw_name or raw_fee is None:
                self.dlq_records.append({"record": record, "error": "Missing mandatory fields"})
                continue

            try:
                fee_val = Decimal(str(raw_fee))
                if fee_val < self.MIN_FEE_THRESHOLD:
                    self.dlq_records.append({"record": record, "error": f"Fee below threshold INR {self.MIN_FEE_THRESHOLD}"})
                    continue
            except Exception:
                self.dlq_records.append({"record": record, "error": f"Invalid fee literal: {raw_fee}"})
                continue

            yield {
                "app_id": app_id,
                "name": " ".join(raw_name.split()).title(),
                "course": record.get("course", "PY-AI"),
                "campus": record.get("campus", "Barrackpore"),
                "base_fee": fee_val
            }

    # STAGE 3: TRANSFORM - TAX & NET COMPUTATION
    def stage_compute_financials(self, stream: Iterator[Dict[str, Any]]) -> Iterator[Dict[str, Any]]:
        """Pure transformation calculating GST tax and gross payable."""
        for record in stream:
            base = record["base_fee"]
            gst_amount = round(base * self.GST_RATE, 2)
            gross_amount = round(base + gst_amount, 2)

            yield {
                **record,
                "gst_amount": gst_amount,
                "gross_fee": gross_amount
            }

    # STAGE 4: LOAD / AUDIT REPORT GENERATION
    def execute_etl(self, raw_input_batch: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Executes the full pipeline and compiles audit summary."""
        s1 = self.stage_extract(raw_input_batch)
        s2 = self.stage_validate_sanitize(s1)
        s3 = self.stage_compute_financials(s2)

        cleared_candidates = list(s3)

        total_base = sum(c["base_fee"] for c in cleared_candidates)
        total_gst = sum(c["gst_amount"] for c in cleared_candidates)
        total_gross = sum(c["gross_fee"] for c in cleared_candidates)

        return {
            "total_ingested": len(raw_input_batch),
            "total_cleared": len(cleared_candidates),
            "total_quarantined": len(self.dlq_records),
            "financial_audit": {
                "total_net_base_fee": total_base,
                "total_gst_collected_18": total_gst,
                "total_gross_bank_deposit": total_gross
            },
            "cleared_roster": cleared_candidates,
            "dlq_audit": self.dlq_records
        }


def demonstrate_etl_pipeline():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL ADMISSION ETL PIPELINE SUITE")
    print("=" * 70)

    raw_batch = [
        {"app_id": "APP-901", "name": "sourav mukherjee", "course": "PY-AI", "campus": "Barrackpore", "fee_offered": "30000.00"},
        {"app_id": "APP-902", "name": "priyanka sen", "course": "DS-ML", "campus": "Kolkata", "fee_offered": "35000.00"},
        {"app_id": "APP-903", "name": "corrupt record", "fee_offered": "not_a_number"}, # Corrupt!
        {"app_id": "APP-904", "name": "debolina roy", "course": "PY-AI", "campus": "Barrackpore", "fee_offered": "28000.00"},
        {"app_id": "APP-905", "name": "low fee candidate", "fee_offered": "5000.00"},   # Below threshold!
        {"app_id": "APP-906", "name": "rahul verma", "course": "WEB-DEV", "campus": "Kolkata", "fee_offered": "25000.00"}
    ]

    pipeline = InstitutionalAdmissionETLPipeline()
    report = pipeline.execute_etl(raw_batch)

    print("1. ETL Pipeline Execution Audit Summary:")
    print(f"   * Total Records Ingested    : {report['total_ingested']}")
    print(f"   * Cleared Candidates (Load) : {report['total_cleared']}")
    print(f"   * Quarantined (DLQ) Records : {report['total_quarantined']}\n")

    print("2. Financial Ledger Telemetry:")
    audit = report["financial_audit"]
    print(f"   * Total Net Base Revenue    : INR {audit['total_net_base_fee']:>10,.2f}")
    print(f"   * Total GST Collected (18%) : INR {audit['total_gst_collected_18']:>10,.2f}")
    print(f"   * Total Gross Bank Deposit  : INR {audit['total_gross_bank_deposit']:>10,.2f}\n")

    print("3. Cleared Candidate Enrolment Roster:")
    for c in report["cleared_roster"]:
        print(f"   * [{c['app_id']}] {c['name']:<18} | {c['course']:<8} | {c['campus']:<12} | Gross: INR {c['gross_fee']:>8,.2f}")

    print("\n4. DLQ Quarantine Inspection Log:")
    for dlq in report["dlq_audit"]:
        print(f"   * [DLQ] Reason: {dlq['error']:<30} | App: {dlq['record'].get('app_id')}")

    print("\n[PASSED] Institutional Admission ETL Pipeline Suite Verified.")


if __name__ == "__main__":
    demonstrate_etl_pipeline()
