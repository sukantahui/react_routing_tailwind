# topic5_files/chain_compress_and_islice_iterators.py
# Module: 003_005_advance-comprehensions
# Topic: zip() and itertools module essentials (count, cycle, repeat, chain)
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 5 - File 3: Sequence Chaining, Boolean Masking & Slicing (`chain`, `compress`, `islice`)
Demonstrates:
  1. `itertools.chain(*iterables)` & `itertools.chain.from_iterable(nested)` for zero-copy concatenation
  2. `itertools.compress(data, selectors)`: High-speed boolean masking
  3. `itertools.islice(iterable, start, stop, step)`: Streaming pagination without creating slice copies
"""

import itertools
import timeit
from typing import List

def demonstrate_chain_compress_islice():
    print("=" * 70)
    print("CODER & ACCOTAX - CHAIN, COMPRESS & ISLICE ITERATORS")
    print("=" * 70)

    # 1. itertools.chain & chain.from_iterable():
    print("1. Sequence Chaining (`chain.from_iterable` vs `+` list concatenation):")
    batch_bp = ["Sourav (BP)", "Debolina (BP)"]
    batch_kl = ["Priyanka (KL)", "Sneha (KL)"]
    batch_wb = ["Rahul (WB)", "Amit (WB)"]

    # Zero-copy streaming concatenation:
    all_batches_nested = [batch_bp, batch_kl, batch_wb]
    flat_chained_stream = itertools.chain.from_iterable(all_batches_nested)
    print(f"   * Chained Combined Stream: {list(flat_chained_stream)}")

    # Performance Benchmark on 10,000 lists:
    sample_sublists = [[i, i+1] for i in range(5000)]
    t_plus = timeit.timeit(lambda: [x for sub in sample_sublists for x in sub], number=20)
    t_chain = timeit.timeit(lambda: list(itertools.chain.from_iterable(sample_sublists)), number=20)

    print(f"   * Nested list comprehension : {t_plus:.4f}s")
    print(f"   * `chain.from_iterable()`   : {t_chain:.4f}s (Optimized C-iterator!)\n")

    # 2. itertools.compress(): Fast Boolean Masking:
    print("2. `itertools.compress(data, boolean_selectors)` - High-Speed Masking:")
    students = ["Sourav", "Priyanka", "Debolina", "Rahul", "Amit"]
    # Boolean mask: True = Cleared KYC, False = Pending
    kyc_cleared_mask = [True, True, True, False, True]

    approved_candidates = list(itertools.compress(students, kyc_cleared_mask))
    print(f"   * All Candidates   : {students}")
    print(f"   * KYC Mask         : {kyc_cleared_mask}")
    print(f"   * Approved (Masked): {approved_candidates}\n")

    # 3. itertools.islice(): Streaming Pagination
    print("3. `itertools.islice(stream, start, stop, step)` - Zero-Copy Pagination:")
    # Stream page 2 (items 3 to 6):
    dataset_stream = (f"RECORD-{i}" for i in range(100))
    page_2_items = list(itertools.islice(dataset_stream, 3, 7))
    print(f"   * Page 2 (Offset 3, Limit 4): {page_2_items}")

    print(r"""
itertools Invariants:
  1. `chain.from_iterable()` provides linear O(N) zero-copy sequence flattening.
  2. `compress(data, mask)` extracts matching elements without lambda conditions.
  3. `islice()` slices non-indexable generator streams without loading entire dataset in memory.
""")
    print("[PASSED] chain, compress, and islice Iterators Verified.")


if __name__ == "__main__":
    demonstrate_chain_compress_islice()
