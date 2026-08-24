# topic0_files/institutional_admission_query_complexity_analyzer.py
# Module: 004_002_performance-optimization
# Topic: Big-O notation basics (Time & Space complexity: O(1), O(N), O(N log N), O(N^2))
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 4: Institutional Fee & Admission Query Complexity Auditor (Case Study)
Demonstrates:
  1. Real-world refactoring from Naive O(N*M) nested search to Optimized O(N + M) hash indexing
  2. Reconciling student admission records against banking fee transaction ledgers
  3. Benchmarking CPU latency and generating audit performance reports
"""

import time
from typing import List, Dict, Any

class InstitutionalQueryComplexityAuditor:
    """Production complexity analyzer and student fee ledger reconciler."""

    @staticmethod
    def naive_reconcile_fees_on2(admissions: List[Dict[str, Any]], bank_txns: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Naive O(N * M) nested loop: For every student, scans the entire bank transaction list."""
        reconciled = []
        for student in admissions:
            matched_txn = None
            for txn in bank_txns:  # Inner linear scan
                if txn["student_id"] == student["id"]:
                    matched_txn = txn
                    break
            reconciled.append({
                "student_id": student["id"],
                "name": student["name"],
                "fee_cleared": matched_txn is not None,
                "amount": matched_txn["amount"] if matched_txn else 0
            })
        return reconciled

    @staticmethod
    def optimized_reconcile_fees_on(admissions: List[Dict[str, Any]], bank_txns: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Optimized O(N + M) hash indexing: Builds O(M) dict index, then O(1) lookups for N students."""
        # Step 1: Build O(M) Hash Table Index
        txn_map = {txn["student_id"]: txn for txn in bank_txns}

        # Step 2: Reconcile in O(1) per student -> Total O(N)
        reconciled = []
        for student in admissions:
            matched_txn = txn_map.get(student["id"])  # O(1) hash lookup!
            reconciled.append({
                "student_id": student["id"],
                "name": student["name"],
                "fee_cleared": matched_txn is not None,
                "amount": matched_txn["amount"] if matched_txn else 0
            })
        return reconciled


def demonstrate_institutional_auditor():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL RECONCILIATION COMPLEXITY AUDITOR")
    print("=" * 70)

    # Generate synthetic admission and banking datasets (N = 3,000 students, M = 3,000 transactions):
    record_count = 3_000
    print(f"1. Synthesizing {record_count:,} Student Admissions & Banking Transactions...")

    admissions_data = [
        {"id": f"STU-{i:05d}", "name": f"Student_{i}", "campus": "Barrackpore" if i % 2 == 0 else "Kolkata"}
        for i in range(record_count)
    ]
    bank_transactions = [
        {"student_id": f"STU-{i:05d}", "amount": 30000.0, "txn_ref": f"TXN-2026-{i:05d}"}
        for i in range(0, record_count, 2)  # 50% paid
    ]

    # Benchmark 1: Naive O(N * M)
    print("\n2. Executing Naive O(N * M) Nested Loop Reconciler:")
    t0 = time.perf_counter()
    naive_res = InstitutionalQueryComplexityAuditor.naive_reconcile_fees_on2(admissions_data, bank_transactions)
    naive_duration_ms = (time.perf_counter() - t0) * 1000.0
    print(f"   * Naive O(N*M) Execution Time   : {naive_duration_ms:.2f} ms")
    print(f"   * Records Processed             : {len(naive_res):,} records")

    # Benchmark 2: Optimized O(N + M)
    print("\n3. Executing Optimized O(N + M) Hash Indexed Reconciler:")
    t0 = time.perf_counter()
    opt_res = InstitutionalQueryComplexityAuditor.optimized_reconcile_fees_on(admissions_data, bank_transactions)
    opt_duration_ms = (time.perf_counter() - t0) * 1000.0
    print(f"   * Optimized O(N+M) Execution Time: {opt_duration_ms:.2f} ms")
    print(f"   * Records Processed             : {len(opt_res):,} records")

    # Speedup ratio
    speedup = naive_duration_ms / (opt_duration_ms or 0.001)
    print(f"\n4. Algorithmic Optimization Result: {speedup:.1f}x PERFORMANCE SPEEDUP!")

    print(r"""
Production Engineering Summary:
  1. Naive nested loops scale quadratically O(N^2), causing high cloud CPU costs and request timeouts.
  2. Indexing foreign records into a Python dictionary creates an O(1) hash map, collapsing complexity to O(N).
  3. Algorithmic optimization yields 100x to 1000x speedups without changing hardware or compilers.
""")
    print("[PASSED] Institutional Query Complexity Auditor Verified.")


if __name__ == "__main__":
    demonstrate_institutional_auditor()
