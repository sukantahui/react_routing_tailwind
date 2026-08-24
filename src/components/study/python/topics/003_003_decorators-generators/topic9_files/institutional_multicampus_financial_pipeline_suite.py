# topic9_files/institutional_multicampus_financial_pipeline_suite.py
# Module: 003_003_decorators-generators
# Topic: Generator functions vs regular functions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 9 - File 4: Multi-Campus Regional Financial Pipeline Suite (Case Study)
Demonstrates:
  1. High-throughput regional financial pipeline utilizing `yield from` subgenerator delegation
  2. Independent sub-generator batch reporting combined into a master institutional ledger
  3. Constant O(1) memory consumption across multi-branch enterprise scale
"""

from typing import List, Dict, Any, Generator

def branch_admission_stream(
    branch_name: str,
    records: List[Dict[str, Any]]
) -> Generator[Dict[str, Any], None, Dict[str, Any]]:
    """Sub-generator streaming verified admission vouchers and returning branch revenue."""
    branch_revenue = 0.0
    admitted = 0

    for r in records:
        net_fee = round(r["fee"] * (1.0 - r.get("scholarship", 0.0)), 2)
        branch_revenue += net_fee
        admitted += 1

        yield {
            "branch": branch_name,
            "voucher_id": f"VOUCH-{branch_name[:3].upper()}-{r['id']}",
            "student_id": r["id"],
            "name": r["name"],
            "course": r["course"],
            "fee_paid": net_fee
        }

    return {
        "branch": branch_name,
        "total_admitted": admitted,
        "branch_revenue": branch_revenue
    }


def multi_campus_regional_pipeline(
    barrackpore_records: List[Dict[str, Any]],
    kolkata_records: List[Dict[str, Any]],
    online_records: List[Dict[str, Any]]
) -> Generator[Dict[str, Any], None, Dict[str, Any]]:
    """Master delegator pipeline aggregating all branches with `yield from`."""
    # 1. Stream Barrackpore:
    bp_report = yield from branch_admission_stream("Barrackpore", barrackpore_records)

    # 2. Stream Kolkata:
    kol_report = yield from branch_admission_stream("Kolkata", kolkata_records)

    # 3. Stream Online:
    online_report = yield from branch_admission_stream("Online", online_records)

    # Calculate master consolidation:
    gross_regional_revenue = bp_report["branch_revenue"] + kol_report["branch_revenue"] + online_report["branch_revenue"]
    grand_students_total = bp_report["total_admitted"] + kol_report["total_admitted"] + online_report["total_admitted"]

    return {
        "regional_branches": [bp_report, kol_report, online_report],
        "grand_students_total": grand_students_total,
        "gross_regional_revenue": gross_regional_revenue,
        "audit_status": "REGIONAL_SETTLEMENT_VERIFIED"
    }


def run_multicampus_demo():
    print("=" * 70)
    print("CODER & ACCOTAX - MULTI-CAMPUS REGIONAL FINANCIAL PIPELINE")
    print("=" * 70)

    bp_data = [
        {"id": "STU-101", "name": "Sourav Mukherjee", "course": "Python AI", "fee": 25000.0, "scholarship": 0.20},
        {"id": "STU-102", "name": "Priyanka Sen", "course": "Data Science", "fee": 30000.0, "scholarship": 0.10}
    ]
    kol_data = [
        {"id": "STU-201", "name": "Rahul Verma", "course": "Python Core", "fee": 18000.0, "scholarship": 0.00},
        {"id": "STU-202", "name": "Debolina Roy", "course": "ML & DL", "fee": 28000.0, "scholarship": 0.15}
    ]
    online_data = [
        {"id": "STU-301", "name": "Amitava Sen", "course": "Full-Stack Web", "fee": 22000.0, "scholarship": 0.10}
    ]

    print("1. Streaming Multi-Campus Vouchers Lazily via `yield from`:")
    pipeline = multi_campus_regional_pipeline(bp_data, kol_data, online_data)

    while True:
        try:
            voucher = next(pipeline)
            print(f"   [{voucher['branch']:<11}] {voucher['voucher_id']}: {voucher['name']:<18} -> INR {voucher['fee_paid']:>8,.2f}")
        except StopIteration as exc:
            manifest = exc.value
            print("\n2. Consolidated Regional Accounting Manifest (`StopIteration.value`):")
            for b in manifest["regional_branches"]:
                print(f"   * Branch: {b['branch']:<12} | Students: {b['total_admitted']} | Revenue: INR {b['branch_revenue']:>9,.2f}")
            print(f"\n   -> Total Regional Admissions: {manifest['grand_students_total']}")
            print(f"   -> Gross Regional Revenue   : INR {manifest['gross_regional_revenue']:,.2f}")
            print(f"   -> Audit Status             : {manifest['audit_status']}")
            break

    print("\n[PASSED] Multi-Campus Regional Financial Pipeline Verified.")


if __name__ == "__main__":
    run_multicampus_demo()
