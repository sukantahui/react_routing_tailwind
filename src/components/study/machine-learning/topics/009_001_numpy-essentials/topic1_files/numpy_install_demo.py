# numpy_install_demo.py
# NumPy Essentials — Topic 1: Installing and Importing NumPy
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
Demonstrates:
  - How to verify NumPy installation
  - The standard import convention (import numpy as np)
  - Exploring the NumPy namespace
  - Common import patterns used in ML code
"""

# ── Step 1: Standard Import (ALWAYS use this) ───────────────────────────────
import numpy as np

print("=" * 60)
print("  NUMPY ESSENTIALS — Topic 1: Installing & Importing NumPy")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore")
print("=" * 60)

# ── Step 2: Verify installation ─────────────────────────────────────────────
print("\n[1] NumPy Installation Verification")
print(f"    Version     : {np.__version__}")
print(f"    File path   : {np.__file__}")

# ── Step 3: Show what 'np' gives access to ──────────────────────────────────
print("\n[2] Key NumPy Functions (exploring the namespace)")
important_funcs = [
    ("np.array",     "Create an ndarray from a sequence"),
    ("np.zeros",     "Array of zeros"),
    ("np.ones",      "Array of ones"),
    ("np.arange",    "Array with evenly spaced values (like range)"),
    ("np.linspace",  "Array with N evenly spaced floats"),
    ("np.random",    "Random number generation module"),
    ("np.linalg",    "Linear algebra module"),
    ("np.dot",       "Matrix / vector dot product"),
    ("np.mean",      "Arithmetic mean of array elements"),
    ("np.std",       "Standard deviation of array elements"),
]
for fname, desc in important_funcs:
    print(f"    {fname:<20} → {desc}")

# ── Step 4: Wrong vs right import styles ────────────────────────────────────
print("\n[3] Import Conventions — Correct vs Incorrect")
print("    ✔  import numpy as np            ← always use this")
print("    ✗  import numpy                   ← verbose, non-standard")
print("    ✗  from numpy import *            ← pollutes namespace")
print("    ✗  import numpy as numpy          ← non-standard alias")
print("    ✗  import numpy as num            ← confusing to readers")

# ── Step 5: Quick smoke test ─────────────────────────────────────────────────
print("\n[4] Quick Smoke Test — Creating Your First Array")
arr = np.array([72, 85, 61, 90, 45])  # Sachin's BCA marks
print(f"    arr          = {arr}")
print(f"    arr.dtype    = {arr.dtype}")
print(f"    arr.shape    = {arr.shape}")
print(f"    arr.ndim     = {arr.ndim}")

# ── Step 6: ML-style combined import block ───────────────────────────────────
print("\n[5] Standard ML Import Block (used in every ML script)")
print("""
    import numpy as np
    import pandas as pd
    from sklearn.model_selection import train_test_split
    from sklearn.linear_model import LinearRegression
    import matplotlib.pyplot as plt
    import seaborn as sns
""")
print("    All of the above rely on NumPy internally.")

# ── Step 7: Namespace count ──────────────────────────────────────────────────
np_attrs = [a for a in dir(np) if not a.startswith("_")]
print(f"\n[6] NumPy public namespace: {len(np_attrs)} attributes/functions")
print(f"    Sample (first 10): {np_attrs[:10]}")

print("\n" + "=" * 60)
print("  Takeaway: 'import numpy as np' is the first line of")
print("  every professional ML or data science Python script.")
print("=" * 60)
