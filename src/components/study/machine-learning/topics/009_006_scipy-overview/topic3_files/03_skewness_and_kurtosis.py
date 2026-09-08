"""
Topic 3: Skewness and Kurtosis Diagnostic in ML Features
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import stats

# Generate simulated right-skewed feature (e.g. e-commerce purchase values)
np.random.seed(42)
right_skewed = np.random.exponential(scale=2.0, size=1000)

skew_val = stats.skew(right_skewed)
kurt_val = stats.kurtosis(right_skewed) # Fisher kurtosis (normal = 0.0)

print("--- Distribution Shape Diagnostics ---")
print(f"Skewness: {skew_val:.3f}")
if skew_val > 0.5:
    print("Interpretation: Positively (right) skewed. Consider log-transform (np.log1p) before linear models.")
elif skew_val < -0.5:
    print("Interpretation: Negatively (left) skewed.")
else:
    print("Interpretation: Approximately symmetric.")

print(f"\nKurtosis (Fisher's definition): {kurt_val:.3f}")
if kurt_val > 0:
    print("Interpretation: Leptokurtic (heavier tails, more outliers than normal distribution).")
elif kurt_val < 0:
    print("Interpretation: Platykurtic (lighter tails, fewer outliers).")
else:
    print("Interpretation: Mesokurtic (matches normal bell curve).")
