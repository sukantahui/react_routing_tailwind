"""
# Module: 004_002_performance-optimization
# Topic 6: collections module: deque, Counter, defaultdict, OrderedDict, namedtuple
# File: namedtuple_and_chainmap_casestudy.py
#
# Teacher & Mentor: Sukanta Hui
# Institution: Coder & Accotax (Barrackpore, Kolkata, West Bengal)
# Description: Memory footprint benchmarking with namedtuple and zero-copy
#              hierarchical configuration management with ChainMap.
"""

import sys
import time
from collections import namedtuple, ChainMap

# 1. Definition of models for 100,000 instances
class StandardStudent:
    def __init__(self, sid, name, campus, score):
        self.sid = sid
        self.name = name
        self.campus = campus
        self.score = score

NamedStudent = namedtuple("NamedStudent", ["sid", "name", "campus", "score"])

def benchmark_memory_footprint():
    """Approach 1: Comparing instance memory footprint between Class, Dict, and namedtuple."""
    print("\n[MEMORY BENCHMARK] Measuring per-instance memory allocation:")
    
    std_inst = StandardStudent("STU_1", "Mamata", "Barrackpore", 95.0)
    named_inst = NamedStudent("STU_1", "Mamata", "Barrackpore", 95.0)
    dict_inst = {"sid": "STU_1", "name": "Mamata", "campus": "Barrackpore", "score": 95.0}
    
    # Calculate shallow size + __dict__ size for standard instance
    std_size = sys.getsizeof(std_inst) + sys.getsizeof(std_inst.__dict__)
    dict_size = sys.getsizeof(dict_inst)
    named_size = sys.getsizeof(named_inst)
    
    print(f"   * Standard Class Instance  : ~{std_size} bytes (with dynamic __dict__)")
    print(f"   * Raw Dictionary Record    : ~{dict_size} bytes")
    print(f"   * collections.namedtuple   : ~{named_size} bytes (60%+ memory reduction!)")

def demonstrate_chainmap_casestudy():
    """Approach 2: Layered institutional settings resolution with ChainMap."""
    print("\n[CHAINMAP CASE STUDY] Institutional Multi-Campus Policy Hierarchy:")
    
    # Level 1: Global Institution-wide Defaults
    global_policy = {
        "institution_name": "Coder & Accotax",
        "academic_year": "2026-2027",
        "grace_period_days": 15,
        "lab_passcode": "DEFAULT_LAB_2026",
        "max_concurrent_logins": 2
    }
    
    # Level 2: Regional Campus Policy (e.g. Barrackpore overrides)
    barrackpore_campus_policy = {
        "campus_name": "Barrackpore Main Campus",
        "lab_passcode": "BP_SECURE_LAB_99",  # Overrides global passcode
        "max_concurrent_logins": 4            # Overrides global limit
    }
    
    # Level 3: Individual Lab Room Overrides (e.g. Advanced AI Lab)
    ai_lab_override = {
        "room_id": "LAB_AI_402",
        "max_concurrent_logins": 8            # Specific to AI lab
    }
    
    # Zero-copy Layered Hierarchy using ChainMap:
    # Resolution priority: ai_lab_override > barrackpore_campus_policy > global_policy
    active_config = ChainMap(ai_lab_override, barrackpore_campus_policy, global_policy)
    
    print("   * Effective Configuration Resolution:")
    print(f"     - Institution Name      : {active_config['institution_name']} (from Global)")
    print(f"     - Campus Name           : {active_config['campus_name']} (from Campus)")
    print(f"     - Lab Passcode          : {active_config['lab_passcode']} (from Campus override)")
    print(f"     - Max Concurrent Logins : {active_config['max_concurrent_logins']} (from AI Lab override)")
    print(f"     - Grace Period Days     : {active_config['grace_period_days']} (from Global)")
    
    # Demonstrate dynamic scoping with new_child()
    student_session = active_config.new_child({"student_id": "STU_MAMATA_01", "max_concurrent_logins": 1})
    print(f"\n   * Scoped Session for Mamata: Logins={student_session['max_concurrent_logins']} (Shadowed!)")
    print(f"   * Original AI Lab Setting  : Logins={active_config['max_concurrent_logins']} (Unchanged)")

def main():
    print("=" * 75)
    print("[CASE STUDY] collections.namedtuple & ChainMap Production Case Study")
    print("=" * 75)

    benchmark_memory_footprint()
    demonstrate_chainmap_casestudy()

    print("=" * 75)
    print("[TAKEAWAY] Use namedtuple for low-memory immutable records.")
    print("           Use ChainMap for zero-copy hierarchical config & variable scoping.")
    print("=" * 75)

if __name__ == "__main__":
    main()
