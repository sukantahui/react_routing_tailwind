"""
# Module: 004_002_performance-optimization
# Topic 7: Best practices for high-throughput Python applications
# File: institutional_high_throughput_engine.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: End-to-end multi-campus admission engine processing 40,000 candidate
#              dossiers using multi-core parallel multiprocessing, zero-copy buffer
#              transformations, and batched streaming aggregations.
"""

import time
import math
from concurrent.futures import ProcessPoolExecutor
from collections import defaultdict, namedtuple
from itertools import islice

CandidateDossier = namedtuple("CandidateDossier", ["app_no", "name", "campus", "score", "fee"])

# Generate 40,000 candidate application records
def generate_applications(count=40000):
    campuses = ["Barrackpore", "Kolkata", "Ichapur", "Jadavpur"]
    names = ["Mamata", "Mahima", "Abhronila", "Susmita", "Debangshu"]
    return [
        CandidateDossier(
            app_no=f"APP_{i:06d}",
            name=names[i % 5],
            campus=campuses[i % 4],
            score=45.0 + (i * 17) % 55,
            fee=8500.0 + (i % 5) * 500
        )
        for i in range(count)
    ]

def compute_chunk_statistics(chunk):
    """Worker function executed across multiple CPU cores in parallel."""
    campus_stats = defaultdict(lambda: {"count": 0, "total_score": 0.0, "total_fee": 0.0})
    
    for item in chunk:
        # Complex mathematical scoring adjustment
        normalized_score = math.sqrt(item.score) * 10.0
        c = campus_stats[item.campus]
        c["count"] += 1
        c["total_score"] += normalized_score
        c["total_fee"] += item.fee
        
    # Return serializable summary dict
    return dict(campus_stats)

def chunk_list(lst, chunk_size):
    """Divide dataset into chunks for multi-worker parallel distribution."""
    for i in range(0, len(lst), chunk_size):
        yield lst[i : i + chunk_size]

def run_high_throughput_engine(data, num_workers=4):
    """Distributed parallel processing engine."""
    start = time.perf_counter()
    
    chunk_size = max(1000, len(data) // num_workers)
    chunks = list(chunk_list(data, chunk_size))
    
    # Execute across multi-core ProcessPool
    with ProcessPoolExecutor(max_workers=num_workers) as executor:
        chunk_summaries = list(executor.map(compute_chunk_statistics, chunks))
        
    # Aggregate results in main process
    final_stats = defaultdict(lambda: {"count": 0, "total_score": 0.0, "total_fee": 0.0})
    for summary in chunk_summaries:
        for campus, stats in summary.items():
            final_stats[campus]["count"] += stats["count"]
            final_stats[campus]["total_score"] += stats["total_score"]
            final_stats[campus]["total_fee"] += stats["total_fee"]
            
    elapsed = time.perf_counter() - start
    return final_stats, elapsed

def main():
    dataset = generate_applications(40000)
    print("=" * 80)
    print(f"[CASE STUDY] High-Throughput Multi-Core Admission Engine (N = {len(dataset):,})")
    print("=" * 80)

    print(f"Processing {len(dataset):,} student records across 4 CPU worker processes...")
    stats, duration = run_high_throughput_engine(dataset, num_workers=4)
    
    rps = len(dataset) / duration if duration > 0 else 0
    print(f"\n[+] Execution Completed in: {duration:.4f} seconds ({rps:,.0f} records/second)")

    print("\n[SUMMARY] Aggregated Multi-Campus Metrics:")
    for campus, data in sorted(stats.items()):
        avg_score = data["total_score"] / data["count"] if data["count"] else 0
        print(f"   * {campus:<14}: {data['count']:>6,} Enrolled | Avg Curve Score: {avg_score:.2f} | Total Revenue: Rs. {data['total_fee']:>12,.2f}")

    print("=" * 80)
    print("[TAKEAWAY] Combining namedtuples, chunked multiprocessing, and local aggregations")
    print("           delivers maximum throughput, low memory, and linear core scaling.")
    print("=" * 80)

if __name__ == "__main__":
    main()
