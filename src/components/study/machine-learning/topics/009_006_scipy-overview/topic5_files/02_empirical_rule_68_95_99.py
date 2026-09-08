"""
Topic 5: The Empirical 68-95-99.7 Rule Verification with SciPy
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

from scipy import stats

# Standard normal distribution N(0, 1)
norm = stats.norm(0, 1)

# Probability within 1 standard deviation: P(-1 <= Z <= +1)
p_1sigma = norm.cdf(1) - norm.cdf(-1)

# Probability within 2 standard deviations: P(-2 <= Z <= +2)
p_2sigma = norm.cdf(2) - norm.cdf(-2)

# Probability within 3 standard deviations: P(-3 <= Z <= +3)
p_3sigma = norm.cdf(3) - norm.cdf(-3)

print("--- The Empirical Rule (68-95-99.7) in Gaussian Distributions ---")
print(f"Within ±1 Standard Deviation: {p_1sigma * 100:.3f}% (Expected ~68.27%)")
print(f"Within ±2 Standard Deviations: {p_2sigma * 100:.3f}% (Expected ~95.45%)")
print(f"Within ±3 Standard Deviations: {p_3sigma * 100:.3f}% (Expected ~99.73%)")
print(f"Extreme Outlier Probability (> 3 std): {(1 - p_3sigma) * 100:.3f}%")
