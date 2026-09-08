"""
Topic 3: Robust Statistics: Trimmed & Geometric Means, Mode, and IQR
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import stats

# Dataset containing extreme outliers (e.g. salary dataset in INR Lakhs)
salaries = np.array([3.5, 4.0, 4.2, 4.5, 4.8, 5.0, 5.2, 5.5, 6.0, 50.0]) # 50 is an extreme outlier

# 1. Standard Arithmetic Mean vs 10% Trimmed Mean (drops 10% from both ends)
arith_mean = np.mean(salaries)
trim_mean = stats.trim_mean(salaries, proportiontocut=0.10)

print(f"Salaries Dataset: {salaries}")
print(f"Standard Mean  : ₹{arith_mean:.2f} Lakhs (heavily distorted by 50.0)")
print(f"10% Trimmed Mean: ₹{trim_mean:.2f} Lakhs (robust against outliers)")

# 2. Geometric Mean (used for compound growth rates and normalized metrics)
g_mean = stats.gmean([1.05, 1.10, 1.08, 1.12])
print(f"Geometric Mean Growth Rate: {g_mean:.4f}")

# 3. Interquartile Range (IQR = Q3 - Q1)
iqr_val = stats.iqr(salaries)
print(f"Interquartile Range (IQR) : {iqr_val:.2f}")
