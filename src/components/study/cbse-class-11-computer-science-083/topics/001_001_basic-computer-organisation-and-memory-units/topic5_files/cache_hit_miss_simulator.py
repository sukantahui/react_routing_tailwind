"""
=============================================================================
High-Speed Cache Memory & Locality of Reference Simulator (Python 3)
CBSE Class XI Computer Science (Subject Code: 083)
Unit I: Computer Systems and Organisation (CSO)
Author: Sukanta Hui (Coder & AccoTax, Barrackpore)
=============================================================================
Demonstrates:
1. Principle of Locality of Reference (Temporal vs Spatial Locality)
2. Cache Levels (L1, L2, L3) and Latency Hierarchy
3. Average Memory Access Time (AMAT) = Hit_Time + (Miss_Rate * Miss_Penalty)
"""

class CacheSimulator:
    def __init__(self, l1_size=4, l2_size=8):
        self.L1 = []  # Ultra-fast SRAM (Latency ~1ns)
        self.L2 = []  # Fast SRAM (Latency ~4ns)
        self.l1_size = l1_size
        self.l2_size = l2_size
        
        self.hits_l1 = 0
        self.hits_l2 = 0
        self.misses = 0

    def access_address(self, address: int):
        """Simulates memory lookup through L1 -> L2 -> Main DRAM."""
        # Check Level 1 Cache
        if address in self.L1:
            self.hits_l1 += 1
            # Move to front (LRU: Most Recently Used)
            self.L1.remove(address)
            self.L1.insert(0, address)
            return "L1 HIT (1ns latency)"

        # Check Level 2 Cache
        if address in self.L2:
            self.hits_l2 += 1
            self.L2.remove(address)
            # Promote to L1
            self._insert_l1(address)
            return "L2 HIT (4ns latency)"

        # Cache MISS: Must fetch from slow DRAM (50ns latency)
        self.misses += 1
        self._insert_l2(address)
        self._insert_l1(address)
        return "CACHE MISS -> DRAM Access (50ns latency)"

    def _insert_l1(self, address):
        if len(self.L1) >= self.l1_size:
            evicted = self.L1.pop()  # Evict least recently used
            self._insert_l2(evicted)
        self.L1.insert(0, address)

    def _insert_l2(self, address):
        if len(self.L2) >= self.l2_size:
            self.L2.pop()
        if address not in self.L2:
            self.L2.insert(0, address)

    def print_metrics(self):
        total = self.hits_l1 + self.hits_l2 + self.misses
        hit_ratio = ((self.hits_l1 + self.hits_l2) / total) * 100 if total > 0 else 0
        print("\n--- CACHE PERFORMANCE REPORT ---")
        print(f"Total Access Requests : {total}")
        print(f"L1 Cache Hits         : {self.hits_l1}")
        print(f"L2 Cache Hits         : {self.hits_l2}")
        print(f"DRAM Cache Misses     : {self.misses}")
        print(f"Overall Hit Ratio     : {hit_ratio:.2f}%")


def calculate_amat(hit_time_ns: float, miss_rate: float, miss_penalty_ns: float):
    """Calculates Average Memory Access Time (AMAT)."""
    amat = hit_time_ns + (miss_rate * miss_penalty_ns)
    print(f"\n[AMAT Calculation]")
    print(f"Hit Time: {hit_time_ns} ns | Miss Rate: {miss_rate * 100:.1f}% | Miss Penalty: {miss_penalty_ns} ns")
    print(f"Average Memory Access Time (AMAT) = {amat:.2f} nanoseconds")


if __name__ == "__main__":
    print("=================================================================")
    print("SIMULATING LOCALITY OF REFERENCE (ARRAY LOOP ACCESS)")
    print("=================================================================")
    cache = CacheSimulator(l1_size=4, l2_size=8)

    # Spatial & Temporal Locality: Iterating over an array multiple times
    # Array indices 10, 11, 12, 13 accessed in a loop 3 times
    for loop in range(3):
        print(f"\n--- Loop Iteration #{loop + 1} ---")
        for addr in [10, 11, 12, 13]:
            status = cache.access_address(addr)
            print(f"Accessing Address {addr}: {status}")

    cache.print_metrics()

    # AMAT with 95% Hit Rate (5% Miss Rate), 1ns Cache Hit Time, 50ns DRAM Miss Penalty
    calculate_amat(hit_time_ns=1.0, miss_rate=0.05, miss_penalty_ns=50.0)
