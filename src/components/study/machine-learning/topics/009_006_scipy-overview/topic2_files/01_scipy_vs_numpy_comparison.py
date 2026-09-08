"""
Topic 2: SciPy vs NumPy Functional Comparison
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import linalg, stats

# NumPy: Focuses on core array storage and basic element-wise vector operations
data = np.array([10, 12, 23, 23, 16, 23, 21, 16])
print("--- NumPy Capabilities ---")
print(f"NumPy Mean   : {np.mean(data)}")
print(f"NumPy Std Dev: {np.std(data):.4f}")

# SciPy: High-level scientific algorithms, complete distribution analysis & stats
print("\n--- SciPy Extended Capabilities ---")
mode_res = stats.mode(data, keepdims=False)
skew_res = stats.skew(data)
kurt_res = stats.kurtosis(data)

print(f"SciPy Mode    : {mode_res.mode} (count: {mode_res.count})")
print(f"SciPy Skewness: {skew_res:.4f}")
print(f"SciPy Kurtosis: {kurt_res:.4f}")
