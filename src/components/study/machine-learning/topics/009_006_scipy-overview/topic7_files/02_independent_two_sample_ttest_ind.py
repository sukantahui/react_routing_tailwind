"""
Topic 7: Independent Two-Sample t-Test via scipy.stats.ttest_ind
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import stats

# Comparing convergence iterations between two machine learning optimizers
# Optimizer A (Standard SGD):
group_a = np.array([45, 52, 48, 55, 50, 49, 53, 47, 51])
# Optimizer B (Adam Optimizer with momentum):
group_b = np.array([32, 35, 29, 38, 34, 30, 36, 31, 33])

# Independent two-sample t-test (equal_var=False performs Welch's robust t-test)
t_stat, p_val = stats.ttest_ind(group_a, group_b, equal_var=False)

print("--- Independent 2-Sample Welch's t-Test ---")
print(f"Group A Mean (SGD)  : {np.mean(group_a):.2f} epochs")
print(f"Group B Mean (Adam) : {np.mean(group_b):.2f} epochs")
print(f"t-statistic         : {t_stat:.4f}")
print(f"p-value             : {p_val:.8f}")

if p_val < 0.01:
    print("\nConclusion: Adam optimizer converges with significantly fewer epochs than SGD (p < 0.01)!")
