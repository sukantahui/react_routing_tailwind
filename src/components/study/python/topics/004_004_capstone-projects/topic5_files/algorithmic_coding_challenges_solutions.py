"""
# Module: 004_004_capstone-projects
# Topic 5: Top Python Technical Interview Questions & Coding Challenges
# File: algorithmic_coding_challenges_solutions.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: High-frequency Python interview coding challenges: LRU Cache in O(1),
#              Two Sum HashMap, and Sliding Window.
"""

from collections import OrderedDict
from typing import Any

# ------------------------------------------------------------------------------
# 1. LRU CACHE (LEAST RECENTLY USED) IN O(1) TIME
# ------------------------------------------------------------------------------
class LRUCache:
    """Least Recently Used (LRU) Cache operating in O(1) get and put time."""
    def __init__(self, capacity: int):
        if capacity <= 0:
            raise ValueError("Capacity must be positive.")
        self.capacity = capacity
        self.cache: OrderedDict[str, Any] = OrderedDict()

    def get(self, key: str) -> Any:
        if key not in self.cache:
            return -1
        # Move accessed key to the right (most recently used)
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: str, value: Any) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value

        # Evict oldest from the left if capacity exceeded
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)

# ------------------------------------------------------------------------------
# 2. TWO SUM IN O(N) TIME & O(N) SPACE
# ------------------------------------------------------------------------------
def two_sum(nums: list[int], target: int) -> list[int]:
    """Finds indices of two numbers that add up to target in O(n) time."""
    seen: dict[int, int] = {}
    for idx, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], idx]
        seen[num] = idx
    return []

# ------------------------------------------------------------------------------
# 3. SLIDING WINDOW MAXIMUM / SUBARRAY SUM IN O(N) TIME
# ------------------------------------------------------------------------------
def max_consecutive_sum(nums: list[int], k: int) -> int:
    """Finds maximum sum of any contiguous subarray of size k in O(n) time."""
    if len(nums) < k or k <= 0:
        return 0
    
    current_sum = sum(nums[:k])
    max_sum = current_sum

    for i in range(k, len(nums)):
        current_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, current_sum)

    return max_sum

def test_algorithms():
    print("   [...] Testing Classic Interview Algorithms & Data Structures...")

    # 1. LRU Cache Verification
    lru = LRUCache(2)
    lru.put("STU_BP_01", "Mamata")
    lru.put("STU_CC_01", "Mahima")
    assert lru.get("STU_BP_01") == "Mamata" # Marks Mamata as MRU

    lru.put("STU_IC_01", "Abhronila")      # Evicts Mahima (LRU)
    assert lru.get("STU_CC_01") == -1       # Mahima evicted
    assert lru.get("STU_BP_01") == "Mamata" # Mamata retained
    print("   [PASS] 1. O(1) LRU Cache operations and eviction verified")

    # 2. Two Sum Verification
    indices = two_sum([2, 7, 11, 15], 9)
    assert indices == [0, 1]
    print(f"   [PASS] 2. Two Sum O(n) Hash Map found indices: {indices}")

    # 3. Sliding Window Verification
    max_fee = max_consecutive_sum([1000, 2500, 3000, 1500, 5000], 3)
    assert max_fee == 9500 # [3000, 1500, 5000]
    print(f"   [PASS] 3. Sliding Window Max Sum (k=3): Rs. {max_fee:,}")

def main():
    print("=" * 75)
    print("[ALGORITHMIC CHALLENGES] High-Frequency Technical Interview Solutions")
    print("=" * 75)

    test_algorithms()

    print("=" * 75)
    print("[TAKEAWAY] Using optimal data structures (HashMaps, OrderedDict, Two Pointers)")
    print("           achieves linear O(n) and constant O(1) interview solutions.")
    print("=" * 75)

if __name__ == "__main__":
    main()
