"""
Topic 7: One-Sample Student's t-Test via scipy.stats.ttest_1samp
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import stats

# Problem Statement: An ICSE/ISC coaching center in Shyamnagar claims their students 
# achieve an average of 80 marks in computer science.
# We sample 10 students:
sample_marks = np.array([82, 85, 88, 79, 84, 91, 87, 83, 86, 90])
claimed_mean = 80.0

# Run 1-sample t-test
t_stat, p_val = stats.ttest_1samp(sample_marks, popmean=claimed_mean)

print("--- 1-Sample Student's t-Test ---")
print(f"Sample Observations : {sample_marks}")
print(f"Sample Mean         : {np.mean(sample_marks):.2f}")
print(f"Hypothesized Mean   : {claimed_mean}")
print(f"t-statistic         : {t_stat:.4f}")
print(f"p-value (two-sided) : {p_val:.6f}")

alpha = 0.05
if p_val < alpha:
    print(f"\nConclusion: Reject H0 at alpha={alpha}. The true mean is significantly higher than {claimed_mean}!")
else:
    print(f"\nConclusion: Fail to reject H0. No significant difference from {claimed_mean}.")
