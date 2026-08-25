"""
# Module: 004_002_performance-optimization
# Topic 5: Optimizing loops, lookups, and eliminating algorithmic bottlenecks
# File: lookup_optimization_and_hash_indexing.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Transforming quadratic O(N*M) list lookups into O(N+M) hash lookups,
#              compound multi-key indexing, and binary range searches with bisect.
"""

import time
import bisect
import random

# Generate test student candidate dossiers
CANDIDATE_POOL = [
    {
        "app_id": f"APP_{i:05d}",
        "name": f"Student_{i}",
        "campus": random.choice(["Barrackpore", "Kolkata", "Ichapur", "Jadavpur"]),
        "course": random.choice(["PYTHON_PRO", "DATA_AI", "WEB_DEV"]),
        "score": random.randint(40, 100)
    }
    for i in range(12000)
]

# A target subset of 2,000 accepted scholarship candidate IDs
ACCEPTED_IDS = [f"APP_{i:05d}" for i in range(1000, 3000)]

def benchmark_naive_quadratic_lookup(candidates, accepted_ids_list):
    """Approach 1: O(N * M) Quadratic Search using 'in list' lookup."""
    start = time.perf_counter()
    matched = []
    # Scanning 'in accepted_ids_list' performs an O(M) linear search for each candidate
    for cand in candidates:
        if cand["app_id"] in accepted_ids_list:
            matched.append(cand)
    elapsed = time.perf_counter() - start
    return matched, elapsed

def benchmark_hash_set_lookup(candidates, accepted_ids_list):
    """Approach 2: O(N + M) Linear Search using pre-built hash set."""
    start = time.perf_counter()
    # Step 1: Build hash set in O(M) time
    accepted_set = set(accepted_ids_list)
    # Step 2: Instant O(1) hash lookup per candidate
    matched = [cand for cand in candidates if cand["app_id"] in accepted_set]
    elapsed = time.perf_counter() - start
    return matched, elapsed

def benchmark_compound_multikey_hash_index(candidates):
    """Approach 3: Compound Multi-Key Hash Index for instant multi-criteria filtering."""
    start = time.perf_counter()
    
    # Build compound index: (campus, course) -> list of candidates
    index = {}
    for cand in candidates:
        key = (cand["campus"], cand["course"])
        if key not in index:
            index[key] = []
        index[key].append(cand)
    
    # Query: Instantly fetch all candidates for ("Barrackpore", "PYTHON_PRO") in O(1)
    barrackpore_python = index.get(("Barrackpore", "PYTHON_PRO"), [])
    elapsed = time.perf_counter() - start
    return barrackpore_python, elapsed

def benchmark_bisect_threshold_search():
    """Approach 4: Bisect logarithmic O(log K) threshold grading lookup."""
    score_cutoffs = [50, 65, 80, 90]
    grade_tiers = ["Remedial", "Pass", "Merit", "Distinction", "Scholarship"]
    
    scores_to_grade = [random.randint(40, 100) for _ in range(50000)]
    
    start = time.perf_counter()
    assigned_grades = [
        grade_tiers[bisect.bisect_right(score_cutoffs, s)]
        for s in scores_to_grade
    ]
    elapsed = time.perf_counter() - start
    return assigned_grades, elapsed

def main():
    print("=" * 75)
    print("[BENCHMARK] Lookup Optimization & Hash Indexing")
    print("=" * 75)

    print(f"Dataset: {len(CANDIDATE_POOL):,} candidates vs {len(ACCEPTED_IDS):,} target IDs")
    
    # Naive vs Hash Set
    matched_naive, t_naive = benchmark_naive_quadratic_lookup(CANDIDATE_POOL, ACCEPTED_IDS)
    print(f"[1] Naive O(N*M) Nested List Search : {t_naive:.4f} sec (1.00x Baseline)")

    matched_hash, t_hash = benchmark_hash_set_lookup(CANDIDATE_POOL, ACCEPTED_IDS)
    speedup_hash = t_naive / t_hash if t_hash > 0 else 1.0
    print(f"[2] Optimized O(N+M) Hash Set Lookup : {t_hash:.4f} sec ({speedup_hash:.1f}x Faster)")

    # Multi-Key Hash Indexing
    bp_py_students, t_index = benchmark_compound_multikey_hash_index(CANDIDATE_POOL)
    print(f"[3] Compound Multi-Key Hash Indexing: {t_index:.4f} sec (Found {len(bp_py_students)} records)")

    # Bisect Binary Range Search
    grades, t_bisect = benchmark_bisect_threshold_search()
    print(f"[4] Bisect Binary Range Search (50k): {t_bisect:.4f} sec (O(log K) logarithmic)")

    print("=" * 75)
    print("[RULE] Never use 'item in list' inside a loop! Convert lists to sets")
    print("       or dictionaries upfront to reduce complexity from O(N^2) to O(N).")
    print("=" * 75)

if __name__ == "__main__":
    main()
