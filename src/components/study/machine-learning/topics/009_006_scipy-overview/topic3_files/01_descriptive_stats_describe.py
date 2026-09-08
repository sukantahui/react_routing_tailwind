"""
Topic 3: Comprehensive Summary with scipy.stats.describe
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import stats

# Dataset: Student machine learning test scores in Barrackpore batch
scores = np.array([78, 85, 92, 88, 75, 60, 95, 89, 90, 82, 88, 94])

# stats.describe calculates nobs, minmax, mean, variance, skewness, and kurtosis in one pass
summary = stats.describe(scores)

print("--- Descriptive Statistics via scipy.stats.describe ---")
print(f"Sample Size (nobs) : {summary.nobs}")
print(f"Min & Max Range    : Min = {summary.minmax[0]}, Max = {summary.minmax[1]}")
print(f"Sample Mean        : {summary.mean:.2f}")
print(f"Sample Variance    : {summary.variance:.2f} (Std Dev: {np.sqrt(summary.variance):.2f})")
print(f"Skewness           : {summary.skewness:.4f} (Asymmetry measure)")
print(f"Kurtosis (Fisher)  : {summary.kurtosis:.4f} (Tailedness relative to normal)")
