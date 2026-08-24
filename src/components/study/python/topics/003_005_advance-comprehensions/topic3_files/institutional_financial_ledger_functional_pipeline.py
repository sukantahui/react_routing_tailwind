# topic3_files/institutional_financial_ledger_functional_pipeline.py
# Module: 003_005_advance-comprehensions
# Topic: Functional tools: map(), filter(), and functools.reduce()
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 4: Financial Ledger & GST Tax Functional Pipeline (Case Study)
Demonstrates:
  1. Complete pure functional pipeline using `map()`, `filter()`, `reduce()`, and `partial`
  2. High-precision financial calculations using `Decimal`
  3. Generating full financial audit summaries without mutating source data
"""

import functools
from decimal import Decimal
from typing import Dict, Any, List

def calculate_gross_with_gst(base_fee: Decimal, gst_rate: Decimal) -> Decimal:
    """Computes gross fee inclusive of GST tax."""
    return round(base_fee * (Decimal("1.00") + gst_rate), 2)

def run_financial_functional_pipeline(transactions: List[Dict[str, Any]]) -> Dict[str, Any]:
    # 1. Partial: Freeze 18% GST rate for professional education services
    apply_18_gst = functools.partial(calculate_gross_with_gst, gst_rate=Decimal("0.18"))

    # 2. Filter: Only audited, cleared transactions
    is_cleared = lambda tx: tx.get("payment_status") == "CLEARED"
    cleared_txs = filter(is_cleared, transactions)

    # 3. Map: Enrich transactions with exact Gross Fee (including GST)
    def enrich_financials(tx: Dict[str, Any]) -> Dict[str, Any]:
        base = Decimal(str(tx["base_fee"]))
        gross = apply_18_gst(base)
        gst_component = gross - base
        return {
            "txn_id": tx["txn_id"],
            "student_name": tx["student_name"],
            "course": tx["course"],
            "base_fee": base,
            "gst_component": gst_component,
            "gross_fee": gross
        }

    enriched_stream = map(enrich_financials, cleared_txs)

    # 4. Reduce: Fold entire stream into Institutional Audit Ledger
    def audit_ledger_reducer(acc: Dict[str, Any], tx: Dict[str, Any]) -> Dict[str, Any]:
        acc["total_base_revenue"] += tx["base_fee"]
        acc["total_gst_collected"] += tx["gst_component"]
        acc["total_gross_collected"] += tx["gross_fee"]
        acc["cleared_tx_count"] += 1
        acc["processed_records"].append(tx)
        return acc

    ledger_initial_state = {
        "total_base_revenue": Decimal("0.00"),
        "total_gst_collected": Decimal("0.00"),
        "total_gross_collected": Decimal("0.00"),
        "cleared_tx_count": 0,
        "processed_records": []
    }

    return functools.reduce(audit_ledger_reducer, enriched_stream, ledger_initial_state)


def demonstrate_financial_ledger_pipeline():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL FINANCIAL FUNCTIONAL PIPELINE")
    print("=" * 70)

    raw_tx_records = [
        {"txn_id": "TXN-801", "student_name": "Sourav Mukherjee", "course": "PY-AI", "base_fee": "28500.00", "payment_status": "CLEARED"},
        {"txn_id": "TXN-802", "student_name": "Priyanka Sen", "course": "DS-ML", "base_fee": "32000.00", "payment_status": "CLEARED"},
        {"txn_id": "TXN-803", "student_name": "Debolina Roy", "course": "PY-AI", "base_fee": "28500.00", "payment_status": "PENDING"},
        {"txn_id": "TXN-804", "student_name": "Rahul Verma", "course": "WEB-DEV", "base_fee": "25000.00", "payment_status": "CLEARED"},
        {"txn_id": "TXN-805", "student_name": "Sneha Gupta", "course": "DS-ML", "base_fee": "32000.00", "payment_status": "CLEARED"}
    ]

    report = run_financial_functional_pipeline(raw_tx_records)

    print("1. Institutional Financial Audit Summary (Derived via map-filter-reduce):")
    print(f"   * Total Cleared Transactions : {report['cleared_tx_count']}")
    print(f"   * Total Base Revenue (Net)   : INR {report['total_base_revenue']:,.2f}")
    print(f"   * Total GST Collected (18%)  : INR {report['total_gst_collected']:,.2f}")
    print(f"   * Total Gross Revenue (Bank) : INR {report['total_gross_collected']:,.2f}\n")

    print("2. Cleared Transaction Ledger Entries:")
    for tx in report["processed_records"]:
        print(f"   * [{tx['txn_id']}] {tx['student_name']:<18} | Base: INR {tx['base_fee']:>9,.2f} | GST: INR {tx['gst_component']:>8,.2f} | Gross: INR {tx['gross_fee']:>9,.2f}")

    print("\n[PASSED] Institutional Financial Ledger Functional Pipeline Verified.")


if __name__ == "__main__":
    demonstrate_financial_ledger_pipeline()
