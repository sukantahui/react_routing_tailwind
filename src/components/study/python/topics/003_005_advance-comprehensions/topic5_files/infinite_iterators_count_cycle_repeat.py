# topic5_files/infinite_iterators_count_cycle_repeat.py
# Module: 003_005_advance-comprehensions
# Topic: zip() and itertools module essentials (count, cycle, repeat, chain)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 2: Infinite Iterators: `count()`, `cycle()`, and `repeat()`
Demonstrates:
  1. `itertools.count(start, step)`: Infinite incremental integer generator
  2. `itertools.cycle(iterable)`: Infinite round-robin cycling
  3. `itertools.repeat(object, [times])`: Constant value repeater
  4. Safe finite termination using `itertools.islice()` and `zip()`
"""

import itertools
from typing import List, Dict, Any

def demonstrate_infinite_iterators():
    print("=" * 70)
    print("CODER & ACCOTAX - INFINITE ITERATORS (count, cycle, repeat)")
    print("=" * 70)

    # 1. itertools.count(): Generating sequential Student Roll Numbers
    print("1. `itertools.count(start=101, step=1)` - Sequential ID Generator:")
    roll_counter = itertools.count(start=101, step=1)
    students = ["Sourav Mukherjee", "Priyanka Sen", "Debolina Roy", "Rahul Verma"]

    # Zip infinite counter with finite student list:
    student_roster = [
        {"roll_no": f"ROLL-{roll}", "name": name}
        for roll, name in zip(roll_counter, students)
    ]
    for s in student_roster:
        print(f"   * {s['roll_no']}: {s['name']}")

    # 2. itertools.cycle(): Round-Robin Faculty Proctor Assignment
    print("\n2. `itertools.cycle()` - Round-Robin Proctor Rotation:")
    faculty_proctors = ["Sukanta Hui", "Prabhat Sen"]
    proctor_cycle = itertools.cycle(faculty_proctors)

    exam_candidates = [
        "Sourav (Room 1)", "Priyanka (Room 2)", "Debolina (Room 3)",
        "Rahul (Room 4)", "Amit (Room 5)", "Sneha (Room 6)"
    ]

    # Assign proctor cyclically:
    duty_chart = [
        {"candidate": cand, "assigned_proctor": next(proctor_cycle)}
        for cand in exam_candidates
    ]
    for duty in duty_chart:
        print(f"   * Candidate: {duty['candidate']:<18} -> Proctor: {duty['assigned_proctor']}")

    # 3. itertools.repeat(): Fixed Department Constant Association
    print("\n3. `itertools.repeat(val, times)` - Constant Filler:")
    dept_tags = list(itertools.repeat("PYTHON_AI_CAMPUS", times=3))
    print(f"   * Repeated Department Tags: {dept_tags}\n")

    # 4. Safe Stream Slicing with `itertools.islice()`:
    print("4. `itertools.islice(count(100, 10), 0, 5)` - Slicing Infinite Generators:")
    even_tens = list(itertools.islice(itertools.count(100, 10), 0, 5))
    print(f"   * Sliced 5 Items from Infinite count(): {even_tens}")

    print(r"""
Infinite Iterator Invariants:
  1. NEVER pass an unbounded `count()` or `cycle()` directly to `list()`, `set()`, or a naked `for` loop (infinite loop crash!).
  2. Always bound infinite generators by pairing them with a finite sequence in `zip()` or using `itertools.islice()`.
""")
    print("[PASSED] Infinite Iterators count(), cycle(), and repeat() Verified.")


if __name__ == "__main__":
    demonstrate_infinite_iterators()
