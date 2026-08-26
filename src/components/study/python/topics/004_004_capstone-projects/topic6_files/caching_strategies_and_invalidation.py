"""
# Module: 004_004_capstone-projects
# Topic 6: System design basics for Python backends
# File: caching_strategies_and_invalidation.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Demonstrating Cache-Aside (Lazy Loading), TTL Invalidation,
#              and Mutex Locking to prevent Cache Stampede (Thundering Herd).
"""

import time
import threading
from typing import Any, Optional

class CacheEntry:
    def __init__(self, value: Any, expires_at: float):
        self.value = value
        self.expires_at = expires_at

    @property
    def is_expired(self) -> bool:
        return time.time() > self.expires_at

class CacheAsideService:
    """Thread-safe Cache-Aside implementation with TTL and Mutex locking against Stampedes."""
    def __init__(self, ttl_seconds: float = 60.0):
        self.ttl = ttl_seconds
        self._cache: dict[str, CacheEntry] = {}
        self._lock = threading.Lock()
        self.db_queries_count = 0

    def _simulate_slow_database_fetch(self, student_id: str) -> dict[str, Any]:
        """Simulates an expensive 10ms disk database query."""
        self.db_queries_count += 1
        time.sleep(0.01)
        return {"sid": student_id, "name": "Mamata", "campus": "Barrackpore", "balance": 10000.0}

    def get_student_profile(self, student_id: str) -> dict[str, Any]:
        now = time.time()
        # 1. Fast Cache Read
        entry = self._cache.get(student_id)
        if entry and not entry.is_expired:
            return entry.value

        # 2. Cache Miss / Expired -> Acquire Lock to prevent Cache Stampede (Thundering Herd)
        with self._lock:
            # Double-check inside lock
            entry = self._cache.get(student_id)
            if entry and not entry.is_expired:
                return entry.value

            # Query primary database
            db_data = self._simulate_slow_database_fetch(student_id)
            self._cache[student_id] = CacheEntry(db_data, expires_at=now + self.ttl)
            return db_data

    def invalidate(self, student_id: str) -> None:
        """Evicts key on write mutations."""
        with self._lock:
            self._cache.pop(student_id, None)

def test_caching():
    print("   [...] Testing Cache-Aside & Stampede Prevention...")
    cache_svc = CacheAsideService(ttl_seconds=2.0)

    # 1. Initial Fetch -> Cache Miss (DB query triggered)
    res1 = cache_svc.get_student_profile("STU_BP_01")
    assert cache_svc.db_queries_count == 1
    assert res1["name"] == "Mamata"
    print("   [PASS] 1. Initial Cache Miss populated cache from simulated database")

    # 2. Subsequent 100 requests -> Cache Hits (0 additional DB queries)
    for _ in range(100):
        cache_svc.get_student_profile("STU_BP_01")
    assert cache_svc.db_queries_count == 1
    print("   [PASS] 2. 100 consecutive requests served from Cache (0 DB queries)")

    # 3. Explicit Invalidation
    cache_svc.invalidate("STU_BP_01")
    cache_svc.get_student_profile("STU_BP_01")
    assert cache_svc.db_queries_count == 2
    print("   [PASS] 3. Explicit cache invalidation forced fresh DB reload")

def main():
    print("=" * 75)
    print("[CACHING TOPOLOGY] Cache-Aside, Invalidation & Stampede Defense")
    print("=" * 75)

    test_caching()

    print("=" * 75)
    print("[TAKEAWAY] The Cache-Aside pattern paired with Mutex locking slashes database")
    print("           load by >95% while preventing destructive Thundering Herd outages.")
    print("=" * 75)

if __name__ == "__main__":
    main()
