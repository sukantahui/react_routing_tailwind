# topic3_files/map_filter_reduce_fundamentals.py
# Module: 003_005_advance-comprehensions
# Topic: Functional tools: map(), filter(), and functools.reduce()
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 3 - File 1: Functional Trinity: `map()`, `filter()`, and `functools.reduce()`
Demonstrates:
  1. `map(func, iterable)`: Lazy transformation of elements
  2. `filter(predicate, iterable)`: Lazy selection of matching items
  3. `functools.reduce(func, iterable, [initializer])`: Sequential pairwise folding / accumulation
"""

import functools
from typing import List, Dict, Any

def demonstrate_functional_fundamentals():
    print("=" * 70)
    print("CODER & ACCOTAX - FUNCTIONAL TRINITY (map, filter, reduce)")
    print("=" * 70)

    raw_fees = [25000, 32000, 18000, 45000, 12000, 38000]

    # 1. map(): Apply 18% GST Tax to all tuition fees
    print("1. `map(func, seq)` - Transforming Items Lazily:")
    def apply_gst(fee: float) -> float:
        return round(fee * 1.18, 2)

    gst_mapped_iterator = map(apply_gst, raw_fees)
    print(f"   * Lazy Map Iterator Object : {gst_mapped_iterator}")
    # Materialize to list:
    fees_with_gst = list(gst_mapped_iterator)
    print(f"   * Materialized Fees (+18% GST): {fees_with_gst}\n")

    # 2. filter(): Retain only fees >= 30,000 INR
    print("2. `filter(predicate, seq)` - Selecting Matching Elements:")
    def is_premium_tier(fee: float) -> bool:
        return fee >= 30000.0

    filtered_iterator = filter(is_premium_tier, raw_fees)
    premium_fees = list(filtered_iterator)
    print(f"   * Premium Fees (>= INR 30,000): {premium_fees}\n")

    # 3. functools.reduce(): Fold / Accumulate collection into single value
    print("3. `functools.reduce(func, seq, initializer)` - Pairwise Accumulation:")
    # Accumulate total revenue:
    def sum_accumulator(running_total: float, current_fee: float) -> float:
        return running_total + current_fee

    total_revenue = functools.reduce(sum_accumulator, raw_fees, 0.0)
    print(f"   * Total Calculated Revenue : INR {total_revenue:,.2f}")

    # Finding maximum fee using reduce:
    max_fee = functools.reduce(lambda acc, x: x if x > acc else acc, raw_fees)
    print(f"   * Maximum Fee in Ledger   : INR {max_fee:,.2f}")

    print(r"""
Functional Invariants:
  1. `map()` and `filter()` in Python 3 return lazy, single-pass iterators.
  2. `functools.reduce()` requires an explicit import and sequentially applies `f(acc, item)`.
  3. Always provide an `initializer` to `reduce()` to handle empty iterables safely without TypeError.
""")
    print("[PASSED] Functional Tools map(), filter(), and reduce() Verified.")


if __name__ == "__main__":
    demonstrate_functional_fundamentals()
