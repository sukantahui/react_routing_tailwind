"""
# Module: 004_002_performance-optimization
# Topic 6: collections module: deque, Counter, defaultdict, OrderedDict, namedtuple
# File: defaultdict_and_ordereddict_mastery.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Multi-level grouping with defaultdict and building an in-memory
#              LRU (Least Recently Used) cache with OrderedDict.
"""

import time
from collections import defaultdict, OrderedDict

# Generate 40,000 student fee payment transactions
PAYMENTS = [
    {
        "student": ["Mamata", "Mahima", "Abhronila", "Susmita", "Debangshu"][i % 5],
        "campus": ["Barrackpore", "Kolkata", "Ichapur", "Jadavpur"][i % 4],
        "course": ["PYTHON_PRO", "DATA_AI", "WEB_DEV"][i % 3],
        "amount": 2500.0 + (i % 10) * 500
    }
    for i in range(40000)
]

def benchmark_standard_dict_grouping(payments):
    """Approach 1: Grouping with standard dict and manual key checks."""
    start = time.perf_counter()
    grouped = {}
    for p in payments:
        campus = p["campus"]
        if campus not in grouped:
            grouped[campus] = []
        grouped[campus].append(p)
    elapsed = time.perf_counter() - start
    return grouped, elapsed

def benchmark_defaultdict_grouping(payments):
    """Approach 2: Grouping with collections.defaultdict(list)."""
    start = time.perf_counter()
    # C-level default factory avoids manual 'if not in' branching
    grouped = defaultdict(list)
    for p in payments:
        grouped[p["campus"]].append(p)
    elapsed = time.perf_counter() - start
    return grouped, elapsed

class LRUCache:
    """Production-grade LRU Cache using collections.OrderedDict."""
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: str):
        if key not in self.cache:
            return None
        # Move accessed item to end (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: str, value: any):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        # Evict least recently used if capacity exceeded
        if len(self.cache) > self.capacity:
            # popitem(last=False) pops from the front (oldest / LRU)
            self.cache.popitem(last=False)

def demonstrate_nested_tree_defaultdict():
    """Approach 3: Infinite auto-vivifying nested tree with defaultdict."""
    print("\n[NESTED TREE] Demonstrating Multi-Level Institutional Directory:")
    
    # Recursive lambda factory: creates a defaultdict of itself
    Tree = lambda: defaultdict(Tree)
    institution = Tree()
    
    # Auto-vivifying multi-level hierarchy without manual dict checks!
    institution["Barrackpore"]["Python"]["BatchA"]["Students"] = ["Mamata", "Debangshu"]
    institution["Kolkata"]["DataScience"]["BatchB"]["Students"] = ["Mahima", "Susmita"]
    institution["Ichapur"]["WebDev"]["BatchC"]["Students"] = ["Abhronila"]
    
    print(f"   * Barrackpore Students : {institution['Barrackpore']['Python']['BatchA']['Students']}")
    print(f"   * Kolkata Students     : {institution['Kolkata']['DataScience']['BatchB']['Students']}")

def demonstrate_lru_cache():
    """Approach 4: OrderedDict LRU cache in action."""
    print("\n[LRU CACHE] Demonstrating OrderedDict Eviction (Capacity = 3):")
    lru = LRUCache(capacity=3)
    
    lru.put("STU_101", "Mamata (Barrackpore)")
    lru.put("STU_102", "Mahima (Kolkata)")
    lru.put("STU_103", "Abhronila (Ichapur)")
    print(f"   * Initial Cache Keys   : {list(lru.cache.keys())}")
    
    # Access STU_101 (making it MRU)
    _ = lru.get("STU_101")
    print(f"   * Accessed STU_101     : {list(lru.cache.keys())} (STU_101 moved to end)")
    
    # Insert new student (triggers eviction of STU_102, which is now LRU)
    lru.put("STU_104", "Susmita (Jadavpur)")
    print(f"   * Added STU_104 (Evict): {list(lru.cache.keys())} (STU_102 evicted!)")

def main():
    print("=" * 75)
    print(f"[BENCHMARK] Grouping Performance: Dict vs defaultdict (N = {len(PAYMENTS):,})")
    print("=" * 75)

    _, t_dict = benchmark_standard_dict_grouping(PAYMENTS)
    print(f"[1] Standard dict with 'if not in': {t_dict:.4f} seconds (1.00x Baseline)")

    _, t_def = benchmark_defaultdict_grouping(PAYMENTS)
    speedup = t_dict / t_def if t_def > 0 else 1.0
    print(f"[2] collections.defaultdict(list) : {t_def:.4f} seconds ({speedup:.2f}x Faster)")

    demonstrate_nested_tree_defaultdict()
    demonstrate_lru_cache()

    print("=" * 75)
    print("[TAKEAWAY] Use defaultdict(list/int/set) to eliminate branching overhead.")
    print("           Use OrderedDict for O(1) LRU/MRU cache eviction via move_to_end().")
    print("=" * 75)

if __name__ == "__main__":
    main()
