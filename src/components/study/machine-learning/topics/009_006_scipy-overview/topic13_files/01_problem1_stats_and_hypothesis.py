"""
Topic 13: Practice Problem 1 - Statistical Feature Profiling & Hypothesis Testing
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import stats

# Problem 1:
# A data science lab in Naihati tests blood glucose levels of two patient cohorts:
# Group A (Standard Diet): [110, 115, 120, 112, 118, 125, 108, 114]
# Group B (Low Carb Diet) : [98, 102, 105, 95, 100, 104, 99, 101]

group_a = np.array([110, 115, 120, 112, 118, 125, 108, 114])
group_b = np.array([98, 102, 105, 95, 100, 104, 99, 101])

# Task 1: Check skewness and descriptive summary
desc_a = stats.describe(group_a)
desc_b = stats.describe(group_b)

print("--- Problem 1: Cohort Statistics ---")
print(f"Group A Mean: {desc_a.mean:.2f}, Skewness: {desc_a.skewness:.3f}")
print(f"Group B Mean: {desc_b.mean:.2f}, Skewness: {desc_b.skewness:.3f}")

# Task 2: Perform independent two-sample Welch's t-test
t_stat, p_val = stats.ttest_ind(group_a, group_b, equal_var=False)
print(f"\nt-Statistic : {t_stat:.4f}")
print(f"p-Value     : {p_val:.6f}")

if p_val < 0.05:
    print("Conclusion: Reject H0. The low carb diet produces a statistically significant reduction in glucose levels (p < 0.05).")
