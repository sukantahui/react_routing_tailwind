# topic5_files/zip_and_zip_longest_mechanics.py
# Module: 003_005_advance-comprehensions
# Topic: zip() and itertools module essentials (count, cycle, repeat, chain)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 1: `zip()`, `zip(strict=True)` & `itertools.zip_longest()`
Demonstrates:
  1. Parallel iteration with `zip(*iterables)` (silent truncation on shortest sequence)
  2. Python 3.10+ `zip(strict=True)` defensive length validation
  3. `itertools.zip_longest(*iterables, fillvalue=None)` for padded aggregation
  4. Matrix transposition & sequence unzipping using `zip(*pairs)`
"""

import itertools
from typing import List, Tuple

def demonstrate_zip_mechanics():
    print("=" * 70)
    print("CODER & ACCOTAX - ZIP, ZIP_STRICT & ZIP_LONGEST MECHANICS")
    print("=" * 70)

    student_ids = ["STU-101", "STU-102", "STU-103", "STU-104"]
    names = ["Sourav Mukherjee", "Priyanka Sen", "Debolina Roy"]  # Length 3 (1 shorter!)
    scores = [95.5, 88.0, 96.0, 78.0]

    # 1. Standard zip(): Silently truncates to shortest iterable (names = 3)
    print("1. Standard `zip()` - Truncation to Shortest Sequence (Length 3):")
    paired_standard = list(zip(student_ids, names))
    print(f"   * Standard zip output: {paired_standard}")
    print(f"   * Notice: 'STU-104' was SILENTLY DROPPED because `names` only has 3 items!\n")

    # 2. Defensive zip(strict=True) in Python 3.10+:
    print("2. Defensive `zip(strict=True)` - Prevents Accidental Data Truncation:")
    try:
        strict_pairs = list(zip(student_ids, names, strict=True))
    except ValueError as exc:
        print(f"   * [DEFENSIVE ERROR CAUGHT] ValueError: {exc}")
        print("   -> `strict=True` guarantees all sequences have identical lengths before pairing.\n")

    # 3. itertools.zip_longest(): Pads shorter iterables with fillvalue
    print("3. `itertools.zip_longest(*iterables, fillvalue=None)` - Padded Pairing:")
    padded_pairs = list(itertools.zip_longest(student_ids, names, scores, fillvalue="NOT_ASSIGNED"))
    for sid, name, score in padded_pairs:
        print(f"   * [{sid}] {name:<18} | Score: {score}")

    # 4. Unzipping / Matrix Inversion using `zip(*pairs)`:
    print("\n4. Unzipping Sequences using `zip(*pairs)`:")
    roster_pairs = [("STU-101", "Sourav"), ("STU-102", "Priyanka"), ("STU-103", "Debolina")]
    unzipped_ids, unzipped_names = zip(*roster_pairs)
    print(f"   * Unzipped IDs   : {unzipped_ids}")
    print(f"   * Unzipped Names : {unzipped_names}")

    print(r"""
Zip Invariants:
  1. Standard `zip()` silently drops excess items; use `zip(strict=True)` to prevent silent bugs.
  2. Use `itertools.zip_longest()` when missing data must be explicitly padded with a placeholder.
  3. `zip(*paired_data)` cleanly reverses pairing / transposes rows into columns.
""")
    print("[PASSED] zip() and itertools.zip_longest() Mechanics Verified.")


if __name__ == "__main__":
    demonstrate_zip_mechanics()
