# ====================================================================
# Module: 002_007_string-processing
# Topic 1: String immutability & memory representation
# File: concatenation_vs_join_benchmark.py
# Description: Benchmarking O(N^2) loop += concatenation vs O(N) ''.join()
# ====================================================================

import time

# List of 50,000 student fee transaction tokens in Barrackpore center
records_count = 50000
tokens = [f"TXN_{i:06d}_FEE_₹4500\n" for i in range(records_count)]

# Method 1: Naive Inefficient Concatenation using += in loop (O(N^2))
start_time_naive = time.perf_counter()
naive_buffer = ""
for token in tokens[:15000]: # Capped to 15,000 to prevent severe slowdown
    naive_buffer += token
end_time_naive = time.perf_counter()
duration_naive = end_time_naive - start_time_naive

# Method 2: High-Speed Industry Standard ''.join() (O(N))
start_time_join = time.perf_counter()
join_buffer = "".join(tokens[:15000])
end_time_join = time.perf_counter()
duration_join = end_time_join - start_time_join

print("--- Performance Comparison (15,000 String Concatenations) ---")
print(f"1. Naive '+=' Loop: {duration_naive * 1000:.2f} ms")
print(f"2. Fast ''.join():  {duration_join * 1000:.2f} ms")
if duration_join > 0:
    speedup = duration_naive / duration_join
    print(f"\n=> ''.join() is ~{speedup:.1f}x faster due to single-pass memory allocation!")
