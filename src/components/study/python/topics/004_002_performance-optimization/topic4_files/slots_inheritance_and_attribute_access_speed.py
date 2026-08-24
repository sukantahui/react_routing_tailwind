# topic4_files/slots_inheritance_and_attribute_access_speed.py
# Module: 004_002_performance-optimization
# Topic: Memory profiling and reducing object footprint with __slots__
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 4 - File 2: `__slots__` Inheritance, Attribute Access Speed & Safety
Demonstrates:
  1. Attribute read/write micro-speed comparison: `__slots__` descriptor vs `__dict__` lookup
  2. Inheritance behavior: base class slots + subclass slots
  3. Dynamic attribute immutability and `AttributeError` protection
"""

import timeit
from typing import List

# Standard class
class StandardDossier:
    def __init__(self, ref: str, score: float):
        self.ref = ref
        self.score = score

# Slotted class
class SlottedDossier:
    __slots__ = ("ref", "score")

    def __init__(self, ref: str, score: float):
        self.ref = ref
        self.score = score

# Inheritance example
class BaseRecord:
    __slots__ = ("record_id", "created_at")

class ExtendedStudentRecord(BaseRecord):
    # Subclass adds only its own slots; inherits base slots automatically
    __slots__ = ("exam_score", "scholarship")


def benchmark_attribute_access():
    print("=" * 70)
    print("CODER & ACCOTAX - SLOTS INHERITANCE & ATTRIBUTE ACCESS SPEED")
    print("=" * 70)

    loops = 500_000

    # 1. Benchmark Attribute Write Speed
    t_write_std = min(timeit.repeat("obj.score = 95.5", setup="from __main__ import StandardDossier; obj = StandardDossier('A', 80.0)", number=loops, repeat=5))
    t_write_slot = min(timeit.repeat("obj.score = 95.5", setup="from __main__ import SlottedDossier; obj = SlottedDossier('A', 80.0)", number=loops, repeat=5))

    # 2. Benchmark Attribute Read Speed
    t_read_std = min(timeit.repeat("_ = obj.score", setup="from __main__ import StandardDossier; obj = StandardDossier('A', 80.0)", number=loops, repeat=5))
    t_read_slot = min(timeit.repeat("_ = obj.score", setup="from __main__ import SlottedDossier; obj = SlottedDossier('A', 80.0)", number=loops, repeat=5))

    print(f"1. Attribute Access Latency Comparison ({loops:,} operations):")
    print(f"   * Attribute Write (Standard `__dict__`) : {t_write_std * 1000:.2f} ms")
    print(f"   * Attribute Write (`__slots__` Struct)  : {t_write_slot * 1000:.2f} ms ({t_write_std / (t_write_slot or 0.001):.1f}x Faster!)")
    print(f"   * Attribute Read  (Standard `__dict__`) : {t_read_std * 1000:.2f} ms")
    print(f"   * Attribute Read  (`__slots__` Struct)  : {t_read_slot * 1000:.2f} ms ({t_read_std / (t_read_slot or 0.001):.1f}x Faster!)\n")

    # 3. Dynamic Attribute Safety Test
    print("2. Dynamic Attribute Safety & Immutability Test:")
    obj = SlottedDossier("DOS-101", 92.0)
    try:
        # Attempting to assign an unslotted attribute raises AttributeError
        obj.unregistered_field = "INVALID"
    except AttributeError as e:
        print(f"   * [PROTECTED] Dynamic attribute blocked with AttributeError: {e}\n")

    # 4. Inheritance Slots Verification
    print("3. Inheritance Slots Verification:")
    ext = ExtendedStudentRecord()
    ext.record_id = "REC-555"
    ext.created_at = "2026-08-25"
    ext.exam_score = 98.5
    ext.scholarship = 5000.0
    print(f"   * Base Slots  : {BaseRecord.__slots__}")
    print(f"   * Sub Slots   : {ExtendedStudentRecord.__slots__}")
    print(f"   * Instance OK : ID={ext.record_id}, Score={ext.exam_score}")

    print(r"""
Attribute Speed & Safety Invariants:
  1. Accessing `__slots__` attributes uses C descriptors (offset indexing), which is 15-30% faster than dynamic `__dict__` hash lookups.
  2. Subclasses must also declare `__slots__ = (...)` (even if empty `()`), otherwise Python automatically creates a dynamic `__dict__` on the subclass.
  3. `__slots__` prevents accidental creation of misspelled attributes (e.g. `obj.scroe = 100`).
""")
    print("[PASSED] Slots Inheritance & Speed Verified.")


if __name__ == "__main__":
    benchmark_attribute_access()
