# ====================================================================
# Topic 17: Performance Benefits of Sets
# File: algebra_vs_loop_performance.py
# Description: Comparing Set Intersection (A & B) vs Nested Loop Intersection
# ====================================================================

import time

# Two large batches of student IDs (50,000 each) in Kolkata
batch_a_list = list(range(0, 100000, 2))  # Even numbers
batch_b_list = list(range(50000, 150000, 2))

batch_a_set = set(batch_a_list)
batch_b_set = set(batch_b_list)

# 1. SET ALGEBRA: A & B
start = time.perf_counter()
set_common = batch_a_set & batch_b_set
set_algebra_time = time.perf_counter() - start

print(f"Set Intersection (A & B) Found: {len(set_common):,} items")
print(f"Set Algebra Time: {set_algebra_time:.6f} seconds")

# 2. NESTED LIST SCAN: [x for x in batch_a if x in batch_b] (on small 2,000 subset to prevent 2-min freeze)
subset_a = batch_a_list[:2000]
start = time.perf_counter()
list_common = [x for x in subset_a if x in batch_b_list]
nested_loop_time = time.perf_counter() - start

print(f"\nNested Loop on ONLY 2,000 items: {nested_loop_time:.6f} seconds")
print(f"Full 50,000 items in nested list would take ~{(nested_loop_time * 25):.2f} seconds!")
print(f"Set Algebra is ~{(nested_loop_time * 25) / set_algebra_time:,.0f}x faster than nested loops!")
