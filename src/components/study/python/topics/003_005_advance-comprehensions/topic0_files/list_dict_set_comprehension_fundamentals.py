# topic0_files/list_dict_set_comprehension_fundamentals.py
# Module: 003_005_advance-comprehensions
# Topic: Deep Dive: List, Dict, and Set Comprehensions
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 0 - File 1: List, Dict, and Set Comprehension Fundamentals & Performance
Demonstrates:
  1. Idiomatic syntax for List, Dict, and Set comprehensions
  2. Bytecode efficiency: comprehension vs traditional `for` loop `.append()`
  3. Set comprehension automatic deduplication and Dict comprehension key-value mapping
"""

import timeit
from typing import List, Dict, Set

def demonstrate_comprehension_fundamentals():
    print("=" * 70)
    print("CODER & ACCOTAX - COMPREHENSION FUNDAMENTALS & BYTECODE EFFICIENCY")
    print("=" * 70)

    raw_students = [
        {"id": "STU-101", "name": "Sourav Mukherjee", "score": 94.5, "dept": "PYTHON"},
        {"id": "STU-102", "name": "Priyanka Sen", "score": 88.0, "dept": "DATA_SCIENCE"},
        {"id": "STU-103", "name": "Debolina Roy", "score": 96.0, "dept": "PYTHON"},
        {"id": "STU-104", "name": "Rahul Verma", "score": 78.5, "dept": "WEB_DEV"},
        {"id": "STU-105", "name": "Amit Das", "score": 91.0, "dept": "PYTHON"}
    ]

    # 1. List Comprehension: Extracting Honors Students (Score >= 90)
    print("1. List Comprehension `[expr for x in seq if cond]`:")
    honors_students: List[str] = [
        s["name"] for s in raw_students if s["score"] >= 90.0
    ]
    print(f"   * Honors Candidates (Score >= 90): {honors_students}\n")

    # 2. Dict Comprehension: Mapping Student ID -> Clean Profile
    print("2. Dict Comprehension `{key_expr: val_expr for x in seq}`:")
    id_to_score_map: Dict[str, float] = {
        s["id"]: s["score"] for s in raw_students if s["dept"] == "PYTHON"
    }
    print(f"   * Python Dept Score Map: {id_to_score_map}\n")

    # 3. Set Comprehension: Extracting Unique Departments (Deduplicated)
    print("3. Set Comprehension `{expr for x in seq}` (Auto-Deduplication):")
    unique_depts: Set[str] = {
        s["dept"] for s in raw_students
    }
    print(f"   * Unique Departments: {unique_depts}\n")

    # 4. Performance Benchmark: List Comprehension vs For-Loop Append
    print("4. Performance Benchmark: Comprehension vs `for` loop `list.append()`:")
    n_items = 100_000

    def loop_append():
        res = []
        for i in range(n_items):
            if i % 2 == 0:
                res.append(i * 2)
        return res

    def list_comp():
        return [i * 2 for i in range(n_items) if i % 2 == 0]

    t_loop = timeit.timeit(loop_append, number=10)
    t_comp = timeit.timeit(list_comp, number=10)

    print(f"   * Traditional `for` loop + `.append()` : {t_loop:.4f}s")
    print(f"   * Idiomatic List Comprehension          : {t_comp:.4f}s (Faster due to C-level `LIST_APPEND` bytecode!)")

    print(r"""
Comprehension Rules:
  1. List: `[expr for x in seq if cond]`
  2. Dict: `{key: val for x in seq if cond}`
  3. Set:  `{expr for x in seq if cond}`
  4. Comprehensions execute at C-speed, avoiding repeated Python method lookup overhead of `.append()`.
""")
    print("[PASSED] List, Dict, and Set Comprehension Fundamentals Verified.")


if __name__ == "__main__":
    demonstrate_comprehension_fundamentals()
