# 03_broadcasting_mismatch_and_fixes.py
# NumPy Essentials — Topic 11: Broadcasting Concept (Part 3)
# Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

"""
DESCRIPTION:
Demonstrates common shape mismatch errors in broadcasting and how to resolve them:
  - Why (3, 4) + (3,) fails with ValueError
  - Step-by-step Rule 1 & Rule 2 alignment explanation
  - Two ways to fix it: .reshape(-1, 1) or [:, np.newaxis]
"""

import numpy as np

print("=" * 68)
print("  PART 3: Broadcasting Mismatch Errors & Fixes")
print("  Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal")
print("=" * 68)

marks_3x4 = np.array([
    [70, 80, 85, 90],
    [65, 75, 80, 85],
    [88, 92, 95, 90]
])

# Attempting to add 3 student adjustments as a 1D vector (shape (3,))
bonus_3 = np.array([10, 20, 30])

print(f"\n[1] Matrix A shape : {marks_3x4.shape}")
print(f"    Vector B shape : {bonus_3.shape}")

# 1. Why it raises ValueError:
# Vector (3,) is prepended to (1, 3).
# Trailing dimensions compared: 4 vs 3 (Neither is 1, and 4 != 3 -> ValueError!)
try:
    bad_result = marks_3x4 + bonus_3
except ValueError as e:
    print(f"\n    ❌ Caught Expected ValueError:\n    {e}")

# 2. The Fix: Transform (3,) into a 2D Column Vector (3, 1)
print("\n[2] Fixing the Mismatch:")

# Method A: Using .reshape(-1, 1)
col_reshaped = bonus_3.reshape(-1, 1) # shape (3, 1)
fixed_result_A = marks_3x4 + col_reshaped
print(f"    Method A (.reshape(-1, 1), shape {col_reshaped.shape}):\n{fixed_result_A}")

# Method B: Using np.newaxis
col_newaxis = bonus_3[:, np.newaxis] # shape (3, 1)
fixed_result_B = marks_3x4 + col_newaxis
print(f"\n    Method B ([:, np.newaxis], shape {col_newaxis.shape}):\n{fixed_result_B}")
print("\n    ✅ Both methods allow clean broadcasting with (3, 4)!")
