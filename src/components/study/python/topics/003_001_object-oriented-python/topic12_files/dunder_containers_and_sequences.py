# topic12_files/dunder_containers_and_sequences.py
# Module: 003_001_object-oriented-python
# Topic: Magic / Dunder Methods: __str__, __repr__, __len__, __eq__, __add__
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 12 - File 2: Container, Sequence & Indexing Dunder Protocols
Demonstrates:
  1. `__len__`: Emulating `len(obj)`
  2. `__getitem__`, `__setitem__`, `__delitem__`: Square bracket indexing and slicing `obj[i]`
  3. `__contains__`: Membership testing `item in obj`
  4. `__iter__`: Enabling `for x in obj:` iteration
"""

from typing import List, Any, Union

class CourseModuleRoster:
    """Emulates a custom Python sequence container."""

    def __init__(self, course_name: str, topics: List[str]):
        self.course_name = course_name
        self._topics = list(topics)

    # 1. LENGTH PROTOCOL (__len__)
    def __len__(self) -> int:
        return len(self._topics)

    # 2. GET ITEM & SLICING PROTOCOL (__getitem__)
    def __getitem__(self, index: Union[int, slice]) -> Any:
        # Transparently supports both single integer index and slice objects:
        return self._topics[index]

    # 3. SET ITEM PROTOCOL (__setitem__)
    def __setitem__(self, index: int, new_topic: str):
        self._topics[index] = str(new_topic).strip()

    # 4. DELETE ITEM PROTOCOL (__delitem__)
    def __delitem__(self, index: int):
        del self._topics[index]

    # 5. MEMBERSHIP TESTING (__contains__)
    def __contains__(self, topic_query: str) -> bool:
        # Case-insensitive substring search:
        query_lower = topic_query.lower()
        return any(query_lower in t.lower() for t in self._topics)

    # 6. ITERATION PROTOCOL (__iter__)
    def __iter__(self):
        return iter(self._topics)

    def __repr__(self) -> str:
        return f"CourseModuleRoster({self.course_name!r}, {self._topics!r})"


def demonstrate_container_dunders():
    print("=" * 70)
    print("CODER & ACCOTAX - CONTAINER & SEQUENCE DUNDER PROTOCOLS")
    print("=" * 70)

    roster = CourseModuleRoster(
        course_name="Python Advanced OOP",
        topics=[
            "Constructors & self",
            "Properties & Setters",
            "Inheritance Topologies",
            "Method Resolution Order",
            "Polymorphism & Duck Typing"
        ]
    )

    # 1. len(obj) via __len__
    print(f"1. len(roster): {len(roster)} topics registered")

    # 2. Indexing via __getitem__
    print(f"2. roster[0]   : '{roster[0]}'")
    print(f"   roster[-1]  : '{roster[-1]}'")
    print(f"   roster[1:3] : {roster[1:3]} (Slicing supported automatically!)\n")

    # 3. Mutation via __setitem__
    print("3. Mutating topic at index 0 via `roster[0] = 'OOP Foundations'`:")
    roster[0] = "OOP Foundations"
    print(f"   roster[0] is now: '{roster[0]}'\n")

    # 4. Membership testing via __contains__
    print("4. Membership Checks (`in` operator via __contains__):")
    print(f"   'MRO' in roster         : {'MRO' in roster}")
    print(f"   'Rust Lang' in roster   : {'Rust Lang' in roster}\n")

    # 5. Iteration via __iter__
    print("5. Iterating through roster (`for topic in roster`):")
    for idx, topic in enumerate(roster, 1):
        print(f"   [{idx}] {topic}")

    print("\n[PASSED] Container & Sequence Protocols Verified.")


if __name__ == "__main__":
    demonstrate_container_dunders()
