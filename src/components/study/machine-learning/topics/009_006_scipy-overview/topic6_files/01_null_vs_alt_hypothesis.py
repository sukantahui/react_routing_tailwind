"""
Topic 6: Hypothesis Testing Framework & Logic
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import stats

# Scenario: An online learning platform in Barrackpore tests a new interactive AI tutorial.
# H0 (Null Hypothesis): The new AI platform does NOT change exam scores (\mu_new = \mu_traditional = 75).
# H1 (Alternative Hypothesis): The new AI platform significantly changes exam scores (\mu_new != 75).

# Sample scores of 15 students who studied with the new AI platform
scores = np.array([82, 79, 88, 85, 78, 92, 80, 84, 87, 81, 76, 89, 91, 83, 86])

# 1-Sample Student's t-test comparing against benchmark 75
t_stat, p_val = stats.ttest_1samp(scores, popmean=75)

print("--- Statistical Hypothesis Test ---")
print(f"Sample Mean Score : {np.mean(scores):.2f}")
print(f"t-Statistic       : {t_stat:.4f}")
print(f"p-Value           : {p_val:.6f}")

alpha = 0.05
if p_val < alpha:
    print(f"\nResult: p-value ({p_val:.4f}) < alpha ({alpha}) --> REJECT Null Hypothesis (H0).")
    print("Conclusion: Statistically significant evidence that AI tutorials improve scores!")
else:
    print(f"\nResult: p-value ({p_val:.4f}) >= alpha ({alpha}) --> FAIL TO REJECT H0.")
