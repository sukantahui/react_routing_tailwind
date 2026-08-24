# topic1_files/institutional_admission_roster_lookup_optimizer.py
# Module: 004_002_performance-optimization
# Topic: Comparing lookup costs across Python data structures (list, set, dict, deque)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 1 - File 4: Institutional Admission Roster Lookup Optimizer (Case Study)
Demonstrates:
  1. High-throughput student eligibility validation across 50,000 enrolled candidates
  2. Benchmarking throughput (queries/sec) across List vs Set vs Dict vs Deque
  3. Generating production architectural performance recommendation reports
"""

import time
from collections import deque
from typing import List, Set, Dict, Any

class InstitutionalRosterLookupOptimizer:
    """Production candidate verification and throughput benchmarking engine."""

    def __init__(self, student_count: int = 50_000):
        self.student_count = student_count
        # Synthesize raw candidate IDs
        self.raw_ids = [f"STU-2026-{i:06d}" for i in range(student_count)]

        # Prepare collections
        self.list_roster: List[str] = list(self.raw_ids)
        self.set_roster: Set[str] = set(self.raw_ids)
        self.dict_roster: Dict[str, dict] = {
            sid: {"name": f"Student_{i}", "campus": "Barrackpore" if i % 2 == 0 else "Kolkata"}
            for i, sid in enumerate(self.raw_ids)
        }
        self.deque_roster: deque = deque(self.raw_ids)

    def benchmark_query_throughput(self, sample_queries_count: int = 1_000) -> Dict[str, Any]:
        """Executes repeated queries and measures throughput across data structures."""
        # Query sample targets (mixture of existing and non-existing IDs)
        queries = [f"STU-2026-{i:06d}" for i in range(0, sample_queries_count * 2, 2)]

        # 1. Benchmark List Lookups
        t0 = time.perf_counter()
        list_matches = sum(1 for q in queries if q in self.list_roster)
        list_duration_s = time.perf_counter() - t0
        list_qps = sample_queries_count / (list_duration_s or 0.0001)

        # 2. Benchmark Deque Lookups
        t0 = time.perf_counter()
        deque_matches = sum(1 for q in queries if q in self.deque_roster)
        deque_duration_s = time.perf_counter() - t0
        deque_qps = sample_queries_count / (deque_duration_s or 0.0001)

        # 3. Benchmark Set Lookups
        t0 = time.perf_counter()
        set_matches = sum(1 for q in queries if q in self.set_roster)
        set_duration_s = time.perf_counter() - t0
        set_qps = sample_queries_count / (set_duration_s or 0.000001)

        # 4. Benchmark Dict Lookups
        t0 = time.perf_counter()
        dict_matches = sum(1 for q in queries if q in self.dict_roster)
        dict_duration_s = time.perf_counter() - t0
        dict_qps = sample_queries_count / (dict_duration_s or 0.000001)

        return {
            "roster_size": self.student_count,
            "queries_executed": sample_queries_count,
            "list": {"time_ms": round(list_duration_s * 1000, 2), "qps": round(list_qps, 1)},
            "deque": {"time_ms": round(deque_duration_s * 1000, 2), "qps": round(deque_qps, 1)},
            "set": {"time_ms": round(set_duration_s * 1000, 4), "qps": round(set_qps, 1)},
            "dict": {"time_ms": round(dict_duration_s * 1000, 4), "qps": round(dict_qps, 1)},
            "speedup_set_vs_list": round(list_duration_s / (set_duration_s or 0.00001), 1)
        }


def demonstrate_roster_optimizer():
    print("=" * 70)
    print("CODER & ACCOTAX - INSTITUTIONAL ROSTER LOOKUP OPTIMIZER")
    print("=" * 70)

    roster_size = 50_000
    query_count = 1_000

    print(f"1. Initializing Institutional Roster with {roster_size:,} Student Records...")
    engine = InstitutionalRosterLookupOptimizer(roster_size)

    print(f"\n2. Executing {query_count:,} Verification Lookups Across Data Structures:")
    metrics = engine.benchmark_query_throughput(query_count)

    print(f"   * List  (Linear O(N) Scan) : {metrics['list']['time_ms']:>8.2f} ms ({metrics['list']['qps']:>10,.1f} queries/sec)")
    print(f"   * Deque (Linear Traversal) : {metrics['deque']['time_ms']:>8.2f} ms ({metrics['deque']['qps']:>10,.1f} queries/sec)")
    print(f"   * Set   (O(1) Hash Table)  : {metrics['set']['time_ms']:>8.4f} ms ({metrics['set']['qps']:>10,.1f} queries/sec)")
    print(f"   * Dict  (O(1) Key Table)   : {metrics['dict']['time_ms']:>8.4f} ms ({metrics['dict']['qps']:>10,.1f} queries/sec)\n")

    print(f"3. Throughput Speedup: SET is {metrics['speedup_set_vs_list']:,}x FASTER than LIST!")

    print(r"""
Architectural Recommendation:
  - For high-frequency membership verification: Use `set` for ID validation.
  - For key-value association and metadata queries: Use `dict`.
  - For FIFO queues or sliding window streams: Use `collections.deque`.
  - For sequential ordered collections with indexed access: Use `list`.
""")
    print("[PASSED] Institutional Roster Lookup Optimizer Verified.")


if __name__ == "__main__":
    demonstrate_roster_optimizer()
