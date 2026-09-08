"""
==============================================================================
Topic 17: Applying Functions with apply() in Pandas
Script 03: The Golden Rule: Vectorization vs np.where vs apply(axis=1)
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd
import numpy as np
import time

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

# Benchmark synthetic dataset of 200,000 student test scores
N = 200_000
np.random.seed(42)
benchmark_df = pd.DataFrame({
    "Math": np.random.randint(40, 100, size=N),
    "Science": np.random.randint(40, 100, size=N)
})

section(f"1. BENCHMARKING PERFORMANCE ON {N:,} ROWS")

# --------------------------------------------------------------------------
# Approach 1: Slow Python row loop via DataFrame.apply(axis=1)
# --------------------------------------------------------------------------
t0 = time.time()
res_apply = benchmark_df.apply(lambda r: "Pass" if (r["Math"] >= 75 and r["Science"] >= 75) else "Fail", axis=1)
t_apply = time.time() - t0
print(f"[Approach 1] df.apply(axis=1)          : {t_apply:.4f} seconds (SLOW - Python Row Loop)")

# --------------------------------------------------------------------------
# Approach 2: np.vectorize() (Slightly faster, but still Python level)
# --------------------------------------------------------------------------
def pass_fail(m, s):
    return "Pass" if (m >= 75 and s >= 75) else "Fail"

vec_func = np.vectorize(pass_fail)
t0 = time.time()
res_vec = vec_func(benchmark_df["Math"], benchmark_df["Science"])
t_vec = time.time() - t0
print(f"[Approach 2] np.vectorize(...)         : {t_vec:.4f} seconds (MODERATE)")

# --------------------------------------------------------------------------
# Approach 3: Pure Vectorized NumPy (np.where) - THE ML GOLD STANDARD
# --------------------------------------------------------------------------
t0 = time.time()
res_pure = np.where((benchmark_df["Math"] >= 75) & (benchmark_df["Science"] >= 75), "Pass", "Fail")
t_pure = time.time() - t0
print(f"[Approach 3] Pure Vectorized np.where  : {t_pure:.4f} seconds (LIGHTNING FAST - C Level)")

speedup = t_apply / max(t_pure, 0.0001)
print(f"\n=> Pure vectorization is ~{speedup:.1f}x FASTER than df.apply(axis=1)!")
