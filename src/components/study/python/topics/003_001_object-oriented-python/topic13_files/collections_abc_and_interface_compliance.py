# topic13_files/collections_abc_and_interface_compliance.py
# Module: 003_001_object-oriented-python
# Topic: Abstract Base Classes (abc module)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 13 - File 3: Python Standard Library `collections.abc` Interfaces
Demonstrates:
  1. Inheriting from `collections.abc.Sequence` to build custom data collections
  2. Free "batteries included" mixin methods provided by standard ABCs (e.g. `count()`, `index()`, `__contains__`)
  3. Complying with standard Python container protocols
"""

from collections.abc import Sequence, Mapping
from typing import List, Any

class ImmutableStudentRecord(Sequence):
    """Custom Sequence implementing only __len__ and __getitem__.
    collections.abc.Sequence automatically provides:
      - __iter__
      - __contains__ ('in')
      - __reversed__
      - index()
      - count()
    """

    def __init__(self, student_name: str, scores: List[float]):
        self.student_name = student_name
        self._scores = tuple(scores)  # Immutable tuple

    # =================================================================
    # MANDATORY ABSTRACT METHODS FOR `collections.abc.Sequence`
    # =================================================================
    def __len__(self) -> int:
        return len(self._scores)

    def __getitem__(self, index: int) -> float:
        return self._scores[index]


def demonstrate_collections_abc():
    print("=" * 70)
    print("CODER & ACCOTAX - collections.abc STANDARD INTERFACES")
    print("=" * 70)

    record = ImmutableStudentRecord("Ananya Ghosh", [85.0, 92.5, 88.0, 92.5, 96.0])

    # 1. Base Implemented Methods
    print(f"1. len(record)  : {len(record)} exam marks")
    print(f"   record[0]    : {record[0]}")
    print(f"   record[-1]   : {record[-1]}\n")

    # 2. FREE METHODS INHERITED FROM collections.abc.Sequence!
    print("2. Free Mixin Methods provided by `collections.abc.Sequence`:")
    print(f"   * Iteration  : {[x for x in record]}")
    print(f"   * Membership : 96.0 in record -> {96.0 in record}")
    print(f"   * count(92.5): {record.count(92.5)} times")
    print(f"   * index(88.0): Found at index {record.index(88.0)}")

    # 3. isinstance validation
    print(f"\n3. isinstance(record, collections.abc.Sequence): {isinstance(record, Sequence)}")

    print("\n[PASSED] collections.abc Compliance Verified.")


if __name__ == "__main__":
    demonstrate_collections_abc()
