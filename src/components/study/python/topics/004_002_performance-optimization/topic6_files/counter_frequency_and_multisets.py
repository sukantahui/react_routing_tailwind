"""
# Module: 004_002_performance-optimization
# Topic 6: collections module: deque, Counter, defaultdict, OrderedDict, namedtuple
# File: counter_frequency_and_multisets.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: High-speed frequency analysis, top-K selection with most_common(),
#              and multiset arithmetic algebra (+, -, &, |).
"""

import time
import random
from collections import Counter

# Generate 50,000 course enrollment votes / survey submissions
COURSES = ["PYTHON_PRO", "DATA_AI", "WEB_DEV", "CLOUD_DEVOPS", "CYBER_SECURITY", "DBMS_SQL"]
CAMPUSES = ["Barrackpore", "Kolkata", "Ichapur", "Jadavpur"]
STUDENTS = ["Mamata", "Mahima", "Abhronila", "Susmita", "Debangshu"]

ENROLLMENTS = [
    {
        "student": random.choice(STUDENTS),
        "course": random.choice(COURSES),
        "campus": random.choice(CAMPUSES),
        "rating": random.randint(1, 5)
    }
    for _ in range(50000)
]

def benchmark_manual_dict_counting(data):
    """Approach 1: Counting frequencies using standard manual dictionary branching."""
    start = time.perf_counter()
    counts = {}
    for item in data:
        key = item["course"]
        if key not in counts:
            counts[key] = 0
        counts[key] += 1
    # Sorting to get top 3
    top_3 = sorted(counts.items(), key=lambda x: x[1], reverse=True)[:3]
    elapsed = time.perf_counter() - start
    return top_3, elapsed

def benchmark_counter_counting(data):
    """Approach 2: Counting frequencies and top-K using collections.Counter."""
    start = time.perf_counter()
    # Counter constructor implemented in optimized C
    counter = Counter(item["course"] for item in data)
    # most_common uses heapq.nlargest running in O(N log K) time
    top_3 = counter.most_common(3)
    elapsed = time.perf_counter() - start
    return top_3, elapsed

def demonstrate_multiset_algebra():
    """Approach 3: Multiset / Bag Arithmetic with Counter (+, -, &, |)."""
    print("\n[MULTISET ALGEBRA] Demonstrating Bag Arithmetic on Student Inventories:")
    
    # Campus lab kit supplies
    barrackpore_lab = Counter(laptops=25, projectors=4, routers=12, mice=40)
    kolkata_lab = Counter(laptops=30, projectors=6, routers=8, keyboards=35)
    
    print(f"   * Barrackpore Inventory : {dict(barrackpore_lab)}")
    print(f"   * Kolkata Inventory     : {dict(kolkata_lab)}")
    
    # 1. Addition (+): Combines quantities
    combined = barrackpore_lab + kolkata_lab
    print(f"   * [+] Total Combined    : {dict(combined)}")
    
    # 2. Subtraction (-): Deducts quantities (keeps only positive)
    diff = barrackpore_lab - kolkata_lab
    print(f"   * [-] Net Surplus in BP : {dict(diff)}")
    
    # 3. Intersection (&): Minimum common stock
    min_common = barrackpore_lab & kolkata_lab
    print(f"   * [&] Guaranteed Common : {dict(min_common)}")
    
    # 4. Union (|): Maximum stock across either lab
    max_capacity = barrackpore_lab | kolkata_lab
    print(f"   * [|] Max Standby Stock : {dict(max_capacity)}")

def main():
    print("=" * 75)
    print(f"[BENCHMARK] Frequency Analysis: Manual Dict vs Counter (N = {len(ENROLLMENTS):,})")
    print("=" * 75)

    res_manual, t_manual = benchmark_manual_dict_counting(ENROLLMENTS)
    print(f"[1] Manual Dict Counting + Sort   : {t_manual:.4f} sec -> Top 3: {res_manual}")

    res_counter, t_counter = benchmark_counter_counting(ENROLLMENTS)
    speedup = t_manual / t_counter if t_counter > 0 else 1.0
    print(f"[2] collections.Counter.most_common: {t_counter:.4f} sec -> Top 3: {res_counter}")
    print(f"[>] Speedup Factor                : {speedup:.2f}x Faster")

    demonstrate_multiset_algebra()

    print("=" * 75)
    print("[TAKEAWAY] Counter eliminates dictionary boilerplate, finds top-K in O(N log K),")
    print("           and supports multiset arithmetic operations (+, -, &, |).")
    print("=" * 75)

if __name__ == "__main__":
    main()
