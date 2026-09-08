# 02_numpy_dtypes_and_memory.py
# NumPy Essentials — Topic 0: Introduction to NumPy (Part 2)
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
DESCRIPTION:
Explores NumPy data types (dtypes), bit precision, and memory efficiency:
  - Integer types (int8, int16, int32, int64)
  - Floating point types (float16, float32, float64)
  - Boolean and string types
  - Inspecting itemsize and memory byte allocations
"""

import numpy as np

print("=" * 68)
print("  PART 2: NumPy Data Types (dtypes) & Memory Footprint")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 68)

# Common ML data types
dtypes_catalog = [
    ("np.int8",    np.int8,    "8-bit signed int   (-128 to 127)"),
    ("np.int32",   np.int32,   "32-bit signed int  (-2.1B to +2.1B)"),
    ("np.int64",   np.int64,   "64-bit signed int  (Large counts/IDs)"),
    ("np.float32", np.float32, "32-bit float       (Deep learning standard)"),
    ("np.float64", np.float64, "64-bit float       (Scientific default)"),
    ("np.bool_",   np.bool_,   "Boolean            (True / False)"),
]

print("\n[1] Data Types Catalog & Byte Sizes:")
for name, dt, desc in dtypes_catalog:
    sample_arr = np.array([1, 2, 3], dtype=dt)
    print(f"    {name:<12} | itemsize: {sample_arr.itemsize} byte(s) | {desc}")

# Memory comparison: float64 vs float32 for 1,000,000 floats
N = 1_000_000
arr_f64 = np.ones(N, dtype=np.float64)
arr_f32 = np.ones(N, dtype=np.float32)

print(f"\n[2] Memory comparison for {N:,} neural network weights:")
print(f"    float64 array size : {arr_f64.nbytes / (1024 * 1024):.2f} MB")
print(f"    float32 array size : {arr_f32.nbytes / (1024 * 1024):.2f} MB (50% RAM savings!)")
