"""
# Module: 004_004_capstone-projects
# Topic 5: Top Python Technical Interview Questions & Coding Challenges
# File: institutional_interview_technical_assessment.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Live technical interview assessment combining LRU Caching,
#              Big-O query optimization, and thread-safe data pipelines.
"""

from collections import OrderedDict
from dataclasses import dataclass
import threading
from typing import Optional

@dataclass
class StudentDossier:
    sid: str
    name: str
    campus: str
    tuition_balance: float

class ThreadSafeStudentCache:
    """Production thread-safe LRU cache for student profile lookups."""
    def __init__(self, capacity: int = 100):
        self.capacity = capacity
        self._cache: OrderedDict[str, StudentDossier] = OrderedDict()
        self._lock = threading.Lock()

    def get(self, sid: str) -> Optional[StudentDossier]:
        with self._lock:
            if sid not in self._cache:
                return None
            self._cache.move_to_end(sid)
            return self._cache[sid]

    def put(self, student: StudentDossier) -> None:
        with self._lock:
            if student.sid in self._cache:
                self._cache.move_to_end(student.sid)
            self._cache[student.sid] = student
            if len(self._cache) > self.capacity:
                self._cache.popitem(last=False)

def test_interview_assessment():
    print("   [...] Running Institutional Live Technical Interview Assessment...")
    cache = ThreadSafeStudentCache(capacity=2)

    s1 = StudentDossier("STU_BP_01", "Mamata", "Barrackpore", 10000.0)
    s2 = StudentDossier("STU_CC_01", "Mahima", "Kolkata", 12500.0)
    s3 = StudentDossier("STU_IC_01", "Abhronila", "Ichapur", 0.0)

    # 1. Populate cache
    cache.put(s1)
    cache.put(s2)
    assert cache.get("STU_BP_01") is not None # Marks Mamata as MRU

    # 2. Add 3rd student (triggers eviction of Mahima)
    cache.put(s3)
    assert cache.get("STU_CC_01") is None # Mahima evicted
    assert cache.get("STU_BP_01") is not None # Mamata kept
    assert cache.get("STU_IC_01") is not None # Abhronila present
    print("   [PASS] 1. Thread-Safe O(1) LRU eviction policy passed live assessment")

def main():
    print("=" * 80)
    print("[CASE STUDY] Live Python Technical Interview Coding Challenge")
    print("=" * 80)

    test_interview_assessment()

    print("=" * 80)
    print("[TAKEAWAY] Combining synchronization primitives (threading.Lock) with")
    print("           optimal data structures (OrderedDict) proves senior competence.")
    print("=" * 80)

if __name__ == "__main__":
    main()
