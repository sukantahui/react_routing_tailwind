# numpy_intro_demo.py
# NumPy Essentials — Topic 0: Introduction to NumPy
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal
# Subject: Machine Learning (BCAC701B) | Segment 9

"""
Demonstrates the core motivation for NumPy:
  - Python list vs NumPy array speed comparison
  - The role of NumPy in the ML pipeline
  - Exploring the NumPy namespace
"""

import numpy as np
import time

print("=" * 60)
print("  NUMPY ESSENTIALS — Topic 0: Introduction to NumPy")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore")
print("=" * 60)

# ----------------------------------------------------------
# 1. NumPy Version Check
# ----------------------------------------------------------
print("\n[1] NumPy Version Information")
print(f"    NumPy version  : {np.__version__}")

# ----------------------------------------------------------
# 2. Python List vs NumPy Array — Speed Benchmark
# ----------------------------------------------------------
print("\n[2] Speed Benchmark: Python List vs NumPy Array")

N = 1_000_000

# Python list approach
py_list = list(range(N))
start = time.perf_counter()
py_result = [x * 2 for x in py_list]
py_time = time.perf_counter() - start
print(f"    Python list  (N={N:,}): {py_time * 1000:.2f} ms")

# NumPy approach
np_array = np.arange(N)
start = time.perf_counter()
np_result = np_array * 2
np_time = time.perf_counter() - start
print(f"    NumPy array  (N={N:,}): {np_time * 1000:.2f} ms")
print(f"    Speedup      : {py_time / np_time:.1f}x faster with NumPy")

# ----------------------------------------------------------
# 3. Core Data Types Available in NumPy
# ----------------------------------------------------------
print("\n[3] Common NumPy Data Types (dtypes)")
dtypes = [
    ("np.int8",    np.int8,    "Integer   -128 to 127"),
    ("np.int32",   np.int32,   "Integer   -2B to 2B"),
    ("np.int64",   np.int64,   "Integer   Very large"),
    ("np.float32", np.float32, "Float     ~7 decimal digits"),
    ("np.float64", np.float64, "Float     ~15 decimal digits (default)"),
    ("np.bool_",   np.bool_,   "Boolean   True or False"),
]
for name, dtype, desc in dtypes:
    info = np.iinfo(dtype) if np.issubdtype(dtype, np.integer) else np.finfo(dtype)
    print(f"    {name:<14} — {desc}")

# ----------------------------------------------------------
# 4. NumPy in the ML Pipeline Simulation
# ----------------------------------------------------------
print("\n[4] NumPy in the ML Pipeline (Simulation)")

# Suppose Sachin has student marks data
marks_list = [72, 85, 61, 90, 45, 78, 66, 95, 53, 88]

# Step 1: Convert to NumPy array (features)
marks_array = np.array(marks_list, dtype=np.float64)
print(f"    Student marks       : {marks_array}")
print(f"    Data type (dtype)   : {marks_array.dtype}")
print(f"    Shape               : {marks_array.shape}")

# Step 2: Normalize (min-max scaling) — common ML preprocessing
min_val = marks_array.min()
max_val = marks_array.max()
normalized = (marks_array - min_val) / (max_val - min_val)
print(f"    Normalized marks    : {np.round(normalized, 3)}")

# Step 3: Create binary labels (pass = 1 if mark >= 60)
labels = (marks_array >= 60).astype(np.int32)
print(f"    Labels (pass=1)     : {labels}")

# Step 4: Feature matrix (X) and target vector (y)
X = normalized.reshape(-1, 1)   # shape (10, 1)
y = labels                       # shape (10,)
print(f"    Feature matrix X    : shape = {X.shape}")
print(f"    Target vector y     : shape = {y.shape}")

# ----------------------------------------------------------
# 5. NumPy Sub-module Overview
# ----------------------------------------------------------
print("\n[5] Key NumPy Sub-modules")
submodules = {
    "numpy.linalg"  : "Linear algebra (dot, inv, eig, svd)",
    "numpy.random"  : "Random numbers (rand, randn, randint, choice)",
    "numpy.fft"     : "Fast Fourier Transform",
    "numpy.ma"      : "Masked arrays for missing data",
    "numpy.testing" : "Array comparison for unit tests",
}
for mod, desc in submodules.items():
    print(f"    {mod:<20} → {desc}")

# ----------------------------------------------------------
# 6. Real-World Dataset Shapes
# ----------------------------------------------------------
print("\n[6] Typical Dataset Shapes in ML (NumPy arrays)")
shapes = [
    ("MNIST digit image",  "(28, 28)",       "784 pixels each"),
    ("MNIST dataset",      "(60000, 28, 28)", "60k training images"),
    ("Iris dataset (X)",   "(150, 4)",        "150 rows, 4 features"),
    ("Word embedding",     "(50000, 300)",    "50k words × 300 dims"),
    ("Time-series sensor", "(1000,)",         "1000 time steps"),
]
for name, shape, desc in shapes:
    print(f"    {name:<25} shape={shape:<20} — {desc}")

print("\n" + "=" * 60)
print("  Key takeaway: NumPy arrays are the foundation of all ML.")
print("  import numpy as np  →  this is the first line of ML code!")
print("=" * 60)
