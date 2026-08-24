# topic6_files/exhaustion_and_idempotence_of_iterators.py
# Module: 003_003_decorators-generators
# Topic: Iteration protocol: __iter__() and __next__()
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 6 - File 3: Exhaustion & Idempotence Properties of Iterators
Demonstrates:
  1. Why Iterators are Single-Pass (Once consumed, they cannot be rewound)
  2. The Idempotence Property: `iter(iterator) is iterator`
  3. Iterables vs Iterators: Multi-pass reusability vs Single-pass consumption
"""

def demonstrate_exhaustion_and_idempotence():
    print("=" * 70)
    print("CODER & ACCOTAX - EXHAUSTION & IDEMPOTENCE OF ITERATORS")
    print("=" * 70)

    # 1. Iterable is Multi-Pass (Can loop repeatedly):
    print("1. Multi-Pass Behavior of Iterables (Lists, Sets, Tuples):")
    course_list = ["Python Core", "Data Structures", "Generators & Decorators"]

    print("   First Pass :", [c for c in course_list])
    print("   Second Pass:", [c for c in course_list])
    print("   [OK] Iterables produce a fresh iterator on every `iter(course_list)` call!\n")

    # 2. Iterator is Single-Pass (Exhausts immediately):
    print("2. Single-Pass Exhaustion Behavior of Iterators:")
    course_iter = iter(course_list)

    consumed_batch = list(course_iter)
    print(f"   First Consumption via `list(course_iter)`: {consumed_batch}")

    second_attempt = list(course_iter)
    print(f"   Second Consumption Attempt               : {second_attempt} (EMPTY! Exhausted!)\n")

    # 3. Idempotence Property: `iter(iterator) is iterator`:
    print("3. Testing Idempotence of Iterators:")
    new_iter = iter(course_list)
    re_iter = iter(new_iter)

    print(f"   `new_iter` ID : 0x{id(new_iter):x}")
    print(f"   `re_iter`  ID : 0x{id(re_iter):x}")
    print(f"   `new_iter is re_iter`: {new_iter is re_iter}")
    print("   [OK] An Iterator's `__iter__()` method simply returns `self`!\n")

    print(r"""
Summary Matrix:
  Construct  | Implements              | Multi-Pass? | `iter(x) returns`
  -----------+-------------------------+-------------+-------------------
  Iterable   | `__iter__()`            | Yes         | Fresh new Iterator
  Iterator   | `__iter__()` + `__next__`| No (Exhausts)| `self` (Same object)
""")
    print("[PASSED] Exhaustion & Idempotence Verified.")


if __name__ == "__main__":
    demonstrate_exhaustion_and_idempotence()
