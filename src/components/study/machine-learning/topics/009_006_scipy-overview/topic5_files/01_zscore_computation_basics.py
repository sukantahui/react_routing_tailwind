"""
Topic 5: Z-Score Normalization with scipy.stats.zscore
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import stats

# Mathematical Formula: Z = (X - \mu) / \sigma
# Converts any normal distribution into standard normal N(0, 1)

# Dataset: Student heights (in cm) in Naihati classroom
heights = np.array([160, 165, 170, 172, 175, 178, 180, 185, 190])

# Calculate z-scores using scipy.stats
z_scores = stats.zscore(heights)

print("--- Standardizing Heights with Z-Score ---")
print(f"Original Mean: {np.mean(heights):.2f} cm, Std Dev: {np.std(heights):.2f} cm\n")
for h, z in zip(heights, z_scores):
    print(f"Height: {h} cm  -->  Z-Score: {z:+.3f} standard deviations")

print(f"\nVerification:")
print(f"Mean of Z-Scores : {np.mean(z_scores):.4f} (approx 0.0)")
print(f"Std of Z-Scores  : {np.std(z_scores):.4f} (exact 1.0)")
