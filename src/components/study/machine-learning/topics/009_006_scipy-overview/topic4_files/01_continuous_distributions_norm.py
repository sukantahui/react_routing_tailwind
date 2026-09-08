"""
Topic 4: Continuous Probability Distributions in scipy.stats
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

import numpy as np
from scipy import stats

# 1. Standard Normal Distribution (loc=mean, scale=standard deviation)
normal_dist = stats.norm(loc=100, scale=15) # e.g. IQ scores distribution

# Probability Density Function (PDF) at mean
pdf_at_mean = normal_dist.pdf(100)
print(f"Normal Distribution: mean=100, std=15")
print(f"PDF value at x=100: {pdf_at_mean:.4f}")

# Cumulative Distribution Function (CDF): P(X <= 115) -> 1 standard deviation
p_under_115 = normal_dist.cdf(115)
print(f"Probability P(X <= 115): {p_under_115 * 100:.2f}% (approx 84.13%)")

# Percent Point Function (PPF / Inverse CDF / Quantile): Find score at 95th percentile
p95_score = normal_dist.ppf(0.95)
print(f"95th Percentile Cutoff Score: {p95_score:.2f}")

# Random Variates Simulation (RVS)
samples = normal_dist.rvs(size=5, random_state=42)
print(f"5 Random Sample Observations: {np.round(samples, 1)}")
