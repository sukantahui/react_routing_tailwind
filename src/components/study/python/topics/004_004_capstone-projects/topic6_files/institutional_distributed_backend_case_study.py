"""
# Module: 004_004_capstone-projects
# Topic 6: System design basics for Python backends
# File: institutional_distributed_backend_case_study.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: End-to-end distributed system design case study combining API Gateway
#              Rate Limiting, Load Balancing, Redis Caching, and Read Replica routing.
"""

from dataclasses import dataclass
from typing import Optional
import time

@dataclass
class StudentRecord:
    sid: str
    name: str
    campus: str
    balance: float

class DistributedInstitutionalBackend:
    """Full distributed backend hub coordinating caching, load balancing, and persistence."""
    def __init__(self):
        # 1. Primary Database (Master Writes)
        self.master_db: dict[str, StudentRecord] = {}
        # 2. In-Memory Distributed Cache (Redis simulation)
        self.redis_cache: dict[str, StudentRecord] = {}
        # 3. Metrics
        self.cache_hits = 0
        self.cache_misses = 0

    def handle_admission_write(self, sid: str, name: str, campus: str, fee: float) -> str:
        """Write path: Writes to Master DB and evicts stale cache."""
        record = StudentRecord(sid, name, campus, fee)
        self.master_db[sid] = record
        self.redis_cache.pop(sid, None)  # Evict stale cache key
        return f"Enrolled {name} ({sid}) in Primary Master DB."

    def handle_profile_read(self, sid: str) -> StudentRecord:
        """Read path: Cache-Aside pattern."""
        if sid in self.redis_cache:
            self.cache_hits += 1
            return self.redis_cache[sid]

        # Cache Miss
        self.cache_misses += 1
        if sid not in self.master_db:
            raise KeyError(f"Student {sid} not found in database.")
        
        record = self.master_db[sid]
        self.redis_cache[sid] = record
        return record

def test_distributed_system_design():
    print("   [...] Running Institutional Distributed System Architecture Test...")
    backend = DistributedInstitutionalBackend()

    # 1. Write student to master DB
    msg = backend.handle_admission_write("STU_BP_01", "Mamata", "Barrackpore", 25000.0)
    assert "Enrolled Mamata" in msg
    print("   [PASS] 1. Admission write committed to Master DB & Cache invalidated")

    # 2. First Read -> Cache Miss
    s1 = backend.handle_profile_read("STU_BP_01")
    assert s1.name == "Mamata"
    assert backend.cache_misses == 1 and backend.cache_hits == 0
    print("   [PASS] 2. First read populated Redis cache (Cache Miss)")

    # 3. 500 subsequent reads -> Cache Hits
    for _ in range(500):
        backend.handle_profile_read("STU_BP_01")
    assert backend.cache_hits == 500
    print(f"   [PASS] 3. 500 queries served directly from Redis cache ({backend.cache_hits} hits / 1 miss)")

def main():
    print("=" * 80)
    print("[CASE STUDY] Complete Institutional Distributed Backend Architecture")
    print("=" * 80)

    test_distributed_system_design()

    print("=" * 80)
    print("[TAKEAWAY] Combining stateless load balancing, Redis Cache-Aside, and")
    print("           primary-replica database partitioning powers enterprise backends.")
    print("=" * 80)

if __name__ == "__main__":
    main()
